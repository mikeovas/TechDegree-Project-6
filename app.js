//selection of variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const phraseUl = phraseDiv.children[0];
const reset_game = document.querySelector('.btn__reset');
const heartTemplate = '<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';


// variable to keep track of missed guesses
let missed_guesses = 0;
const max_guesses = 5;
updateHearts();


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


//listens for the start game button
//eventually turn into a reset game
reset_game.addEventListener('click', () => {
    overlay.style.display = "none";
});


//Functions

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
    console.log(liWithLetters);
    let match = false;

    for (i = 0; i < liWithLetters.length; i++) {
        const li = liWithLetters[i];
        const letterInPhrase = li.textContent;
        console.log(letterInPhrase);

        if (choice === letterInPhrase) {
            li.classList.add('show');
            match = true;
        }
    }
    console.log(match);
    return match;
}

function updateHearts() {

    const lives = document.getElementById('lives');
    lives.innerHTML = '';
    numHearts = max_guesses - missed_guesses; //allows to change number of missed guesses as desired
    for (i = 0; i < numHearts; i++) {
        lives.insertAdjacentHTML('beforeend', heartTemplate);
    }
}


//Event Listeners

// the event listener for the qwerty element to select a letter to guess and calls the checkLetter function to check if the choice is correct
qwerty.querySelectorAll('button').forEach((element) => {

    element.addEventListener('click', (e) => {
        e.target.classList.add('chosen');
        const choice = e.target.firstChild.textContent;
        console.log(choice);
        const match = checkLetter(choice);

        if (!match) {
            missed_guesses += 1;
            console.log('missed_guesses', missed_guesses);
            updateHearts();
        }

    });

});










//main function call
addPhraseToDisplay(phrases);