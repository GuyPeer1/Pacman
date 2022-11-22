'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWERFOOD = '🥗'
const CHERRY = '🍒'
var gGame = {}
var board
var gIsvictory = false
var gCherryInterval

function onInit() {
    gGame = { 
        score:0,
        isOn: false,
        isVictory: false,
        deadGhosts: []
    }
    gGhosts = []
    board = buildBoard()
    createGhosts(board)
    createPacman(board)
    renderBoard(board, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(cherryPlacer, 3000)
    
}

function buildBoard() {
    const size = 10
    const board = []
    gFoodLeft = 60
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            
            if (i === 1 && j === 1 || i === 1 && j === 8
                || i === 8 && j === 1 || i === 8 && j === 8)
                board[i][j] = POWERFOOD
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver(isVictory) {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    gGhosts = []
    renderCell(gPacman.location, (isVictory) ? '😊' : '😭')

    var userMsg = (isVictory) ? 'You have won!' : 'You have lost!'
    const span = document.getElementById('span');
    span.innerText = userMsg
    //show modal
    var modal = document.getElementById("myModal");
    modal.style.display = 'block'
}

function playAgain() {
    console.log('play agin')
    updateScore(-gGame.score)
    onInit()
    var modal = document.getElementById("myModal");
    modal.style.display = 'none'
}
function cherryPlacer() {
    var randEmptyCell = getEmptyCell(board)
    if(!randEmptyCell) return
 
    // Update Model
    board[randEmptyCell.i][randEmptyCell.j] = CHERRY

    // Update DOM
    renderCell(randEmptyCell, CHERRY)
}
