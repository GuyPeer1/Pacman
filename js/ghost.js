'use strict'

const GHOST = '&#9781'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    // var strHTML = ''
    for (var i = 0; i < 0; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }


}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = board[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        gameOver(gIsvictory = false)
        return
    }


    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    board[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    board[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) {
        return `<span><font color=0734bd> ${GHOST}</font></span>`
    }
    return `<span><font color=${ghost.color}> ${GHOST}</font></span>`
}

function killGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var location =  gGhosts[i].location
        if (nextLocation.i === location.i &&
            nextLocation.j === location.j) {
            var deadGhost = gGhosts.splice(gGhosts[i], 1)[0] // [{...}]
            gGame.deadGhosts.push(deadGhost)
        }
    }
}


function reviveGhost() {
    for (var i = 0; i < gGame.deadGhosts.length; i++) {
        var currGhost = gGame.deadGhosts[i]
        gGhosts.push(currGhost)
    }
}
