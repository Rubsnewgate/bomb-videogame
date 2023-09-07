const canvas = document.querySelector('.game')
const game = canvas.getContext('2d')

let elementsSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize() {
	const viewportSize = Math.min(window.innerWidth * .75, window.innerHeight * .75)

	canvas.width = viewportSize
	canvas.height = viewportSize

	elementsSize = (viewportSize / 10) - 1
	startGame()
}

function startGame() {
	game.font = `${elementsSize}px 'Montserrat'`
	game.textAlign = 'end'

	const map = maps[1]
	const mapRows = map.trim().split('\n')
	const mapColumns = mapRows.map(row => row.trim().split(''))

	for (let row = 1; row <= 10; row++) {
		for (let column = 1; column <= 10; column++) {
			game.fillText(emojis[mapColumns[row - 1] [column - 1]], elementsSize * column, elementsSize * row)
		}
	}
}