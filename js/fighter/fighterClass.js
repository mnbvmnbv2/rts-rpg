var textWinEl = document.getElementById('textWin'); //Window inbetween with actiontext

//levelup func for globalplayer
function globalLevelUp() {
	if (xp >= maxXp) {
		//If you have reached the target
		xp -= maxXp; //sets down ex for new lvl, but keeps excess xp
		maxXp += 5 + globalLevel; //next lvl is 5 xp more
		globalLevel++; //inc level
		textWinEl.innerHTML += "You are now level <font color='yellow'>" + globalLevel + '</font><br>'; //writes out lvlup in textwin
	}
}

class FighterClass {
	//main class for fighter
	constructor(name, level, maxLevel, maxHealth, dmgMin, dmgMax, atSpeed, rarity, type, defence, critChance) {
		this.name = name;
		this.level = level;
		this.maxLevel = maxLevel;
		this.maxHealth = maxHealth;
		this.dmgMin = dmgMin;
		this.dmgMax = dmgMax;
		this.atSpeed = atSpeed;
		this.rarity = rarity;
		this.type = type;
		this.defence = defence;
		this.critChance = critChance;
	}
	attack(target) {
		//shared attack func for enemy and friendly
		if (target.health > 0 && this.health > 0 && dead != true) {
			//if target and attacker is alive and the dead variable is false, then the func can run
			var that = this; //

			//************DAMAGE*************
			let dmgEffect = ''; //if supereffective etc
			let ifDmgEffective = false; //this determines if a text is written
			let theDmg = Math.floor(Math.random() * (this.dmgMax - (this.dmgMin - 1))) + this.dmgMin; //dmg between min and max

			//super effective etc
			if (target.type == this.type + 1 || (this.type == 2 && target.type == 0)) {
				//if target is +1 type in array then supereff
				theDmg = Math.round(theDmg * 1.4);
				dmgEffect = '140% effective';
				ifDmgEffective = true;
			} else if (target.type == this.type - 1 || (this.type == 0 && target.type == 2)) {
				//if target is 1 previous type in array not eff
				theDmg = Math.round(theDmg * 0.7);
				dmgEffect = '70% effective';
				ifDmgEffective = true;
			}

			theDmg -= target.defence; //defence/armor
			if (theDmg < 0) {
				//stops negative dmg
				theDmg = 0;
			}

			target.health -= theDmg; //deals the dmg
			textWinEl.innerHTML += this.name + ' attacked ' + target.name + ' for ' + theDmg + ' damage<br>'; //writes in textwin
			if (ifDmgEffective) {
				textWinEl.innerHTML += 'The attack was ' + dmgEffect + '<br>'; //writes supereff or not
			}
			target.die(that); //checks if target dies
			setTimeout(function() {
				that.attack(target);
			}, this.atSpeed); //attacks again after cooldown
		}
	}
	displayStats() {
		let stats = `
        <font color='gold'>${this.gold}</font><br>
        ${rarityStars(this.rarity)}<br>
        ${typeBoxes(this.type)}<br>
        Level: ${this.level}/${this.maxLevel}<br>
        Health: <font color='green'>${this.health}</font><br>
        AttackPower: ${this.dmgMin}-${this.dmgMax}<br>
        AttackSpeed: ${this.atSpeed}<br>
        Experience: ${this.xp}/${this.maxXp}<br>
        Defence:${this.defence}<br>
        Crit: ${this.critMult}x (chance ${this.critChance}%)`;
		return stats;
	}
}

class EnemyClass extends FighterClass {
	//enemy subclass (golddrop, xpdrop and die(target))
	constructor(
		name,
		level,
		maxLevel,
		maxHealth,
		dmgMin,
		dmgMax,
		atSpeed,
		rarity,
		type,
		defence,
		critChance,
		goldDrop,
		xpDrop
	) {
		super(name, level, maxLevel, maxHealth, dmgMin, dmgMax, atSpeed, rarity, type, defence, critChance);
		this.goldDrop = goldDrop;
		this.xpDrop = xpDrop;

		this.fightId = globalFightId;
		globalFightId++;

		this.items = {};
		this.effect = {};

		this.health = this.maxHealth;
		this.critMult = 2;
	}
	die(killer) {
		//makes the player and globalplayer get gold and xp
		if (this.health <= 0) {
			//checks if enemy is dead
			fighting = false; //stops fighting
			this.health = 0; //enemy to 0 hp (prevent -hp)
			gold += this.goldDrop * goldDrop * goldMult; //globalplayer recieves gold
			xp += this.xpDrop * xpDrop; //globalplayer recieves xp
			globalLevelUp(); //checks if globalplayer can lvl up

			killer.xp += this.xpDrop * xpDrop; //killer gets xp
			killer.levelUp(); //killer lvls up if enough xp
			killer.health = killer.maxHealth; //killer gets full hp
			textWinEl.innerHTML += this.name + ' died<br>'; //wries that the enemy died
			textWinEl.innerHTML +=
				"You gained <font color='gold'>" + this.goldDrop * goldDrop * goldMult + '</font> gold<br>'; //text for gold
			textWinEl.innerHTML += "You gained <font color='#820088'>" + this.xpDrop * xpDrop + '</font> xp<br>'; //text for xp

			if (autoFighting === true) {
				//fetch next enemy and starts fight if autofihting is on
				setTimeout(newEncounter, 500); //fetch next enemy after delay
				setTimeout(startFight, 1000); //starts fight after more delay
			}
		}
	}
}

