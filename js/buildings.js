class BuildingClass {
	constructor(name, level, health, maxHealth, damageMin, damageMax, gold, xp, maxXp, atSpeed, rarity, fightId) {
		this.name = name;
		this.level = level;
		this.health = health;
		this.maxHealth = maxHealth;
		this.damageMin = damageMin;
		this.damageMax = damageMax;
		this.gold = gold;
		this.xp = xp;
		this.maxXp = maxXp;
		this.atSpeed = atSpeed;
		this.rarity = rarity;
		this.fightId = fightId;
	}
}
var buildings = [];

//building*****
function addBuildingButtons() {
	addBtn('House', 'Bigger teamsize', startFight); //lager start kamp knappen
	addBtn('Barracks', 'Stronger fighters', newEncounter); //lager neste kamp knappen
	addBtn('Mine', 'More g/s', autoFight); //lager autofight knappen
	//addBtn("Mine")
	for (i in buildings) {
		//for i in buildings
		addBtn(
			'Choose ' + buildings[i].name + rarityStars(buildings[i].rarity),
			//textBox
			"<font color='gold'>" +
			buildings[i].gold +
			' gold</font>' + //Prisen
			"<br><font color='#66FCF1'>" +
			buildings[i].name +
			'</font>' + //navnet
			'<br>' +
			rarityStars(buildings[i].rarity) + //hvor sjelden utifra stjerner etc
			'<br>Level: ' +
			buildings[i].level + //lvl
			'<br>Health: ' +
			buildings[i].health + //liv
			'<br>AttackPower: ' +
			buildings[i].damageMin +
			'-' +
			buildings[i].damageMax + //hvor mye skade
				'<br>AttackSpeed: ' +
				buildings[i].atSpeed +
				'<br>Experience: ' +
				buildings[i].xp +
				'/' +
				buildings[i].maxXp, //hvor rask
			//funksjonen som velger denne fighteren
			upgradeBuilding
		);
	}
}
function chooseBuildingMenu() {
	removeAllButtons();
	addBuildingButtons();
	menu = 'buildingMenu';
}
const buildingMenuEl = document.getElementById('buildingMenu');
buildingMenuEl.addEventListener('click', chooseBuildingMenu);

function upgradeBuilding(e) {
	if (e.target.innerHTML.includes('<font')) {
		player = team[buttonsz.indexOf(e.target)];
		dead = false;
	} else {
		player = team[buttonsz.indexOf(e.target.parentNode)];
		dead = false;
	}
}
