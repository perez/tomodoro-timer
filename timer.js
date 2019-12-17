/****** VARIABLES ******/

const timerTitle = document.querySelector('h1');
const timer = document.querySelector('h2');
const startPauseBtn = document.querySelector('.start-pause');

let minutes = 25;
let seconds = 60;
let interval;

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

function timerCountdown() {
    interval = setInterval(() => {
        minutesDecrement();
        secondsDecrement();
        timer.textContent = `${minutes}:${seconds}`
    }, 1000);
}

/****** BUTTON FUNCTIONS ******/

function toggleTimerCountdown(e) {
    if (e.target.textContent === 'START') {
        e.target.textContent = 'PAUSE';
        timerCountdown();
    } else {
        e.target.textContent = 'START';
        clearInterval(interval);
    }
}

/****** EVENT LISTENERS ******/

startPauseBtn.addEventListener('click', toggleTimerCountdown);