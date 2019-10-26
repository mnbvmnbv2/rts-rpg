const topLeftTextEl = document.getElementById('topLeftText');
const xpBarEl = document.getElementById('xpBar');
const xpBarTextEl = document.getElementById('xpBarText');
const globalXpBarEl = document.getElementById('globalXpBar');
const globalXpBarTextEl = document.getElementById('globalXpBarText');
const stats1leftEl = document.getElementById('stats1left');
const stats1rightEl = document.getElementById('stats1right');
const stats2leftEl = document.getElementById('stats2left');
const stats2rightEl = document.getElementById('stats2right');

// clock
let min = 0; //global for klokkefunk
let sec = 0; //global for klokkefunk

statsUpdate();
function statsUpdate() {
	//i fanen til venstre stats
	if (dead == true) {
		playerPlaceTextEl.innerHTML = 'Empty';
	} else {
		playerPlaceTextEl.innerHTML = //i playerboxen
			"<font color='#FFFFFF'>" +
			player.name +
			rarityStars(player.rarity) + //navn og rarity
			'<br>Type: ' +
			typeBoxes(player.type) + //type
			'<br>Level: ' +
			player.level + //level
			"<br>Health: <font color='green'>" +
			player.health +
			"</font>/<font color='green'>" +
			player.maxHealth +
			'</font>'; //health av maxHealth

		stats2leftEl.innerHTML = //venstre (text delen)
			"<font color='white'>Damage: </font>" + //dmg
			"<br><font color='white'>Speed: </font>" + //atspeed
			"<br><font color='white'>Type: </font>" + //typen
			"<br><font color='white'>Level: </font>" + //lvl
			"<br><font color='white'>Experience: </font>" + //hvor mye xp
			"<br><font color='white'>Defence: </font>" + //first defence
			"<br><font color='white'>Crit: </font>" + //crit (chance x)
			"<br><font color='white'>Items: </font>"; //first item;;

		stats2rightEl.innerHTML = //samme som over men talldelen
			"<font color='red'>" +
			player.dmgMin +
			'-' +
			player.dmgMax +
			' </font>' + //dmg
			'<br><font>' +
			player.atSpeed +
			' </font>' + //atspeed
			'<br><font>' +
			typeBoxes(player.type) +
			' </font>' + //typen
			'<br><font>' +
			player.level +
			'/' +
			player.maxLevel +
			' </font>' + //lvl
			'<br><font>' +
			player.xp +
			'/' +
			player.maxXp +
			' </font>' + //hvor mye xp
			'<br><font>' +
			player.defence +
			' </font>' + //first defence
			'<br><font>' +
			player.critMult +
			'x (chance ' +
			player.critChance +
			'%)' +
			' </font>'; //crit (chance x)

		//xp og hpbar
		topLeftTextEl.innerHTML = player.health + '/' + player.maxHealth; //healthbar
		document.getElementById('topLeftBar').style.width = player.health / player.maxHealth * 596 + 'px'; //bredden på healthbar
		xpBarTextEl.innerHTML = player.xp + '/' + player.maxXp; //xpbar text
		document.getElementById('xpBar').style.width = player.xp / player.maxXp * 1900 + 'px'; //xpbar bredde
	}

	globalXpBarTextEl.innerHTML = xp + '/' + maxXp; //globalxpbar text
	document.getElementById('globalXpBar').style.width = xp / maxXp * 1900 + 'px'; //globalxpbar bredde

	stats1leftEl.innerHTML = //global player stats helt til venstre (text delen)
		"<font color='white'>Level:</font> " + //globallevel
		"<br><font color='white'>Gold:</font> " + //gold
		"<br><font color='white'>Encounter: " + //hvor mange møtt
		'<br>Time: </font>'; //tid

	if (sec === 0) {
		//gjør tiden rød når det blir nytt min
		stats1rightEl.innerHTML =
			"<font color='#2adb59'>" +
			globalLevel +
			'</font> ' +
			"<br><font color='gold'>" +
			gold +
			'</font> ' +
			'<br>' +
			encounterNumber +
			' ' +
			"<br><font color='red'>" +
			min +
			':' +
			sec +
			'</font></font>&nbsp'; //gjør tiden rød når det blir nytt min
	} else {
		stats1rightEl.innerHTML = //samme som over men talldelen
			"<font color='#2adb59'>" +
			globalLevel +
			'</font> ' + //globallvl
			"<br><font color='gold'>" +
			gold +
			'</font> ' + //gold + mellomrom
			'<br>' +
			encounterNumber +
			' ' + //skriver ut antall man har møtt
			'<br>' +
			min +
			':' +
			sec +
			'</font>&nbsp'; //tiden i min:sek
	}
	requestAnimationFrame(statsUpdate); //kjører/oppdaterer hver frame
}

