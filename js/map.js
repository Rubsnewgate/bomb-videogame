/*
	object that assigns characters to emojis
	-: safe path
	F: finish line
	X: unsafe path
	S: starting point
	player: player position
	bombCollision: indicates player collision with bombs
	heart: player lives
*/

const emojis = {
	'-': ' ',
	'F': '🏁',
	'X': '💣',
	'S': '🌀',
	'player': '👾',
	'bombCollision': '💥',
	'heart': '🧡',
}

// game maps
const maps = []

maps.push(`
  	FXXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	-XXXXXXXXX
  	SXXXXXXXXX
`)
maps.push(`
  	S--XXXXXXX
  	X--XXXXXXX
  	XX----XXXX
  	X--XX-XXXX
  	X-XXX--XXX
  	X-XXXX-XXX
  	XX--XX--XX
  	XX--XXX-XX
  	XXXX---FXX
  	XXXXXXXXXX
`)
maps.push(`
  	F-----XXXX
  	XXXXX-XXXX
  	XX----XXXX
  	XX-XXXXXXX
  	XX-----XXX
  	XXXXXX-XXX
  	XX-----XXX
  	XX-XXXXXXX
  	XX-----SXX
  	XXXXXXXXXX
`)
maps.push(`
  	SXXXXXXXXX
  	------XXXX
  	--XXX--XXX
  	-XXXXX--XX
  	-------XXX
  	XXXXX--XXX
  	XXXXX-XXXX
  	XX----XXXX
  	---XXXXXXX
  	FXXXXXXXXX
`)
maps.push(`
  	XXXXFXXXXX
  	XXX--XXXXX
  	XXX---XXXX
  	XXX--XXXXX
  	-XX----XXX
  	-XXXX--XXX
  	------XXXX
  	XXX-XXXXXX
  	-----XXXXX
  	SXXXXXXXXX
`)
maps.push(`
  	XXXXSXXXXX
  	XXX----XXX
  	------XXXX
  	-XXX--XXXX
  	-X----XXXX
  	-XXXX--XXX
  	----XX--XX
  	XXX--XX-XX
  	XXXX--FXXX
  	XXXXXXXXXX
`)
