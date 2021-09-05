//selection of variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');

const phraseUl = phraseDiv.children[0];

const reset_game = document.querySelector('.btn__reset');

// variable to keep track of missed guesses
let missed_guess = 0;


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
    let match = "";

    for (i = 0; i < liWithLetters.length; i++) {
        const li = liWithLetters[i];
        const letterInPhrase = li.textContent;

        if (choice === letterInPhrase) {
            li.classList.add('show');
            match = choice;
        };
    };

    if (match === choice) {
        return match;
    } else {
        match = null;
        return match;
    }
};


// the event listener for the qwerty element to select a letter to guess and calls the checkLetter function to check if the choice is correct
qwerty.addEventListener('click', (e) => {
    const choice = e.target.firstChild.textContent;
    checkLetter(choice);
});



//main function call
addPhraseToDisplay(phrases);