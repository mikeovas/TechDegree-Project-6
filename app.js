//select variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start_game = document.querySelector('.btn_reset');


// in-game variables
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

//reset game
overlay.addEventListener('click', () => {
    overlay.style.display = "none";
})