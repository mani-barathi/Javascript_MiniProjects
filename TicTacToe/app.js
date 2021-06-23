const appContainer = document.querySelector(".app-container");
const boxes = document.querySelectorAll(".box");
const textToPlay = document.querySelector(".text-to-play");
const gameOverModal = document.querySelector(".game-over-modal");
const gameOverModalText = document.querySelector(".game-over-modal-text");
const resetButton = document.querySelector(".reset-button");
const selectGameModeModal = document.querySelector(".select-mode-modal");
const selectGameModeBtns = document.querySelectorAll(".select-modal-mode");

let arr, count, handleMove;
let isPlayerVsComputer, isGoing, foundWinner;

function showGameOverModal(isDraw, winner = null) {
  if (isDraw) gameOverModalText.textContent = "Game DRAW!";
  else gameOverModalText.textContent = `${winner} won!`;
  gameOverModal.classList.add("game-modal-fade-in");
}

function checkWin(board = null) {
  board = board ? board : arr;

  let row1 = board[0] === board[1] && board[1] === board[2] && board[2] !== "-";
  let row2 = board[3] === board[4] && board[4] === board[5] && board[5] !== "-";
  let row3 = board[6] === board[7] && board[7] === board[8] && board[8] !== "-";

  let col1 = board[0] === board[3] && board[3] === board[6] && board[6] !== "-";
  let col2 = board[1] === board[4] && board[4] === board[7] && board[7] !== "-";
  let col3 = board[2] === board[5] && board[5] === board[8] && board[8] !== "-";

  let diag1 =
    board[0] === board[4] && board[4] === board[8] && board[8] !== "-";
  let diag2 =
    board[2] === board[4] && board[4] === board[6] && board[6] !== "-";

  let possibilities = [row1, row2, row3, col1, col2, col3, diag1, diag2];

  for (let i = 0; i < possibilities.length; i++) {
    if (possibilities[i])
      // checking if any one possiblity is true,
      return true; // if so we found the winner, return true
  }
  return false;
}

function checkDraw() {
  if (!foundWinner && count == 8) return true;
  return false;
}

function getComputerMove() {
  let possibileMoves = arr
    .map((el, i) => (el === "-" ? i : el))
    .filter((a) => a >= 0 && a <= 8);

  for (turn of ["O", "X"]) {
    for (i of possibileMoves) {
      let tempBoard = [...arr];
      tempBoard[i] = turn;
      if (checkWin(tempBoard)) return i;
    }
  }

  // let corners = [0, 2, 6, 8];
  // for (move of possibileMoves) {
  //     if (corners.includes(move))
  //         return move;
  // }

  let randomMove =
    possibileMoves[Math.floor(Math.random() * possibileMoves.length)];
  return randomMove;
}

function handleMoveOnComputerVsPlayer(event, isComputer) {
  const move = isComputer ? "O" : "X";

  if (isComputer) {
    // computer Move
    let cMove = getComputerMove();
    arr[cMove] = move;
    boxes[cMove].querySelector("p").textContent = move;
    boxes[cMove].removeEventListener("click", handleMove);
    boxes[cMove].classList.add("box-filled");
  } else {
    // Player MOve
    const indexNo = parseInt(event?.target.dataset.id);
    event.target.querySelector("p").textContent = move;
    event.target.classList.add("box-filled");
    arr[indexNo] = move;
  }

  if (checkWin()) {
    foundWinner = true;
    isGoing = false;
    textToPlay.textContent = `${move} won !!`;
    showGameOverModal(false, move);
  } else if (checkDraw()) {
    isGoing = false;
    textToPlay.textContent = "DRAW";
    showGameOverModal(true);
  } else textToPlay.textContent = `${isComputer ? "X" : "O"} to Play`;

  count++;
  if (isPlayerVsComputer && !isComputer && isGoing) {
    setTimeout(() => handleMove(null, true), 250); // to delay the computer move by 0.5s
  }
}

function handleMoveOnPlayerVsPlayer(event) {
  const indexNo = event.target.dataset.id;
  const move = count % 2 === 0 ? "X" : "O";

  event.target.querySelector("p").textContent = move;
  arr[indexNo] = move;

  if (checkWin()) {
    foundWinner = true;
    textToPlay.textContent = `${move} won !!`;
    showGameOverModal(false, move);
  } else if (checkDraw()) {
    textToPlay.textContent = "DRAW";
    showGameOverModal(true);
  } else textToPlay.textContent = `${count % 2 === 0 ? "O" : "X"} to Play`;

  event.target.classList.add("box-filled");
  count++;
}

function setResetGame() {
  arr = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  count = 0;
  foundWinner = false;
  isGoing = true;
  textToPlay.textContent = "X to Play";

  handleMove = isPlayerVsComputer
    ? handleMoveOnComputerVsPlayer
    : handleMoveOnPlayerVsPlayer;

  boxes.forEach((box) => {
    box.querySelector("p").textContent = "";
    box.classList.remove("box-filled");
    box.removeEventListener("click", handleMove);
    box.addEventListener("click", handleMove, { once: true });
  });
  gameOverModal.classList.remove("game-modal-fade-in");

  if (isPlayerVsComputer) {
    if ([true, false][Math.floor(Math.random() * 2)]) handleMove(null, true);
  }
}

function chooseMode(event) {
  let mode = event.target.dataset.mode;
  isPlayerVsComputer = mode === "1" ? false : true;
  selectGameModeModal.style.display = "none";
  appContainer.classList.add("game-modal-fade-in");
  setResetGame();
}

[...selectGameModeBtns].forEach((modeBtn) => {
  modeBtn.addEventListener("click", chooseMode);
});
resetButton.addEventListener("click", setResetGame);
