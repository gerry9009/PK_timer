//* - Closure
//* - Immutabilitás
//* - Pure function
//* - Higher Order Function

//* HTML elemek
const $form = document.querySelector("form");
const $app = document.querySelector("#app");

//* segédfüggvények
function formatTime(sec) {
  const minutes = Math.floor(sec / 60); // megkapjuk a perc értékét

  let seconds = sec % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return `${minutes}:${seconds}`;
}

function state(initValue) {
  function decrement(current) {
    if (current > 0) {
      return current - 1;
    } else {
      return 0;
    }
  }

  function reset() {
    return initValue;
  }

  return { decrement, reset };
}

function createCounterElement(container, onStart, onStop, onReset) {
  // Ez felelős a DOM részért
  const app = document.createElement("div"); // alkalmazás
  const time = document.createElement("h2"); // idő értékét jeleníti meg
  const wrapper = document.createElement("div");
  const startBtn = document.createElement("button");
  const stopBtn = document.createElement("button");
  const resetBtn = document.createElement("button");

  app.className = "timer";

  startBtn.innerText = "start";
  stopBtn.innerText = "stop";
  resetBtn.innerText = "reset";

  wrapper.appendChild(startBtn);
  wrapper.appendChild(stopBtn);
  wrapper.appendChild(resetBtn);

  app.appendChild(time);
  app.appendChild(wrapper);

  container.appendChild(app);

  startBtn.addEventListener("click", onStart);
  stopBtn.addEventListener("click", onStop);
  resetBtn.addEventListener("click", onReset);

  function render(currentTime) {
    time.innerText = currentTime;
  }

  return { render };
}

function counter(initValue, container) {
  // ez felelős az app életéért
  const counterState = state(initValue);

  let intervalId = null;
  let currentTime = initValue;

  function handleStart() {
    if (!intervalId && currentTime > 0) {
      function start() {
        currentTime = counterState.decrement(currentTime);

        htmlElement.render(formatTime(currentTime));

        if (currentTime === 0) {
          clearInterval(intervalId);
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

    currentTime = counterState.reset();
    htmlElement.render(formatTime(currentTime));
  }

  const htmlElement = createCounterElement(
    container,
    handleStart,
    handleStop,
    handleReset
  );
  htmlElement.render(formatTime(initValue));
}

//* eseményfigyelő
function handleSubmit(event) {
  event.preventDefault();

  const $min = event.target[0];
  const $sec = event.target[1];

  const initValue = Number($min.value * 60) + Number($sec.value);

  counter(initValue, $app);

  $min.value = "";
  $sec.value = "";
}

$form.addEventListener("submit", handleSubmit);
