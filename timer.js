/****** VARIABLES ******/

const timerTitle = document.querySelector('h1');
const timer = document.querySelector('h2');

let minutes = 25;
let seconds = 60;

/****** TIMER FUNCTIONS ******/

function minutesDecrement() {
    if (minutes === 25) minutes -= 1;
    if (seconds === '00') {
        minutes -= 1;
        seconds = 60;
    }
}

function secondsDecrement() {
    seconds -= 1;
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
}