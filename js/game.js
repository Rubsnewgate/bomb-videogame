const domElements = {
    // game menu
    startGameBtn: document.querySelector('#start-game'),
    gameMenu: document.querySelector('.game__menu'),

    // game elements
    livesIndicator: document.querySelector('#lives'),
    gameScreen: document.querySelector('.game__screen'),
    record: document.querySelector('#record'),
    canvas: document.querySelector('#canvas'),
    timer: document.querySelector('#timer'),

    // game btns
    rightBtn: document.querySelector('.btn-right'),
    leftBtn: document.querySelector('.btn-left'),
    downBtn: document.querySelector('.btn-down'),
    upBtn: document.querySelector('.btn-up'),

    // game over state
    restartBtnA: document.querySelector('.btn_reset'),
    restartBtnB: document.querySelector('.btn_reset-two'),
    winner: document.querySelector('.winner'),
    looser: document.querySelector('.looser'),
}

domElements.startGameBtn.addEventListener('click', showCanvas)

domElements.rightBtn.addEventListener('click', moveRight)
domElements.leftBtn.addEventListener('click', moveLeft)
domElements.downBtn.addEventListener('click', moveDown)
domElements.upBtn.addEventListener('click', moveUp)

// victory or defeat of the player
domElements.restartBtnA.addEventListener('click', resetGame)
domElements.restartBtnB.addEventListener('click', resetGame)

// window events
window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

// game variables
const canvasContext = domElements.canvas.getContext("2d")
let playerLives = 3
let gameLevel = 0
let timeInterval
let canvasSize
let timeStart
let tileSize

const playerPosition = {
    x: undefined,
    y: undefined,
}

const portalPosition = {
    x: undefined,
    y: undefined,
}

let obstaclesPosition = []
let burstPosition = []

// initial game state
domElements.gameScreen.style.display = 'none'
domElements.winner.style.display = 'none'
domElements.looser.style.display = 'none'

// utility functions
function showCanvas () {
    domElements.gameScreen.style.display = 'flex'
    domElements.gameMenu.style.display = 'none'
}

function setCanvasSize () {
    canvasSize = Math.min(window.innerWidth * 0.7, window.innerHeight * 0.7)

    domElements.canvas.width = canvasSize
    domElements.canvas.height = canvasSize

    // 10x10 canvas and gap between tiles of 1.5px
    tileSize = canvasSize / 10 - 1.5

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function showPlayerLives () {
    domElements.livesIndicator.textContent = emojis['heart'].repeat(playerLives)
}

function showTime () {
    const elapsedTime = Date.now() - timeStart
    const minutes = Math.floor(elapsedTime / 60000)
    const seconds = Math.floor((elapsedTime % 60000) / 1000)

    domElements.timer.textContent = `${minutes} : ${seconds}`
}

function showRecord () {
    domElements.record.textContent = localStorage.getItem("record_time")
}

function startGame () {
    canvasContext.font = `${tileSize}px 'Montserrat'`

    // accessing game levels from map.js
    const map = maps[gameLevel]

    if (!map) {
        gameWin()
        return
    }

    showPlayerLives()

    // validate that timeStart isn't initialized
    if (!timeStart) {
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 1000)
    }

    showRecord()

    // convert string map to an array
    const mapRows = map.trim().split('\n')
    console.log(mapRows)
    const mapRowsClean = mapRows.map(element => element.trim())
    console.log(mapRowsClean)
    const mapRowsCols = mapRowsClean.map(element => element.split(''))
    console.log(mapRowsClean)

    // clean the canvas
    canvasContext.clearRect(0, 0, canvasSize, canvasSize)

    // clean obstacles array
    obstaclesPosition = []

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const xPosition = tileSize * columnIndex
            const yPosition = tileSize * (rowIndex + 1)

            // render the game map
            canvasContext.fillText(emojis[column], xPosition, yPosition)

            // player's starting position
            if (column === 'S'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = xPosition
                    playerPosition.y = yPosition
                }
            }
            // locate finish line's position
            else if (column === 'F') {
                portalPosition.x = xPosition
                portalPosition.y = yPosition
            }
            // locate bomb's position
            else if (column === 'X'){
                obstaclesPosition.push({
                    x: Math.trunc(xPosition),
                    y: Math.trunc(yPosition),
                })
            }
        })
    })

    renderPlayer(playerPosition.x, playerPosition.y)
    burstPosition.forEach((fire) => canvasContext.fillText(emojis['bombCollision'], fire.x, fire.y))
}

function gameLevelWin () {
    gameLevel++
    burstPosition = []
    startGame()
}

function gameLevelFail () {
    playerLives--

    if (playerLives <= 0) {
        domElements.looser.style.display = 'flex'
        domElements.gameScreen.style.display = 'none'
        gameLevel = 0
        playerLives = 3
        timeStart = null
    }

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function renderPlayer (x, y) {
    canvasContext.fillText(emojis['player'], x, y)

    // create a variable for each different collision (on the x and y axes)
    const portalCollisionX = Math.trunc(playerPosition.x) === Math.trunc(portalPosition.x)
    const portalCollisionY = Math.trunc(playerPosition.y) === Math.trunc(portalPosition.y)
    const isPlayerInPortal = portalCollisionX && portalCollisionY

    if (isPlayerInPortal) {
        gameLevelWin ()
    }

    // determine collisions (bombs)
    obstaclesPosition.forEach((bomb) => {
        const bombCollisionX = Math.trunc(bomb.x) === Math.trunc(playerPosition.x)
        const bombCollisionY = Math.trunc(bomb.y) === Math.trunc(playerPosition.y)
        const bombExplode = bombCollisionX && bombCollisionY

        if (bombExplode) {
            burstPosition.push({
                x: bomb.x,
                y: bomb.y,
            })
            gameLevelFail()
        }
    })
}

function gameWin () {
    clearInterval(timeInterval)

    const recordTime = localStorage.getItem("record_time")
    const playerTime = Date.now() - timeStart

    if (recordTime) {
        if (recordTime > playerTime) {
            localStorage.setItem("record_time", playerTime)
            domElements.record.textContent = 'New record time!'
        }
        else {
            domElements.record.textContent = 'Your record still stands!'
        }
    }
    else {
        localStorage.setItem("record_time", playerTime)
        domElements.record.textContent = 'You set a new record!'
    }

    domElements.winner.style.display = 'flex'
    domElements.gameScreen.style.display = 'none'
}

function resetGame () {
    location.reload()
}

function moveUp () {
    if (playerPosition.y > (tileSize)) {
        playerPosition.y = playerPosition.y - tileSize
    }
    startGame()
}

function moveLeft () {
    if (playerPosition.x > 1) {
        playerPosition.x = playerPosition.x - tileSize
    }
    startGame()
}

function moveRight () {
    if (playerPosition.x < canvasSize - tileSize) {
        playerPosition.x = playerPosition.x + tileSize
    }
    startGame()
}

function moveDown () {
    if (playerPosition.y < canvasSize) {
        playerPosition.y = playerPosition.y + tileSize
    }
    startGame()
}

window.addEventListener('keydown', moveByKeys)

function moveByKeys (event) {
    switch(event.key){
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break
        default:
            console.log("No_Movement")
            break
    }
}
