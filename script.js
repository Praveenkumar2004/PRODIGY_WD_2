let startTime;
let isRunning = false;
let interval;
let laps = [];
let lapCount = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function startStop() {
  if (!isRunning) {
    isRunning = true;
    startStopBtn.textContent = 'Stop';
    startTime = Date.now() - (interval || 0);
    interval = setInterval(updateDisplay, 10);
  } else {
    isRunning = false;
    startStopBtn.textContent = 'Start';
    clearInterval(interval);
  }
}

function lap() {
  if (isRunning) {
    const currentTime = Date.now() - startTime;
    const formattedTime = formatTime(currentTime);
    laps.unshift({ lap: lapCount++, time: formattedTime });
    updateLapsList();
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  startStopBtn.textContent = 'Start';
  display.textContent = '00:00:00';
  laps = [];
  lapCount = 1;
  updateLapsList();
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  const formattedTime = formatTime(currentTime);
  display.textContent = formattedTime;
}

function formatTime(time) {
  const minutes = Math.floor((time / 60000) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateLapsList() {
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const lapItem = document.createElement('li');
    lapItem.classList.add('lapItem');
    lapItem.textContent = `Lap ${lap.lap}: ${lap.time}`;
    lapsList.appendChild(lapItem);
  });
}

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
