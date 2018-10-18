let seconds;
let counterId;
let flashId;

getInitialSeconds = () => {
  const minutes = +document.querySelector("#min-in").value;
  const seconds = +document.querySelector("#sec-in").value;
  return minutes * 60 + seconds;
};

const timer = () => {
  renderClock((seconds -= 1));
  if (!seconds) {
    endTimer();
  }
};

endTimer = () => {
  setButtons("finished");
  flashId = setInterval(flashBackground, 200);
  audio = new Audio("bell-ring-01.mp3");
  audio.play();
  clearInterval(counterId);
  if (Notification.permission === "granted") {
    new Notification("Time for a break!");
  }
};

const renderClock = seconds => {
  const { minutes, remainingSeconds } = formatSeconds(seconds);
  document.querySelector("#seconds").textContent = remainingSeconds;
  document.querySelector("#minutes").textContent = minutes;
  document.title = `${minutes}:${remainingSeconds}`;
};

const formatSeconds = seconds => {
  let minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  let remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return { minutes, remainingSeconds };
};

flashBackground = () => {
  let background = document.body.style.backgroundColor;
  const style = document.body.style;
  background === ""
    ? (style.backgroundColor = "red")
    : (style.backgroundColor = "");
};

const setButtons = state => {
  const start = document.querySelector("#start");
  const pause = document.querySelector("#pause");
  const reset = document.querySelector("#reset");
  if (state === "running") {
    start.disabled = true;
    pause.disabled = false;
    reset.disabled = false;
  } else if (state === "paused") {
    start.disabled = false;
    pause.disabled = true;
    reset.disabled = false;
  } else if (state === "reset") {
    start.disabled = false;
    pause.disabled = true;
    reset.disabled = false;
  } else if (state === "finished") {
    start.disabled = true;
    pause.disabled = true;
    reset.disabled = false;
  }
};

const start = () => {
  seconds = getInitialSeconds();
  counterId = setInterval(timer, 1000);
  setButtons("running");
};

const reset = () => {
  seconds = getInitialSeconds();
  renderClock(seconds);
  clearInterval(counterId);
  setButtons("reset");
  clearInterval(flashId);
  document.body.style.backgroundColor = "";
};

const pause = () => {
  clearInterval(counterId);
  setButtons("paused");
};

Notification.requestPermission();
