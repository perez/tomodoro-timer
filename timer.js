/****** VARIABLES ******/

const container = document.getElementById('container');
const timer = container.querySelector('h2');
const startPauseBtn = container.querySelector('.start-pause');
const workBreakBtn = container.querySelector('.work-break');
const resetBtn = container.querySelector('.reset');
const opBtn = Array.from(container.getElementsByClassName('op-button'));
const breakDuration = container.querySelector('.break-duration > h4');
const workDuration = container.querySelector('.work-duration > h4');

const alarmAudio = new Audio('./assets/analog-alarm.wav');

let timerDisplayValue;

let minutes;
let seconds = 60;
let countdown;

/****** HELPER FUNCTIONS ******/

function updateTimerDisplayAndValue() {
    if (workBreakBtn.textContent === 'BREAK') {
        timer.textContent = workDuration.textContent;
    } else {
        timer.textContent = breakDuration.textContent;
    }
    timerDisplayValue = Number(timer.textContent.substring(0, timer.textContent.indexOf(':')));
    minutes = timerDisplayValue;
}

function toggleWorkBreakBtn() {
    if (startPauseBtn.textContent === 'PAUSE') {
        workBreakBtn.setAttribute('disabled', 'disabled');
    } else if (startPauseBtn.textContent === 'START') {
        workBreakBtn.removeAttribute('disabled');
    }
}

function stopAudio() {
    if (!alarmAudio.paused) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
    } else {
        alarmAudio.currentTime = 0;
    }
}

/****** TIMER FUNCTIONS ******/

function minutesDecrement() {
    if (minutes === timerDisplayValue) { minutes -= 1 };
    if (seconds === '00') {
        minutes -= 1;
        seconds = 60;
    }
}

function secondsDecrement() {
    seconds -= 1;
    if (seconds < 10) { seconds = '0' + seconds };
}

function timerCountdown() {
    countdown = setInterval(() => {
        minutesDecrement();
        secondsDecrement();
        timer.textContent = `${minutes}:${seconds}`;
        document.title = `(${minutes}:${seconds}) Tomodoro Timer`;
        if (timer.textContent === '0:00') playAlarm();
    }, 1000);
}

function playAlarm() {
    clearInterval(countdown);
    startPauseBtn.setAttribute('disabled', 'disabled');
    if (workBreakBtn.getAttribute('disabled') === 'disabled') { workBreakBtn.removeAttribute('disabled') };
    alarmAudio.play();
}

/****** BUTTON FUNCTIONS ******/

function toggleTimerCountdown() {
    opBtn.forEach(btn => btn.setAttribute('disabled', 'disabled'));
    if (startPauseBtn.textContent === 'START') {
        startPauseBtn.textContent = 'PAUSE';
        timerCountdown();
    } else {
        startPauseBtn.textContent = 'START';
        clearInterval(countdown);
    }
    toggleWorkBreakBtn();
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

function toggleTimerMode() {
    resetTimer();
    (workBreakBtn.textContent === 'BREAK') ? workBreakBtn.textContent = 'WORK' : workBreakBtn.textContent = 'BREAK';
    updateTimerDisplayAndValue();
}

function resetTimer() {
    stopAudio();
    opBtn.forEach(btn => btn.removeAttribute('disabled'));
    if (startPauseBtn.textContent = 'PAUSE') { startPauseBtn.textContent = 'START' };
    if (startPauseBtn.getAttribute('disabled') === 'disabled') { startPauseBtn.removeAttribute('disabled') };
    clearInterval(countdown);
    minutes = timerDisplayValue;
    seconds = 60;
    timer.textContent = `${minutes}:00`;
    document.title = 'Tomodoro Timer';
    toggleWorkBreakBtn();
}

function updateDuration(e) {
    let durationDisplay = e.target.parentElement.children[1];
    
    if (e.target.textContent === '-') {
        switch (true) {
            case durationDisplay.textContent === '45:00':
                durationDisplay.textContent = '40:00';
                break;
            case durationDisplay.textContent === '40:00':
                durationDisplay.textContent = '35:00';
                break;
            case durationDisplay.textContent === '35:00':
                durationDisplay.textContent = '30:00';
                break;
            case durationDisplay.textContent === '30:00':
                durationDisplay.textContent = '25:00';
                break;
            case durationDisplay.textContent=== '25:00':
                durationDisplay.textContent = '20:00';
                break;
            case durationDisplay.textContent === '15:00':
                durationDisplay.textContent = '10:00';
                break;
            case durationDisplay.textContent === '10:00':
                durationDisplay.textContent = '5:00';
                break;
            case durationDisplay.textContent === '5:00':
                durationDisplay.textContent = '1:00';
                break;
        }       
    } else if (e.target.textContent === '+') {
        switch (true) {
            case durationDisplay.textContent === '1:00':
                durationDisplay.textContent = '5:00';
                break;
            case durationDisplay.textContent === '5:00':
                durationDisplay.textContent = '10:00';
                break;
            case durationDisplay.textContent === '10:00':
                durationDisplay.textContent = '15:00';
                break;
            case durationDisplay.textContent === '20:00':
                durationDisplay.textContent = '25:00';
                break;
            case durationDisplay.textContent === '25:00':
                durationDisplay.textContent = '30:00';
                break;
            case durationDisplay.textContent === '30:00':
                durationDisplay.textContent = '35:00';
                break;
            case durationDisplay.textContent === '35:00':
                durationDisplay.textContent= '40:00';
                break;
            case durationDisplay.textContent === '40:00':
                durationDisplay.textContent = '45:00';
                break;
        }
    }
    updateTimerDisplayAndValue();
}

/****** EVENT LISTENERS ******/

window.addEventListener('load', updateTimerDisplayAndValue);

startPauseBtn.addEventListener('click', toggleTimerCountdown);

workBreakBtn.addEventListener('click', toggleTimerMode);

resetBtn.addEventListener('click', resetTimer);

opBtn.forEach(btn => btn.addEventListener('click', updateDuration));