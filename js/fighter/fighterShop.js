//FighterShop ****
let availableFighters = [];
function createAvailableFighters(){
    availableFighters = [];
    let fighterNames = [
        "<font color='#66FCF1'>Man</font>",
        "<font color='#66FCF1'>Dog</font>",
        "<font color='#66FCF1'>Chicken</font>",
        "<font color='#66FCF1'>Goblin</font>",
        "<font color='#66FCF1'>Dwarf</font>",
        "<font color='#66FCF1'>Slave</font>",
        "<font color='#66FCF1'>Retard</font>"
    ];
     
    let availableFightersNumber = Math.floor(Math.random()*5)+1;

    for(var i = 0; i < availableFightersNumber;i++){

        let fighterName = fighterNames[Math.floor(Math.random()*fighterNames.length)];
        let fighterLevel = Math.floor(Math.random()*globalLevel)+1;
        let fighterMaxLevel = Math.floor(Math.random()*20+1)+fighterLevel;
        let fighterHP = (Math.floor(Math.random()*5)+4)*fighterLevel;
        let fighterdmgmin = (Math.floor(Math.random()*2)+1)*fighterLevel;
        let fighterdmgmax = (fighterdmgmin + Math.floor(Math.random()*2)*fighterLevel);
        let fighterAtSpeed = (Math.floor(Math.random()*1000)+1500);
        let fighterRarity = 0;
        if(Math.random() < 0.1){
            fighterRarity = 1;
        }
        if(Math.random() < 0.02){
            fighterRarity = 2;
        }
        let fighterType = Math.floor(Math.random()*types.length)
        let fighterDefence = 0;
        let fighterCritChance = 0;

        let fighter = new PlayerClass(
            fighterName, //name
            fighterLevel, //lvl
            fighterMaxLevel, //maxlvl
            fighterHP*(fighterRarity+1), //maxhp
            fighterdmgmin*(fighterRarity+1), //dmgmin
            fighterdmgmax*(fighterRarity+1), //dmgmax
            fighterAtSpeed-(100*(fighterRarity+1)), //atspeed
            fighterRarity, //rarity
            fighterType, //type
            fighterDefence, //defence
            fighterCritChance, //critChance
        )
        availableFighters.push(fighter);
    }
}
createAvailableFighters();

function addFighterShopButtons(){
    for(i in availableFighters){
        addBtn("Buy " + availableFighters[i].name + rarityStars(availableFighters[i].rarity) +" "+typeBoxes(availableFighters[i].type), //navnet fightereen + rarity på knappen
        //inni tipsbox
        availableFighters[i].displayStats() //oversikt over stats
        ,
        //funksjonen
        buyFriendlyTemp
        )
    }
}

function chooseFighterShopMenu(){ //henter knapper for fightermenu
    removeAllButtons(); //fjerner gamle
    addFighterShopButtons(); //henter nye knapper
    menu = "fighterShopMenu"; //global variabel for hvilken meny man er i
}
const fighterShopMenuEl = document.getElementById("fighterShopMenu")
fighterShopMenuEl.addEventListener("click", chooseFighterShopMenu);

function buyFriendlyTemp(e){ //henter ut fighteren fra knappen i shop
    if(e.target.innerHTML.includes("<font")){ //hvis man klikker på knappen
        buyFriendly(availableFighters[buttonsz.indexOf(e.target)]) //henter tilhørende fighter
    } else{ //hvis man klikker på teksten
        buyFriendly(availableFighters[buttonsz.indexOf(e.target.parentNode)]) //henter fighteren til parenten til teksten (knappen)
    }
}

function buyFriendly(fighter){
    if(gold >= fighter.gold){ //sjekker om nok gull
        gold -= fighter.gold //tar bort gull
        var friendly = fighter; //lager kopi av fighter
        team.push(friendly); //legger den til i laget
    }
}