class PlayerClass extends FighterClass {
	//friendly fighter class (levelup(), die())
	constructor(name, level, maxLevel, maxHealth, dmgMin, dmgMax, atSpeed, rarity, type, defence, critChance) {
		super(name, level, maxLevel, maxHealth, dmgMin, dmgMax, atSpeed, rarity, type, defence, critChance);

		this.fightId = globalFightId;
		globalFightId++;

		this.items = {};
		this.effect = {};

		this.health = this.maxHealth;
		this.critMult = 2;

		this.xp = 0;
		this.maxXp = Math.round(this.maxHealth + this.dmgMax + this.dmgMin + this.level * 5); //calculates maxxp
		this.gold = Math.round(
			//calculates the gold worth of this fighter
			((this.maxHealth + this.dmgMin + this.dmgMin) * (this.rarity + 1) * 3 + this.level * 10) /
				(this.maxXp / 500 + this.atSpeed / 500)
		);
	}
	die() {
		//if fighter dies
		if (this.health <= 0) {
			//when <0 hp
			this.health = 0; // prevents -hp
			textWinEl.innerHTML += this.name + ' died!'; //writes that fighter died
			dead = true; //player dead
			fighting = false; //stops fighting
			team.splice(team.indexOf(this), 1); //removes this fighter from team
		}
	}
	levelUp() {
		//levelup func for player
		if (this.xp >= this.maxXp) {
			//if target xp reached
			if (this.level < this.maxLevel) {
				//prevents overlvling
				this.xp -= this.maxXp; // keeps excess xp
				this.damageMin = this.damageMin + this.damageMin / this.level;
				this.damageMax = this.damageMax + this.damageMax / this.level;
				this.maxHealth = this.maxHealth + this.maxHealth / this.level;
				this.health = this.maxHealth;
				this.level++;
				this.maxXp = this.maxHealth + this.dmgMax + this.dmgMin + this.level * 5; //xpformula
				this.gold =
					((this.maxHealth + this.dmgMin + this.dmgMin) * (this.rarity + 1) * 3 + this.level * 10) /
					(this.maxXp / 500 + this.atSpeed / 500); //goldformula
				textWinEl.innerHTML += this.name + " is now level <font color='yellow'>" + this.level + '</font><br>';
				if (menu == 'teamMenu') {
					//updates stats if you are in teammenu
					chooseTeamMenu();
				}
			}
		}
	}
}

//rarities
const rarities = [
	'',
	"<font color='white'>✩</font>",
	"<font color='white'>✩✩</font>",
	"<font color='white'>✩✩✩</font>"
];
function rarityStars(rarity) {
	//returns raritysymbol
	return rarities[rarity];
}

//types
const types = [ '🟦', '🟥', '🟨' ];
function typeBoxes(type) {
	return types[type];
}

createEncounter();
function newEncounter() {
	if (enemy.health <= 0 && player.health > 0) {
		player.health = player.maxHealth;
		createEncounter();
	}
}
function createEnemy(name, level, hp, dmgmin, dmgmax, atspeed, rarity, type, defence, critChance, golddrop, xpdrop) {
	enemy = new EnemyClass(
		"<font color='red'>" + name + '</font>', //name
		level, //level
		level, //maxlvl
		hp, //maxhp
		dmgmin, //dmgmin
		dmgmax, //dmgmax
		atspeed, //atSpeed
		rarity, //rarity
		type, //type
		defence, //defence
		critChance, //critChance
		golddrop, //hvor mye gold man får
		xpdrop //hvor mye xp man får
	);
	encounterNumber++; //øker antall folk man har møtt med 1
	textWinEl.innerHTML = 'You met ' + enemy.name + '<br>';
}

function startFight() {
	if (fighting === false) {
		if (player.health > 0 && enemy.health > 0) {
			fighting = true;
			if (player.atSpeed <= enemy.atSpeed) {
				player.attack(enemy);
				enemy.attack(player);
			} else {
				enemy.attack(player);
				player.attack(enemy);
			}
		}
	}
}
