//stats
let menu = 'fightMenu'; //hvilken meny man er i

let dead = true; //hvis player er død
let fighting = false; //hvis man er i kamp
let autoFighting = false; //hvis autonestekamp og autostartkamp er påslått (til if statement i startkamp og nestekamp)

let globalFightId = 0;

//LOCALSTORAGE
//beholder verdier når man lukker gamet
let encounterNumber = localStorage.getItem('encounterNumber'); //henter gammel localstorage //null om den ikke finnes
checkLocalStorage(encounterNumber, 0);

let globalLevel = 1;
let xp = 3;
let maxXp = 5;
let gold = 100;
let world = 'Street';
let worldDifficulty = 1;

let player;
let enemy;
/*
let globalLevel = Number(localStorage.getItem("globalLevel")) //henter gammel localstorage //null om den ikke finnes
checkLocalStorage(globalLevel,1)

let xp = Number(localStorage.getItem("xp")) //henter gammel localstorage //null om den ikke finnes
checkLocalStorage(xp,0);

let maxXp = Number(localStorage.getItem("maxXp")) //henter gammel localstorage //null om den ikke finnes
checkLocalStorage(maxXp,5);
*/

function checkLocalStorage(variable, startNum) {
	//henter gammel localstorage //null om den ikke finnes
	if (variable == null) {
		variable = startNum;
	}
}

window.addEventListener('unload', function() {
	localStorage.setItem('encounterNumber', encounterNumber);
	localStorage.setItem('globalLevel', globalLevel);
	localStorage.setItem('xp', xp);
	localStorage.setItem('maxXp', maxXp);
});

// mults
let goldDrop = 1;
let goldMult = 1;
let xpDrop = 1;
//

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
