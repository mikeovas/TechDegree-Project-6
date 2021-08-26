//selection of variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start_game = document.querySelector('.btn_reset');


// in-game variables
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


//reset game
overlay.addEventListener('click', () => {
    overlay.style.display = "none";
});


//function to select a random phrase for the game and split into letters
function getRandomPhraseAsArray(arr) {
    const arrayLength = arr.length;
    const randomNumber = Math.floor(Math.random() * arrayLength);
    const chosenPhrase = arr[randomNumber];
    return chosenPhrase.split("");
};


//assign letters to li with appropriate class
const chars = getRandomPhraseAsArray(phrases);
const phraseDiv = document.getElementById('phrase');
const phraseUl = phraseDiv.children[0];

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
console.log(phraseDiv);