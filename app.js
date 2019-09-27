const width = 10
const squares = []
const offsets = [-1, -1-width, -width, -width+1, 1, width+1, width, width-1]
let player = 'white'

function getLineToFlip(index, offset) {
  const colorToFind = player === 'white' ? 'black' : 'white'
  let nextIndex = index + offset
  let nextSquare = squares[nextIndex]
  const squaresToFlip = []

  while(nextSquare && nextSquare.className === colorToFind) {
    if(offset < 0 && nextIndex % width === 0) break
    if(offset > 0 && nextIndex % width === width-1) break
    squaresToFlip.push(nextSquare)
    nextIndex += offset
    nextSquare = squares[nextIndex]
  }

  return nextSquare && nextSquare.classList.contains(player) ? squaresToFlip : []
}

function getSquaresToFlip(index) {
  return offsets
    .map(offset => getLineToFlip(index, offset))
    .reduce((flattened, squares) => flattened.concat(squares), [])
}

function flipSquares(squaresToFlip) {
  squaresToFlip.forEach(square => {
    square.classList.remove('black', 'white')
    square.classList.add(player)
  })
}

function handleClick(e) {
  if(e.target.className) return false
  const index = squares.indexOf(e.target)
  const squaresToFlip = getSquaresToFlip(index)

  if(squaresToFlip.length === 0) return false

  flipSquares(squaresToFlip)
  e.target.classList.add(player)

  player = player === 'white' ? 'black' : 'white'
}

function generateBoard() {
  const board = document.querySelector('.board')

  for(let i = 0; i < width ** 2; i++) {
    const square = document.createElement('DIV')

    if([44, 55].includes(i)) square.classList.add('black')
    if([45, 54].includes(i)) square.classList.add('white')

    squares.push(square)
    board.appendChild(square)
  }
}

function addEventListeners() {
  squares.forEach(square => square.addEventListener('click', handleClick))
}

function init() {
  generateBoard()
  addEventListeners()
}

document.addEventListener('DOMContentLoaded', init)
