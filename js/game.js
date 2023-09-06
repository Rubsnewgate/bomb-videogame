const canvas = document.querySelector('.game')
const game = canvas.getContext('2d')
let elementsSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize() {
	const viewportSize = Math.min(window.innerWidth * .75, window.innerHeight * .75)
	elementsSize = (viewportSize / 10) - 1

	canvas.width = viewportSize
	canvas.height = viewportSize
	startGame()
}

function startGame() {
	game.font = elementsSize + 'px Verdana'

	for (let i = 0; i < 10; i++) {
		for (let z = 1; z < 11; z++) {
			game.fillText(emojis['X'], elementsSize * i, elementsSize * z)
		}
	}
}