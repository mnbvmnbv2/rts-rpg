//FighterShop ****

let availableFighters = [];
function createAvailableFighters(){
    availableFighters = [];
    let fighterNames = [
        "<font color='#66FCF1'>Man</font>",
        "<font color='#66FCF1'>Dog</font>",
        "<font color='#66FCF1'>Chicken</font>",
        "<font color='#66FCF1'>Goblin</font>",
        "<font color='#66FCF1'>Dwarf</font>"
    ];
     
    let availableFightersNumber = Math.floor(Math.random()*5)+1;

    for(var i = 0; i < availableFightersNumber;i++){
        let fighterName = fighterNames[Math.floor(Math.random()*fighterNames.length)];

        let fighter = new FighterClass(
            fighterName, //name
            1, //lvl
            5, //hp
            5, //maxhp
            1, //dmgmin
            2, //dmgmax
            10, //gold
            0, //xp
            5, //xpmax
            2000, //atspeed
            1, //rarity
            "fighter" + globalFightId //id
        )
        availableFighters.push(fighter);
        globalFightId++; 
    }
}
createAvailableFighters();


function addFighterShopButtons(){
    for(i in availableFighters){
        addBtn("Buy " + availableFighters[i].name + rarityStars(availableFighters[i].rarity), //navnet fightereen + rarity på knappen
        //inni tipsbox
        "<font color='gold'>"+availableFighters[i].gold+" gold</font>"+ //Prisen
        "<br>"+availableFighters[i].name+ //navnet
        "<br>"+rarityStars(availableFighters[i].rarity)+ //hvor sjelden utifra stjerner etc
        "<br>Level: "+availableFighters[i].level+ //lvl
        "<br>Health: "+availableFighters[i].health+ //liv
        "<br>AttackPower: "+availableFighters[i].damageMin+"-"+availableFighters[i].damageMax+ //hvor mye skade
        "<br>AttackSpeed: "+availableFighters[i].atSpeed+
        "<br>Experience: "+availableFighters[i].xp+"/"+availableFighters[i].maxXp, //hvor rask
        //funksjonen
        buyFriendlyTemp
        )
    }
}
function chooseFighterShopMenu(){
    removeAllButtons();
    addFighterShopButtons();
    teamMenu = false;
}
const fighterShopMenuEl = document.getElementById("fighterShopMenu")
fighterShopMenuEl.addEventListener("click", chooseFighterShopMenu);

function buyFriendlyTemp(e){
    if(e.target.innerHTML.includes("<font")){
        buyFriendly(availableFighters[buttonsz.indexOf(e.target)].gold,
            availableFighters[buttonsz.indexOf(e.target)].name,
            availableFighters[buttonsz.indexOf(e.target)].level,
            availableFighters[buttonsz.indexOf(e.target)].health,
            availableFighters[buttonsz.indexOf(e.target)].damageMin,
            availableFighters[buttonsz.indexOf(e.target)].damageMax,
            availableFighters[buttonsz.indexOf(e.target)].gold,
            availableFighters[buttonsz.indexOf(e.target)].xp,
            availableFighters[buttonsz.indexOf(e.target)].maxXp,
            availableFighters[buttonsz.indexOf(e.target)].atSpeed,
            availableFighters[buttonsz.indexOf(e.target)].rarity)
    } else{
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