var stats3leftEl = document.getElementById('stats3left'); //enemy stats
var stats3rightEl = document.getElementById('stats3right');
var topRightTextEl = document.getElementById('topRightText'); //enemy health
enemyStatsUpdate();
function enemyStatsUpdate() {
	//helt høyre stats
	if (dead === false) {
		enemyPlaceTextEl.innerHTML = //enemy boxen
			"<font color='#FFFFFF'>" +
			enemy.name + //navnet
			'<br>Type: ' +
			typeBoxes(enemy.type) + //type
			'<br>Level: ' +
			enemy.level + //lvl
			"<br>Health: <font color='green'>" +
			enemy.health +
			"</font>/<font color='green'>" +
			enemy.maxHealth +
			'</font>';

		stats3leftEl.innerHTML = // venstre (textdelen)
			"<br><font color='#F6F4D2'>Gold: </font>" + //golddrop
			"<br><font color='white'>Experience: </font>" + //xpdrop
			"<br><font color='white'>Damage: </font>" + //dmg
			"<br><font color='white'>Speed: </font>" + //atspeed
			"<br><font color='white'>Type: </font>" + //typen
			"<br><font color='white'>Level: </font>" + //lvl
			"<br><font color='white'>Defence: </font>" + //first defence
			"<br><font color='white'>Crit: </font>"; //crit (chance x);

		stats3rightEl.innerHTML = // høyre (talldelen)
			"<br><font color='gold'><b>" +
			enemy.goldDrop +
			' </b></font>' + //golddrop
			"<br><font color='#820088'><b>" +
			enemy.xpDrop +
			' </b></font>' + //xpdrop
			"<br><font color='red'>" +
			enemy.dmgMin +
			'-' +
			enemy.dmgMax +
			' </font>' + //dmg
			'<br><font>' +
			enemy.atSpeed +
			' </font>' + //atspeed
			'<br><font>' +
			typeBoxes(enemy.type) +
			' </font>' + //typen
			'<br><font>' +
			enemy.level +
			'/' +
			enemy.maxLevel +
			' </font>' + //lvl
			'<br><font>' +
			enemy.defence +
			' </font>' + //first defence
			'<br><font>' +
			enemy.critMult +
			'x (chance ' +
			enemy.critChance +
			'%)' +
			' </font>'; //crit (chance x)

		topRightTextEl.innerHTML = enemy.health + '/' + enemy.maxHealth;
		document.getElementById('topRightBar').style.width = enemy.health / enemy.maxHealth * 596 + 'px';
	} else {
		//enemyStatsEl.innerHTML = "</font><br><font color='white'>You died";
	}
	requestAnimationFrame(enemyStatsUpdate);
}

timeIncrement();
function timeIncrement() {
	//for å ha en timer func
	sec++; //øker sekunder
	if (sec === 60) {
		//øker minutter
		sec = 0; //setter sekundene til 0 igjen for hvert minutt
		min++; //øker minutt med 1
		createAvailableFighters(); //oppdaterer shoppen hvert min
		if (menu == 'fighterShopMenu') {
			chooseFighterShopMenu();
		}
	}
	setTimeout(timeIncrement, 1000); //kjører funksjonen hvert sekund
}
