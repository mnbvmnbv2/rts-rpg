var playerPlaceTextEl = document.getElementById('playerPlaceText'); //Placet til venstre tilhørende player
var enemyPlaceTextEl = document.getElementById('enemyPlaceText'); //Place til høyre tilhørende enemy

var textWinEl = document.getElementById('textWin'); //vinduet mellom player og enemy der spillteksten kommer

function globalLevelUp() {
	//levelup func for globalplayer
	if (xp >= maxXp) {
		//hvis man har nådd maxXP
		xp -= maxXp; //setter xp til 0 igjen
		maxXp += 5 + globalLevel; //øker xp til neste lvl
		globalLevel++; //øker lvl
		textWinEl.innerHTML += "You are now level <font color='yellow'>" + globalLevel + '</font><br>';
	}
}
globalFightId = 0; //brukes for å gi hver fighter unik id
class FighterClass {
	//felles class for fiende og player
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
		//dette er felles angrepsfunksjon
		if (target.health > 0 && this.health > 0 && dead != true) {
			//hvis både angriper og target er i live kan funksjonen kjøre
			var that = this; //for indre funksjon i settimeout

			//************DAMAGE*************
			let dmgEffect = '';
			let ifDmgEffective = false;
			let theDmg = Math.floor(Math.random() * (this.dmgMax - (this.dmgMin - 1))) + this.dmgMin; //damage mellom min og max

			//super effective etc
			if (target.type == this.type + 1 || (this.type == 2 && target.type == 0)) {
				theDmg = Math.round(theDmg * 1.4);
				dmgEffect = '140% effective';
				ifDmgEffective = true;
			} else if (target.type == this.type - 1 || (this.type == 0 && target.type == 2)) {
				theDmg = Math.round(theDmg * 0.7);
				dmgEffect = '70% effective';
				ifDmgEffective = true;
			}

			theDmg -= target.defence; //defence/armor
			if (theDmg < 0) {
				//forhindrer negativ skade
				theDmg = 0;
			}

			target.health -= theDmg; //gjør skaden
			textWinEl.innerHTML += this.name + ' attacked ' + target.name + ' for ' + theDmg + ' damage<br>'; //skriver i tekstvindu
			if (ifDmgEffective) {
				textWinEl.innerHTML += 'The attack was ' + dmgEffect + '<br>';
			}
			target.die(that); //sjekker om target dør
			setTimeout(function() {
				that.attack(target);
			}, this.atSpeed); //angriper når timeout er ute
		}
	}
	displayStats() {
		let stats = `
        <font color='gold'>${this.gold}</font>
        <br>${rarityStars(this.rarity)}
        <br>${typeBoxes(this.type)}
        <br>Level: ${this.level}/${this.maxLevel}
        <br>Health: <font color='green'>${this.health}</font>
        <br>AttackPower: ${this.dmgMin}-${this.dmgMax}
        <br>AttackSpeed: ${this.atSpeed}
        <br>Experience: ${this.xp}/${this.maxXp}
        <br>Defence:${this.defence}
        <br>Crit: ${this.critMult}x (chance ${this.critChance}%)`;
		return stats;
	}
}

class EnemyClass extends FighterClass {
	//kun for fiender (egen die func)
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
		//denne er kun for fiender
		if (this.health <= 0) {
			//hvis fienden er død
			fighting = false; //slåss ikke mer
			this.health = 0; //fienden til 0 hp (prevent -hp)
			gold += this.goldDrop * goldDrop * goldMult; //man får gull
			xp += this.xpDrop * xpDrop; //gir global player xp
			killer.xp += this.xpDrop * xpDrop; //man får xp
			killer.health = killer.maxHealth; //morderen får fullt liv (player)
			textWinEl.innerHTML += this.name + ' died<br>'; //skriver text
			textWinEl.innerHTML +=
				"You gained <font color='gold'>" + this.gold * goldDrop * goldMult + '</font> gold<br>'; //text for gull
			textWinEl.innerHTML += "You gained <font color='#820088'>" + this.xp * xpDrop + '</font> xp<br>'; //text for xp

			globalLevelUp(); //levler up global player om man kan
			killer.levelUp(); //levler opp player om man har nok xp
			if (autoFighting === true) {
				//starter neste kamp (når fienden dør)
				setTimeout(newEncounter, 500); //laster inn neste fiende først
				setTimeout(startFight, 1000); //så begynner kamp
			}
		}
	}
}

class PlayerClass extends FighterClass {
	//dette er player class (levelup og egen die func)
	constructor(name, level, maxLevel, maxHealth, dmgMin, dmgMax, atSpeed, rarity, type, defence, critChance) {
		super(name, level, maxLevel, maxHealth, dmgMin, dmgMax, atSpeed, rarity, type, defence, critChance);

		this.fightId = globalFightId;
		globalFightId++;

		this.items = {};
		this.effect = {};

		this.health = this.maxHealth;
		this.critMult = 2;

		this.xp = 0;
		this.maxXp = Math.round(this.maxHealth + this.dmgMax + this.dmgMin + this.level * 5);
		this.gold = Math.round(
			((this.maxHealth + this.dmgMin + this.dmgMin) * (this.rarity + 1) * 3 + this.level * 10) /
				(this.maxXp / 500 + this.atSpeed / 500)
		);
	}
	die() {
		//hvis player dør
		if (this.health <= 0) {
			//når player 0 liv
			this.health = 0; // så det ikke blir negativ hp
			textWinEl.innerHTML += this.name + ' died!'; //skriver at den er død
			dead = true; //player død= sann
			fighting = false; //stopper å sloss
			team.splice(team.indexOf(this), 1); //fjerner denne fra team
		}
	}
	levelUp() {
		//levelup func for player
		if (this.xp >= this.maxXp) {
			//hvis man har nådd maxXP
			if (this.level < this.maxLevel) {
				//så man ikke går over maxlvl
				this.xp -= this.maxXp; // setter ned xpen men man beholder hvis man går over
				this.damageMin = this.damageMin + this.damageMin / this.level;
				this.damageMax = this.damageMax + this.damageMax / this.level;
				this.maxHealth = this.maxHealth + this.maxHealth / this.level;
				this.health = this.maxHealth;
				this.level++;
				this.maxXp = this.maxHealth + this.dmgMax + this.dmgMin + this.level * 5; //xpformel
				this.gold =
					((this.maxHealth + this.dmgMin + this.dmgMin) * (this.rarity + 1) * 3 + this.level * 10) /
					(this.maxXp / 500 + this.atSpeed / 500); //goldformel
				textWinEl.innerHTML += this.name + " is now level <font color='yellow'>" + this.level + '</font><br>';
				if (menu == 'teamMenu') {
					//så stats skal oppdateres hvis man ser på de
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
	//returnerer stjernene til en rarityverdi
	return rarities[rarity];
}

//types
const types = [ '🟦', '🟥', '🟨' ];
function typeBoxes(type) {
	return types[type];
}

//lager global variabel for player og enemy
var player;
var enemy;

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
