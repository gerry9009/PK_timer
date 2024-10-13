//* HTML elemek
const $form = document.querySelector("form");
const $app = document.querySelector("#app");

class CounterElement {
  constructor() {
    this.element = null;
    this.timeElement = null;

    this.startHandler = null;
    this.stopHandler = null;
    this.resetHandler = null;

    this.createCounterElement();
  }

  createCounterElement() {
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

    app.appendChild(time);
    app.appendChild(wrapper);
    wrapper.appendChild(startBtn);
    wrapper.appendChild(stopBtn);
    wrapper.appendChild(resetBtn);

    startBtn.addEventListener("click", () => {
      console.log("Click start");
      if (this.startHandler && typeof this.startHandler === "function") {
        this.startHandler();
      }
    });

    stopBtn.addEventListener("click", () => {
      console.log("Click stop");
      if (this.stopHandler && typeof this.stopHandler === "function") {
        this.stopHandler();
      }
    });

    resetBtn.addEventListener("click", () => {
      console.log("Click reset");
      if (this.resetHandler && typeof this.resetHandler === "function") {
        this.resetHandler();
      }
    });

    this.element = app;
    this.timeElement = time;
  }

  // formázó függvény
  formatTime(sec) {
    const minutes = Math.floor(sec / 60); // megkapjuk a perc értékét

    let seconds = sec % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
  }

  // render
  renderApp(parent) {
    parent.appendChild(this.element);
  }

  render(sec) {
    this.timeElement.innerText = this.formatTime(sec);
  }

  // eseményfigyelők hozzáadása
  addStartHandler(callback) {
    this.startHandler = callback;
  }
  addStopHandler(callback) {
    this.stopHandler = callback;
  }
  addResetHandler(callback) {
    this.resetHandler = callback;
  }
}

class CounterApp {
  constructor(seconds, container) {
    this.app = new CounterElement();
    this.container = container;
    this.initSeconds = seconds;

    this.seconds = seconds;
    this.intervalId = null;

    this.init();
  }

  init() {
    this.app.renderApp(this.container);
    this.app.render(this.initSeconds);

    this.app.addStartHandler(this.startHandler);
    this.app.addStopHandler(this.stopHandler);
    this.app.addResetHandler(this.resetHandler);
  }

  //! Best practice - nyílfüggvény használata class-on belül
  startHandler = () => {
    // console.log("Click", this);

    if (!this.intervalId && this.seconds > 0) {
      this.intervalId = setInterval(() => {
        if (this.seconds === 0) {
          clearInterval(this.intervalId);
        } else {
          this.seconds--;
          this.app.render(this.seconds);
        }
      }, 1000);
    }
  };

  stopHandler = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };

  resetHandler = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.seconds = this.initSeconds;
    this.app.render(this.seconds);
  };
}

const handleSubmit = (event) => {
  event.preventDefault();

  const $min = event.target[0];
  const $sec = event.target[1];

  const initValue = Number($min.value * 60) + Number($sec.value);

  new CounterApp(initValue, $app);

  event.target.reset();
};

$form.addEventListener("submit", handleSubmit);
