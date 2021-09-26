//selection of variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const phraseUl = phraseDiv.children[0];
const resetGame = document.querySelector('.btn__reset');
const heartTemplate = '<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';

const headline = document.querySelector('.title');



// variable to keep track of missed guesses
let missedGuesses = 0;
const maxGuesses = 5;


//arrays of phrases to select letters from
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


//function to select a random phrase for the game and split phrase into letters
function getRandomPhraseAsArray(arr) {
    const arrayLength = arr.length;
    const randomNumber = Math.floor(Math.random() * arrayLength);
    const chosenPhrase = arr[randomNumber];
    return chosenPhrase.split("");
};


//sets letters to a new li, adds a class and appends the letters to ul to display
function addPhraseToDisplay(arr) {
    const chars = getRandomPhraseAsArray(arr);
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
};


//check if chosen letter is correct
// stores all li elements in a variable and compares the letter in the li element with the letter chosen in the click event below
function checkLetter(choice) {
    const liWithLetters = phraseUl.getElementsByTagName('li');
    // console.log(liWithLetters);
    let letterFound = false;

    for (i = 0; i < liWithLetters.length; i++) {
        const li = liWithLetters[i];
        const letterInPhrase = li.textContent;
        // console.log(letterInPhrase);

        if (choice === letterInPhrase) {
            li.classList.add('show');
            letterFound = true;
        }
    }
    // console.log(letterFound);
    return letterFound;
}

function updateHearts() {
    const lives = document.getElementById('lives');
    lives.innerHTML = '';
    numHearts = maxGuesses - missedGuesses; //allows to change number of missed guesses as desired
    for (i = 0; i < numHearts; i++) {
        lives.insertAdjacentHTML('beforeend', heartTemplate);
    }
}


function checkWin() {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');

    if (letter.length === show.length) {
        reset("win", 'You Win!!');
    } else if (missedGuesses >= maxGuesses) {
        console.log(missedGuesses);
        console.log(maxGuesses);
        reset('lose', 'You Lose!');
    }
}

function reset(result, message) {
    overlay.className = result;
    overlay.style.display = 'flex';
    headline.textContent = message;
    resetGame.innerHTML = "<a class='btn__reset'>Reset Game</a>";
}


//Event Listeners

//listens for the start game button
//eventually turn into a reset game
resetGame.addEventListener('click', () => {
    overlay.style.display = "none";
});


// the event listener for the qwerty element to select a letter to guess and calls the checkLetter function to check if the choice is correct
qwerty.querySelectorAll('button').forEach((element) => {

    element.addEventListener('click', (e) => {
        e.target.classList.add('chosen');
        e.target.disabled = true;
        const choice = e.target.firstChild.textContent;
        // console.log(choice);
        const letterFound = checkLetter(choice);

        if (!letterFound) {
            missedGuesses += 1;
            updateHearts();
        }
        checkWin();
    });

});





//main function call
addPhraseToDisplay(phrases);