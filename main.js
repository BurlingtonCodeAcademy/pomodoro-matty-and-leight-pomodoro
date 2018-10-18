let initialSeconds = 25 * 60;
let seconds = initialSeconds;
let timeoutId;

const timer = () =>
  seconds ? renderClock(seconds - 1) : clearInterval(timeoutId);

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

const start = () => {
  timeoutId = setInterval(timer, 1000);
  setButtons("running");
};

const reset = () => {
  seconds = initialSeconds;
  renderClock(seconds);
  clearInterval(timeoutId);
  setButtons("reset");
};

const pause = () => {
  clearInterval(timeoutId);
  setButtons("paused");
};
