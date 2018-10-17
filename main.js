let seconds = 25 * 60;
let timeoutId;

const timer = () => {
  seconds = seconds - 1;
  renderClock(seconds);
  if (seconds < 1) {
    seconds = 1;
  }
};

const formatSeconds = seconds => {
  let minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  let remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return { minutes, remainingSeconds };
};

const start = () => {
  timeoutId = setInterval(timer, 1000);
  setButtons("running");
};

const reset = () => {
  seconds = 25 * 60;
  renderClock(seconds);
  clearInterval(timeoutId);
  setButtons("reset");
};

const setButtons = state => {
  if (state === "running") {
    document.querySelector("#start").disabled = true;
    document.querySelector("#pause").disabled = false;
    document.querySelector("#reset").disabled = false;
  } else if (state === "paused") {
    document.querySelector("#start").disabled = false;
    document.querySelector("#pause").disabled = true;
    document.querySelector("#reset").disabled = false;
  } else if (state === "reset") {
    document.querySelector("#start").disabled = false;
    document.querySelector("#pause").disabled = true;
    document.querySelector("#reset").disabled = false;
  }
};

const renderClock = seconds => {
  timeObject = formatSeconds(seconds);
  remainingSeconds = timeObject.remainingSeconds;
  minutes = timeObject.minutes;
  document.querySelector("#seconds").textContent = remainingSeconds;
  document.querySelector("#minutes").textContent = minutes;
};
