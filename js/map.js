// objeto que asigna caracteres a emojis
const emojis = {
	'-': ' ',
	'I': '🏁',
	'X': '💣',
	'O': '🌀',
	'PLAYER': '👾',
	'BOMB_COLLISION': '💥',
	'HEART': '🧡',
}

// definición de mapas del juego
const maps = []

maps.push(`
  	IXXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	OXXXXXXXXX
`)
maps.push(`
  	O--XXXXXXX
  	X--XXXXXXX
  	XX----XXXX
  	X--XX-XXXX
  	X-XXX--XXX
  	X-XXXX-XXX
  	XX--XX--XX
  	XX--XXX-XX
  	XXXX---IXX
  	XXXXXXXXXX
`)
maps.push(`
  	I-----XXXX
  	XXXXX-XXXX
  	XX----XXXX
  	XX-XXXXXXX
  	XX-----XXX
  	XXXXXX-XXX
  	XX-----XXX
  	XX-XXXXXXX
  	XX-----OXX
  	XXXXXXXXXX
`)
maps.push(`
  	OXXXXXXXXX
  	------XXXX
  	--XXX--XXX
  	-XXXXX--XX
  	-------XXX
  	XXXXX--XXX
  	XXXXX-XXXX
  	XX----XXXX
  	---XXXXXXX
  	IXXXXXXXXX
`)
maps.push(`
  	XXXXIXXXXX
  	XXX--XXXXX
  	XXX---XXXX
  	XXX--XXXXX
  	-XX----XXX
  	-XXXX--XXX
  	------XXXX
  	XXX-XXXXXX
  	-----XXXXX
  	OXXXXXXXXX
`)
maps.push(`
  	XXXXOXXXXX
  	XXX----XXX
  	------XXXX
  	-XXX--XXXX
  	-X----XXXX
  	-XXXX--XXX
  	----XX--XX
  	XXX--XX-XX
  	XXXX--IXXX
  	XXXXXXXXXX
`)
