//* HTML elemek
const $time = document.querySelector(".js-time");
const $startBtn = document.querySelector(".js-startBtn");
const $stopBtn = document.querySelector(".js-stopBtn");
const $resetBtn = document.querySelector(".js-resetBtn");

//* változók
const initTime = 2 * 60;
let time = initTime;
let intervalId = null;

//* segédfüggvények
function formatTime(sec) {
  const minutes = Math.floor(sec / 60); // megkapjuk a perc értékét

  let seconds = sec % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return `${minutes}:${seconds}`;
}

//* render
function renderTime() {
  $time.innerHTML = formatTime(time);
}

//* eseményfigyelők
function handleStart() {
  if (!intervalId && time > 0) {
    function start() {
      if (time === 0) {
        clearInterval(intervalId);
      } else {
        time--;
        renderTime();
      }
    }

    intervalId = setInterval(start, 1000);
  }
}

function handleStop() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function handleReset() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  time = initTime;
  renderTime();
}

$startBtn.addEventListener("click", handleStart);
$stopBtn.addEventListener("click", handleStop);
$resetBtn.addEventListener("click", handleReset);

//* szügéseges függvényhívás
renderTime();
