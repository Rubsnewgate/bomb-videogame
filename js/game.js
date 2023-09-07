// Canvas y contexto
const canvas = document.querySelector('.game')
const game = canvas.getContext('2d')

// Botones del juego
const btnUp = document.querySelector('.btn-up')
const btnDown = document.querySelector('.btn-down')
const btnRight = document.querySelector('.btn-right')
const btnLeft = document.querySelector('.btn-left')

// Variables globlales
let elementsSize
let viewportSize
const playerPosition = {
	x: undefined,
	y: undefined,
}

// Al cargar la página, establece el tamaño del canvas, al redimenzionarse ajusta su tamaño
window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize() {
	viewportSize = Math.min(window.innerWidth * .75, window.innerHeight * .75)

	canvas.width = viewportSize
	canvas.height = viewportSize

	elementsSize = (viewportSize *  0.1) - 1.5
	startGame()
}

function startGame() {
	game.font = `${elementsSize}px 'Montserrat'`
	game.textAlign = 'end'

	// Selección del mapa
	const map = maps[0]
	// División del mapa en filas
	const mapRows = map.trim().split('\n')
	// Divide cada fila en columnas
	const mapRowColumns = mapRows.map(row => row.trim().split(''))

	// Actualizando posición del jugador
	game.clearRect(0,0, viewportSize, viewportSize)

	// Iteración sobre cada fila y columna
	mapRowColumns.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			// Obtiene el emoji correspondiente para el carácter actual
			const emoji = emojis[column]

			// Calcula las ordenadas de posición del canvas
			const xPosition = elementsSize * (columnIndex + 1.3)
			const yPosition = elementsSize * (rowIndex + 1)

			// Posición inicial del jugador
			if (column == 'O') {
				if (!playerPosition.x && !playerPosition.y) {
					playerPosition.x = xPosition
					playerPosition.y = yPosition
				}
			}

			// Dibuja el emoji en el lienzo en la posición calculada
			game.fillText(emoji, xPosition, yPosition)
		})
	});
	movePlayer()
}

function movePlayer() {
	// Dibujando posición actual
	game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

// Dinamica de movimiento del jugador
window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp)
btnDown.addEventListener('click', moveDown)
btnRight.addEventListener('click', moveRight)
btnLeft.addEventListener('click', moveLeft)

function moveByKeys(event) {
	switch(event.key) {
		case 'ArrowUp':
			moveUp()
			break
		case 'ArrowDown':
			moveDown()
			break
		case 'ArrowRight':
			moveRight()
			break
		case 'ArrowLeft':
			moveLeft()
			break
	}
}

function moveUp() {
	if ((playerPosition.y - elementsSize) < elementsSize) {
		return
	}
	else {
		playerPosition.y -= elementsSize
		startGame()
	}
}
function moveDown() {
	if ((playerPosition.y + elementsSize) > viewportSize) {
		return
	}
	else {
		playerPosition.y += elementsSize
		startGame()
	}
}
function moveRight() {
	if ((playerPosition.x + elementsSize) > elementsSize) {
		return
	}
	else {
		playerPosition.y -= elementsSize
		startGame()
	}
}
function moveLeft() {
	if ((playerPosition.x - elementsSize) < elementsSize) {
		return
	}
	else {
		playerPosition.x -= elementsSize
		startGame()
	}
}