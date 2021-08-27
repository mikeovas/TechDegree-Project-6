//selection of variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const phraseUl = phraseDiv.children[0];
const reset_game = document.querySelector('.btn__reset');


// variable to keep track of missed guesses
let missed_guess = 0;


//arrays of phrases to select from
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


//sets letters to an li and adds the letters to the display
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


//check if chosen letter matches letter in a phrase


function checkLetter(choice) {
    const letterInLi = phraseUl.getElementsByTagName('li');
    qwerty.addEventListener('click', (e) => {
            const choice = e.value;
            console.dir(e.target.firstChild.textContent);
        }


    )
};


//main function call
addPhraseToDisplay(phrases);
checkLetter(phrases);