//FighterShop ****
let availableFighters = [];

let man = new PlayerClass('<font color="#66FCF1">Man</font>', 1, 3, 5, 1, 2, 2000, 0, 0, 0, 0);
availableFighters.push(man);

function createAvailableFighters() {}

function addFighterShopButtons() {
	for (i in availableFighters) {
		addBtn(
			'Buy ' +
				availableFighters[i].name +
				rarityStars(availableFighters[i].rarity) +
				' ' +
				typeBoxes(availableFighters[i].type), //navnet fightereen + rarity på knappen
			//inni tipsbox
			availableFighters[i].displayStats(), //oversikt over stats
			//funksjonen
			buyFriendlyTemp
		);
	}
}

function chooseFighterShopMenu() {
	//henter knapper for fightermenu
	removeAllButtons(); //fjerner gamle
	addFighterShopButtons(); //henter nye knapper
	menu = 'fighterShopMenu'; //global variabel for hvilken meny man er i
}
const fighterShopMenuEl = document.getElementById('fighterShopMenu');
fighterShopMenuEl.addEventListener('click', chooseFighterShopMenu);

function buyFriendlyTemp(e) {
	//henter ut fighteren fra knappen i shop
	if (e.target.innerHTML.includes('<font')) {
		//hvis man klikker på knappen
		buyFriendly(availableFighters[buttonsz.indexOf(e.target)]); //henter tilhørende fighter
	} else {
		//hvis man klikker på teksten
		buyFriendly(availableFighters[buttonsz.indexOf(e.target.parentNode)]); //henter fighteren til parenten til teksten (knappen)
	}
}

function buyFriendly(fighter) {
	if (gold >= fighter.gold) {
		//sjekker om nok gull
		gold -= fighter.gold; //tar bort gull
		var friendly = fighter; //lager kopi av fighter
		team.push(friendly); //legger den til i laget
	}
}
