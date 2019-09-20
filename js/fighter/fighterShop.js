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
        let fighterGold = (Math.floor(Math.random()*14)+7)*fighterLevel;
        let fighterXp = (Math.floor(Math.random()*7)+4)*fighterLevel;
        let fighterAtSpeed = (Math.floor(Math.random()*1000)+1500);
        let fighterRarity = 0;
        if(Math.random() < 0.1){
            fighterRarity = 1;
        }
        if(Math.random() < 0.02){
            fighterRarity = 2;
        }
        let fighterType = Math.floor(Math.random()*3)
        let fighterDefence = [0,0,0];
        let fighterCritChance = 0;
        let fighterCritDmg = 0;
        let fighterItems = [];
        let fighterEffect = [];

        let fighter = new PlayerClass(
            fighterName, //name
            fighterLevel, //lvl
            fighterMaxLevel, //maxlvl
            fighterHP*(fighterRarity+1), //hp
            fighterHP*(fighterRarity+1), //maxhp
            fighterdmgmin*(fighterRarity+1), //dmgmin
            fighterdmgmax*(fighterRarity+1), //dmgmax
            fighterGold*(fighterRarity+1), //gold
            0, //xp
            fighterXp, //xpmax
            fighterAtSpeed-(100*(fighterRarity+1)), //atspeed
            fighterRarity, //rarity
            fighterType, //type
            fighterDefence, //defence
            fighterCritChance, //critChance
            fighterCritDmg, //critdmg
            fighterItems, //items
            fighterEffect, //effects
            "fighter" + globalFightId //id
        )
        availableFighters.push(fighter);
        globalFightId++; 
    }
}
createAvailableFighters();

function addFighterShopButtons(){
    for(i in availableFighters){
        addBtn("Buy " + availableFighters[i].name + rarityStars(availableFighters[i].rarity) +" "+typeBoxes(availableFighters[i].type), //navnet fightereen + rarity på knappen
        //inni tipsbox
        "<font color='gold'>"+availableFighters[i].gold+" gold</font>"+ //Prisen
        "<br>"+availableFighters[i].name+ //navnet
        "<br>"+rarityStars(availableFighters[i].rarity)+ //hvor sjelden utifra stjerner etc
        "<br>Type: "+typeBoxes(availableFighters[i].type)+ //typen
        "<br>Level: "+availableFighters[i].level+"/"+availableFighters[i].maxLevel+ //lvl
        "<br>Health: "+availableFighters[i].health+ //liv
        "<br>AttackPower: "+availableFighters[i].damageMin+"-"+availableFighters[i].damageMax+ //hvor mye skade
        "<br>AttackSpeed: "+availableFighters[i].atSpeed+ //hvor rask
        "<br>Experience: "+availableFighters[i].xp+"/"+availableFighters[i].maxXp+ //hvor mye xp
        "<br>Defence:"+availableFighters[i].defence[0]+ //first defence
        "<br>Crit: "+availableFighters[i].critDmg+" (chance "+availableFighters[i].critChance+")"+ //crit (chance x)
        "<br>Items: "+availableFighters[i].items[0] //first item
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
/*
function buyFriendlyTemp(e){
    if(e.target.innerHTML.includes("<font")){
        buyFriendly(availableFighters[buttonsz.indexOf(e.target)].gold,
            availableFighters[buttonsz.indexOf(e.target)].name,
            availableFighters[buttonsz.indexOf(e.target)].level,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].level,
            availableFighters[buttonsz.indexOf(e.target)].health,
            availableFighters[buttonsz.indexOf(e.target)].damageMin,
            availableFighters[buttonsz.indexOf(e.target)].damageMax,
            availableFighters[buttonsz.indexOf(e.target)].gold,
            availableFighters[buttonsz.indexOf(e.target)].xp,
            availableFighters[buttonsz.indexOf(e.target)].maxXp,
            availableFighters[buttonsz.indexOf(e.target)].atSpeed,
            availableFighters[buttonsz.indexOf(e.target)].rarity,)
    } else{
        this.name = name;
        this.level = level;
        this.maxLevel = maxLevel;
        this.health = health;
        this.maxHealth = maxHealth;
        this.damageMin = damageMin;
        this.damageMax = damageMax;
        this.gold = gold;
        this.xp = xp;
        this.maxXp = maxXp;
        this.atSpeed = atSpeed;
        this.rarity = rarity;
        this.type = type;
        this.defence = defence;
        this.critChance = critChance;
        this.critDmg = critDmg;
        this.items = items;
        this.effect = effect;
        this.fightId = fightId;

        buyFriendly(availableFighters[buttonsz.indexOf(e.target.parentNode)].gold,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].name,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].level,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].health,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].damageMin,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].damageMax,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].gold,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].xp,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].maxXp,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].atSpeed,
            availableFighters[buttonsz.indexOf(e.target.parentNode)].rarity)
    }
}
*/

function buyFriendly(fighter){
    if(gold >= fighter.gold){
        gold -= fighter.gold
        var friendly = fighter;
        globalFightId++;
        team.push(friendly);
    }
}

/*
function buyFriendly(buygold,name,level,hp,dmgmin,dmgmax,goldvalue,xp,maxxp,atspeed,rarity){
    if(gold >= buygold){
        gold -= buygold
        var friendly = new PlayerClass(
            name,
            level,
            hp,
            hp, //maxhp
            dmgmin,
            dmgmax,
            goldvalue, //gold
            xp,
            maxxp,
            atspeed,
            rarity,
            "fighter" + globalFightId
        )
        globalFightId++;
        team.push(friendly);
    }
}
*/