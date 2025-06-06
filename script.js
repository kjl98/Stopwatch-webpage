// let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
// let timeRef = document.querySelector(".timer-display");
// let int = null;

// document.getElementById("start-timer").addEventListener("click", () => {
// 	if(int !== null) {
// 		clearInterval(int);
// 	}
// 	int = setInterval(displayTimer, 10);
// });

// document.getElementById("pause-timer").addEventListener("click", () => {
// 	clearInterval(int);
// });

// document.getElementById("reset-timer").addEventListener("click", () => {
// 	clearInterval(int);
// 	[milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
// 	timeRef.innerHTML = "00 : 00 : 00 : 000";
// });

// function displayTimer() {
// 	milliseconds += 10;
// 	if(milliseconds == 1000) {
// 		milliseconds = 0;
// 		seconds++;
// 		if(seconds == 60) {
// 			seconds = 0;
// 			minutes++;
// 			if(minutes == 60) {
// 				minutes = 0;
// 				hours++;
// 			}
// 		}
// 	}

// 	let h = hours < 10 ? "0" + hours : hours;
// 	let m = milliseconds < 10 ? "0" + minutes : minutes;
// 	let s = seconds < 10 ? "0" + seconds : seconds;
// 	let ms =
// 	    milliseconds < 10
// 		? "00" + milliseconds
// 		: milliseconds < 100
//         ? "0" + milliseconds
// 		: milliseconds;

//     timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;

// }

let timer;
let startTime = 0;
let elapsedTime = 0;
let running = false;
let laps = [];

const display = document.querySelector('.timer-display');
const startBtn = document.getElementById('start-timer');
const pauseBtn = document.getElementById('pause-timer');
const resetBtn = document.getElementById('reset-timer');
const lapBtn = document.getElementById('lap-timer');
const lapsList = document.getElementById('laps-list');

function formatTime(ms) {
    let milliseconds = ms % 1000;
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)));
    return (
        String(hours).padStart(2, '0') + ' : ' +
        String(minutes).padStart(2, '0') + ' : ' +
        String(seconds).padStart(2, '0') + ' : ' +
        String(milliseconds).padStart(3, '0')
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timer);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}

function resetTimer() {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    laps = [];
    lapsList.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function lapTimer() {
    if (running) {
        laps.push(elapsedTime);
        const li = document.createElement('li');
        li.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
        lapsList.appendChild(li);
    }
}

// Initial state
updateDisplay();
pauseBtn.disabled = true;
lapBtn.disabled = true;

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);