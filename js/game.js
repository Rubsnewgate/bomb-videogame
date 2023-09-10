// Menu elements
const gameMenu = document.querySelector('#game__menu')
const startGameBtn = document.querySelector('#btn__startGame')
startGameBtn.addEventListener('click', showCanvas)

// Game elements
const gameContainer = document.querySelector('.game__container')
const canvas = document.querySelector('#game')
const game = canvas.getContext("2d")

const playerLives = document.querySelector('#lives')
const timer = document.querySelector('#timer')
const record = document.querySelector('#record')

const btnUp = document.querySelector('.btn-up')
const btnDown = document.querySelector('.btn-down')
const btnLeft = document.querySelector('.btn-left')
const btnRight = document.querySelector('.btn-right')

btnUp.addEventListener('click', moveUp)
btnDown.addEventListener('click', moveDown)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)

// Victory or defeat of the player
const winner = document.querySelector('.winner')
const looser = document.querySelector('.looser')
const restartBtn = document.querySelector('.btn_reset')
const restartBtnTwo = document.querySelector('.btn_reset-two')

restartBtn.addEventListener('click', resetGame)
restartBtnTwo.addEventListener('click', resetGame)

// Window events
window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

// Global variables
let canvasSize;
let elementSize;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x:undefined,
    y:undefined,
}
const portalPosition = {
    x:undefined,
    y:undefined,
}

let obstaculosPosition = []
let firePosition = []

gameContainer.style.display = 'none'
winner.style.display = 'none'
looser.style.display = 'none'

function showCanvas() {
    gameContainer.style.display = 'flex'
    gameMenu.style.display = 'none'
}

function setCanvasSize(){
    canvasSize = Math.min(window.innerWidth * 0.7, window.innerHeight * 0.7)

    canvas.width = canvasSize
    canvas.height = canvasSize

    elementSize = canvasSize / 10 - 1.5

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function showLives(){
    playerLives.textContent = emojis['HEART'].repeat(lives)
}

function showTime() {
    const elapsedTime = Date.now() - timeStart
    const minutes = Math.floor(elapsedTime / 60000)
    const seconds = Math.floor((elapsedTime % 60000) / 1000)

    timer.textContent = `${minutes} : ${seconds}`
}

function showRecord() {
    record.textContent = localStorage.getItem("record_time");
}

function startGame(){
    game.font = `${elementSize}px 'Montserrat'`

    //Dividir cada mapa en arrays bidimendionales
    const map = maps[level]

    if (!map) {
        gameWin()
        return
    }

    showLives()

    if (!timeStart) { //validación de que no exista timeStart
        timeStart = Date.now()
        timeInterval = setInterval(showTime,1000)
    }

    showRecord()

    const mapRows = map.trim().split('\n');
    const mapRowsClean = mapRows.map(value => value.trim());

    const mapRowsCols = mapRowsClean.map(value=>value.split(''))

    //Limpiar canvas
    game.clearRect(0, 0, canvasSize, canvasSize)

    //Limpiar array de obstáculos
    obstaculosPosition = []

    // Uso de método de arrays: arrays.forEach()
    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const xPosition = elementSize * columnIndex
            const yPosition = elementSize * (rowIndex + 1)

            game.fillText(emojis[column], xPosition, yPosition)  //Renderizado del mapa del juego

            //Ubicar posición inicial del JUGADOR
            if (column == 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = xPosition
                    playerPosition.y = yPosition
                }
            }
            else if (column == 'I') {
                portalPosition.x = xPosition
                portalPosition.y = yPosition
            }
            else if (column == 'X'){      //Ubicar posición de las bombas (Clase 13)
                obstaculosPosition.push({
                    x:Math.trunc(xPosition),
                    y:Math.trunc(yPosition),
                })
            }
        })
    })

    renderizarJugador(playerPosition.x, playerPosition.y)
    firePosition.forEach( fire => game.fillText(emojis['BOMB_COLLISION'],fire.x,fire.y))
}

function levelWin(){
    level++
    firePosition = []
    startGame()
}

function levelFail() {
    lives--
    if (lives<=0) {
        looser.style.display = 'flex'
        gameContainer.style.display = 'none'
        level=0
        lives=3
        timeStart=null;
    }

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function renderizarJugador(x , y) {
    game.fillText(emojis['PLAYER'],x,y);

    //CREAR UNA VARIABLE POR CADA DISTINTA COLISIÓN (en eje X e Y)
    const portalCollisionX = Math.trunc(playerPosition.x) == Math.trunc(portalPosition.x)
    const portalCollisionY = Math.trunc(playerPosition.y) == Math.trunc(portalPosition.y)
    const isPlayerInPortal = portalCollisionX && portalCollisionY

    if (isPlayerInPortal) {
        levelWin()
    }

    // determinar colisiones (bombas)
        // Clase 13: determinar colisiones (bombas)
        obstaculosPosition.forEach(enemy => {
            const enemyColisionX = Math.trunc(enemy.x) == Math.trunc(playerPosition.x)
            const enemyColisionY = Math.trunc(enemy.y) == Math.trunc(playerPosition.y)
            const bombExplode = enemyColisionX && enemyColisionY

            if (bombExplode) {
                firePosition.push({
                    x: enemy.x,
                    y: enemy.y,
                })
                levelFail()
            }
        })
}

function gameWin(){
    clearInterval(timeInterval)

    const recordTime = localStorage.getItem("record_time")
    const playerTime = Date.now() - timeStart

    if (recordTime) {

        if (recordTime > playerTime) {
            localStorage.setItem("record_time", playerTime);
            record.textContent = 'Superaste tu marca!'
        }
        else {
            record.textContent = 'No lograste superar tu marca!'
        }
    }
    else {
        localStorage.setItem("record_time", playerTime)
        record.textContent = 'Has logrado una nueva marca!'
    }
    winner.style.display = 'flex'
    gameContainer.style.display = 'none'
}

function resetGame() {
    location.reload()
}

function moveUp(){
    if (playerPosition.y > (elementSize)) {
        playerPosition.y = playerPosition.y - elementSize
    }
    startGame()
}
function moveLeft(){
    if (playerPosition.x > 1) {
        playerPosition.x = playerPosition.x - elementSize
    }
    startGame()
}
function moveRight(){
    if (playerPosition.x < canvasSize - elementSize) {
        playerPosition.x = playerPosition.x + elementSize
    }
    startGame()
}
function moveDown(){
    if (playerPosition.y < canvasSize) {
        playerPosition.y = playerPosition.y + elementSize
    }
    startGame()
}

window.addEventListener('keydown', moveByKeys)

function moveByKeys(event){
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
    }
}