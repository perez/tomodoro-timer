/****** VARIABLES ******/

const container = document.getElementById('container');
const timerTitle = container.querySelector('h1');
const timer = container.querySelector('h2');
const startPauseBtn = container.querySelector('.start-pause');
const workBreakBtn = container.querySelector('.work-break');
const resetBtn = container.querySelector('.reset');
const breakDuration = container.querySelector('.break-duration > h4');
const workDuration = container.querySelector('.work-duration > h4');

let timerDisplayValue;

let minutes;
let seconds = 60;
let interval;

/****** TIMER FUNCTIONS ******/

function minutesDecrement() {
    if (minutes === timerDisplayValue) minutes -= 1;
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
        timer.textContent = `${minutes}:${seconds}`;
        document.title = `(${minutes}:${seconds}) Tomodoro Timer`;
    }, 1000);
}

/****** BUTTON FUNCTIONS ******/

function toggleWorkBreakBtn() {
    if (startPauseBtn.textContent === 'PAUSE') {
        workBreakBtn.setAttribute('disabled', 'disabled');
    } else if (startPauseBtn.textContent === 'START') {
        workBreakBtn.removeAttribute('disabled');
    }
}

function toggleTimerCountdown(e) {
    if (e.target.textContent === 'START') {
        e.target.textContent = 'PAUSE';
        timerCountdown();
        toggleWorkBreakBtn();
    } else {
        e.target.textContent = 'START';
        clearInterval(interval);
        toggleWorkBreakBtn();
    }
}

function updateTimerDisplayAndValue() {
    if (workBreakBtn.textContent === 'BREAK') {
        timer.textContent = workDuration.textContent;
    } else {
        timer.textContent = breakDuration.textContent;
    }
    timerDisplayValue = Number(timer.textContent.substring(0, timer.textContent.indexOf(':')));
    minutes = timerDisplayValue;
}

function toggleTimerMode(e) {
    if (e.target.textContent === 'BREAK') {
        e.target.textContent = 'WORK';
        updateTimerDisplayAndValue();
    } else {
        e.target.textContent = 'BREAK';
        updateTimerDisplayAndValue();
    }
}

function resetTimer() {
    if (startPauseBtn.textContent = 'PAUSE') startPauseBtn.textContent = 'START';
    clearInterval(interval);
    minutes = timerDisplayValue;
    seconds = 60;
    timer.textContent = `${minutes}:00`;
    document.title = 'Tomodoro Timer';
    toggleWorkBreakBtn();
}

/****** EVENT LISTENERS ******/

startPauseBtn.addEventListener('click', toggleTimerCountdown);

resetBtn.addEventListener('click', resetTimer);

workBreakBtn.addEventListener('click', toggleTimerMode);

window.addEventListener('load', updateTimerDisplayAndValue);