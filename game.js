let gameBoard, currentPlayer
let over = true
const statusEl = document.getElementById('status')
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]]

const startGame = (event) => {
  gameBoard = ['','','','','','','','','']
  currentPlayer = 'X'
  over = false
  statusEl.textContent = "Tic Tac"
  const squares = document.getElementsByClassName('column')
  for (let i = 0; i < squares.length; i++) {
    squares[i].setAttribute('class', 'column overlay')
    squares[i].textContent = ''
    squares[i].addEventListener('click', onSquareClick)
  }
}
document.getElementById('start').addEventListener('click', startGame)

const drawGame = gameBoard => {
  if(gameBoard.every(value => value !== '')) {
    currentPlayer = 'No one'
    return true
  }
}

const winGame = (gameBoard, player) => {
  const indexesOfPlayer = gameBoard.map((piece, i) => piece === player ? i : null)
    .filter(val => val !== null)
  return winConditions.some(combo => combo.every(i => indexesOfPlayer.includes(i)))
}

const onSquareClick = function(event) {
  if (!over) {
    event.target.textContent = currentPlayer
    event.target.setAttribute('class','column')
    gameBoard[event.target.id] = currentPlayer
    if (winGame(gameBoard, currentPlayer) || drawGame(gameBoard)) {
      over = true
      statusEl.textContent = `${currentPlayer} wins!!!`
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  }
}
