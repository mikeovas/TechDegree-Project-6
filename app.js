//selection of variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start_game = document.querySelector('.btn_reset');

// in-game variables
let missed_guess = 0;

//reset game
overlay.addEventListener('click', () => {
    overlay.style.display = "none";
});

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

//selection of a random phrase for the game
function getRandomPhraseAsArray(phrases) {
    const arrayLength = phrases.length;
    const randomNumber = Math.floor(Math.random() * arrayLength);
    const chosenPhrase = phrases[randomNumber];
    return chosenPhrase;
};