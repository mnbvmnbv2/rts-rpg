let enemies = {
	Street : [ { name: '🐀Rat' }, { name: '🐀Huge Rat' } ]
};

function createEncounter() {
	let enemyName = enemies[world][Math.floor(Math.random() * enemies[world].length)].name;

	createEnemy(
		enemyName, //name
		worldDifficulty, //level
		worldDifficulty * 3, //hp
		worldDifficulty, //dmgmin
		worldDifficulty * 2 - 1, //dmgmax
		2500, //atspeed
		0, //rarity
		Math.floor(Math.random() * types.length), //type
		0, //defence
		0, //critchance
		worldDifficulty, //golddrop
		worldDifficulty //xp
	);
} //name,level,hp,dmgmin,dmgmax,atspeed,rarity,type,defence,critChance,golddrop,dropxp
