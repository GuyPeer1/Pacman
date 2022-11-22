'use strict'

const PACMAN = '👉'
var gPacman
var gFoodLeft
function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: '0'
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN


}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = board[nextLocation.i][nextLocation.j]
    console.log(nextCell)
    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver, unless super mood
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver(gIsvictory = false)
        return
    }
    //hitting a ghost while super is on
    if (nextCell === GHOST && gPacman.isSuper) {
        killGhost(nextLocation)
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gFoodLeft--
        if (gFoodLeft === 0) {       //Victory scenario
            gIsvictory = true
            gameOver(gIsvictory)
            return
        }
    }

    if (nextCell === POWERFOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        updateScore(1)
        setTimeout(() => {
            gPacman.isSuper = false
            reviveGhost()
        }, '5000')
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }


    // DONE: moving from current location:
    // DONE: update the model
    board[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    board[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    //renderCell(nextLocation, PACMAN)
    renderCell(nextLocation, getPacmanHTML(gPacman.deg))
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            gPacman.deg = '-90'
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.deg = '0'
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.deg = '90'
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.deg = '180'
            nextLocation.j--
            break;
    }
    return nextLocation
}

function getPacmanHTML(deg) {
    return `<div class="pacman" style="transform: rotate(${deg}deg)">${PACMAN}</div>`
}
