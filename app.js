//Selection of Variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const phraseUl = phraseDiv.children[0];
const resetGame = document.querySelector('.btn__reset');
const liveHeartTemplate = '<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';
const lostHeartTemplate = '<li class="tries"><img src="images/lostHeart.png" height="35px" width="30px"></li>';
const headline = document.querySelector('.title');


// Variable to keep track of missed guesses
let missedGuesses = 0;
const maxGuesses = 5;


//Arrays of phrases to select letters from
const phrases = [
    'not all who wander are lost',
    'you shall not pass',
    'with great power comes great responsibility',
    'there is no place like home',
    'i can do this all day',
    'live long and prosper',
    'peace and long life',
    'the only failure is not to try',
    'to infinity and beyond',
    'do not be afraid to fail',
];


//Functions

//Starts game with full lives
updateHearts();


//Selects a random phrase from an array and splits the phrase into letters and spaces
function getRandomPhraseAsArray(arr) {
    const arrayLength = arr.length;
    const randomNumber = Math.floor(Math.random() * arrayLength);
    const chosenPhrase = arr[randomNumber];
    return chosenPhrase.split("");
}


//Sets letters to a new li, adds a 'letter' or 'space'class and appends the letters to the uL in order to display the phrase
function addPhraseToDisplay() {
    phraseUl.innerHTML = "";
    const chars = getRandomPhraseAsArray(phrases);
    for (i = 0; i < chars.length; i++) {
        const char = chars[i];
        const phraseLi = document.createElement('li');
        phraseLi.textContent = char;
        if (char !== " ") {
            phraseLi.className = 'letter';
        } else {
            phraseLi.className = 'space';
        }
        phraseUl.appendChild(phraseLi);
    };
}


//checks if chosen letter is correct and if so adds 'show' class in order to show the chosen letter in the phrase
// stores all li elements in a variable and compares the letter in the li element with the letter chosen in the click event below
function checkLetter(choice) {
    const liWithLetters = phraseUl.getElementsByTagName('li');
    let match = false;
    for (i = 0; i < liWithLetters.length; i++) {
        const li = liWithLetters[i];
        const letterInPhrase = li.textContent;
        if (choice === letterInPhrase) {
            li.classList.add('show');
            match = true;
        }
    }
    return match;
}


// Updates the number of lives/hearts displayed on the screen
function updateHearts() {
    const lives = document.getElementById('lives');
    lives.innerHTML = '';
    numHearts = maxGuesses - missedGuesses;
    for (i = 0; i < numHearts; i++) {
        lives.insertAdjacentHTML('beforeend', liveHeartTemplate);
    }
    for (i = 0; i < missedGuesses; i++) {
        lives.insertAdjacentHTML('beforeend', lostHeartTemplate);
    }
}


// Checks for a win by comparing number of correctly chosen letters with letters in the phrase
function checkWin() {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    if (letter.length === show.length) {
        reset("win", 'Congrats! You have won!!');
    } else if (missedGuesses >= maxGuesses) {
        reset('lose', 'Sorry. You did not win.');
    }
}


//Resets all game settings to start a new game after a win or loss
function reset(result, message) {
    overlay.className = result;
    overlay.style.display = 'flex';
    headline.textContent = message;
    resetGame.innerHTML = "<a class='btn__reset'>Reset Game</a>";
    missedGuesses = 0;
    updateHearts();
}


//Event Listeners

//Listens for the start of a new game and starts the game over with new settings
resetGame.addEventListener('click', () => {
    overlay.style.display = "none";
    addPhraseToDisplay(phrases);
    const btns = document.querySelectorAll('.keyrow button');
    for (i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
        btns[i].classList.remove('chosen');
    };
});


// Listens for a guessed chosen letter from the qwerty element and calls the checkLetter function to check if the choice is correct
//If guess is incorrect, the number of hearts/lives is updated using the updateHearts() function
//Checks for a win with the checkWin() function after each click event
qwerty.querySelectorAll('button').forEach((element) => {
    element.addEventListener('click', (e) => {
        e.target.classList.add('chosen');
        e.target.disabled = true;
        const choice = e.target.firstChild.textContent;
        const letterFound = checkLetter(choice);
        if (!letterFound) {
            missedGuesses += 1;
            updateHearts();
        }
        checkWin();
    });
});