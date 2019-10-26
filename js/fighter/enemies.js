// enemies "tree", {world : [enemies]}
let enemies = {
	Street : [ { name: '🐀Rat' }, { name: '🐀Huge Rat' } ]
};

function createEncounter() {
	//name
	let enemyName = enemies[world][Math.floor(Math.random() * enemies[world].length)].name;

	//function for creating enemy
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
		worldDifficulty //xpdrop
	);
}
