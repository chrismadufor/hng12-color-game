const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F0FF33",
  "#FF33F0",
  "#33FFF0",
];
let targetColor = "";
let score = 0;
let timer = 60;
let difficulty = 1;

const colorBox = document.getElementById("colorBox");
const optionsContainer = document.getElementById("options");
const gameStatus = document.getElementById("gameStatus");
const endWrap = document.getElementById("endWrap");
const gameWrap = document.getElementById("gameWrap");
const metaWrap = document.getElementById("metaWrap");
const startWrap = document.getElementById("startWrap");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const newGameButton = document.getElementById("newGameButton");
const resetGameButton = document.getElementById("resetGameButton");
const startGameButton = document.getElementById("startGameButton");

function getRandomColorSet() {
  let currentColors = [...colors];
  if (difficulty > 3) {
    currentColors = currentColors.concat([
      "#FF6666",
      "#66FF66",
      "#6666FF",
      "#FFFF66",
      "#FF66FF",
      "#66FFFF",
    ]);
  }
  return currentColors.sort(() => 0.5 - Math.random()).slice(0, 6);
}

function startGame() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;
  setTimeout(() => {
    colorBox.classList.add("hide");
    optionsContainer.classList.remove("hide");
    gameStatus.textContent = "Pick the right color!";
    optionsContainer.classList.add("options-grid");
  }, 2000);

  optionsContainer.innerHTML = "";
  gameStatus.textContent = "Keep this color in your mind!";

  // const colorOptions = getRandomColorSet();
  colors.forEach((color) => {
    const btn = document.createElement("button");
    btn.classList.add("colorOption");
    btn.style.backgroundColor = color;
    btn.setAttribute("data-testid", "colorOption");
    btn.onclick = () => {
      btn.classList.add("pressed");
      setTimeout(() => btn.classList.remove("pressed"), 150);
      checkGuess(color);
    };

    optionsContainer.appendChild(btn);
  });

  scoreDisplay.textContent = score;
}

function checkGuess(color) {
  if (color === targetColor) {
    gameStatus.textContent = "Correct!";
    score++;
    difficulty++;
    scoreDisplay.textContent = `Score: ${score}s`;
    colorBox.classList.remove("hide");
    optionsContainer.classList.add("hide");
    optionsContainer.classList.remove("options-grid");
    startGame();
  } else {
    gameStatus.textContent = "Wrong! Try again.";
    colorBox.classList.add("shake");
    setTimeout(() => colorBox.classList.remove("shake"), 500);
  }
}

let interval;

function startTimer() {
  clearInterval(interval);
  timer = 60;
  console.log("hi", timer);
  interval = setInterval(() => {
    timer = timer - 1;
    timerDisplay.textContent = `Time: ${timer}s`;
    if (timer <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameStatus.textContent = `Game Over! Your final score: ${score}`;
  optionsContainer.innerHTML = "";

  gameWrap.classList.add("hide");
  endWrap.classList.remove("hide");
}

function beginGame() {
  colorBox.classList.remove("hide");
  optionsContainer.classList.add("hide");
  optionsContainer.classList.remove("options-grid");
  endWrap.classList.add("hide");
  startWrap.classList.add("hide");
  gameWrap.classList.remove("hide");
  startGame();
  startTimer();
}

function resetGame() {
  score = 0;
  difficulty = 1;
  scoreDisplay.textContent = 0;
  colorBox.classList.remove("hide");
  optionsContainer.classList.add("hide");
  optionsContainer.classList.remove("options-grid");
  endWrap.classList.add("hide");
  startWrap.classList.add("hide");
  gameWrap.classList.remove("hide");
  startGame();
  startTimer();
}

startGameButton.onclick = () => {
  beginGame();
};

newGameButton.onclick = () => {
  resetGame();
};

resetGameButton.onclick = () => {
  resetGame();
};
