//FighterShop ****

let availableFighters = [];
function createAvailableFighters(){


    let fighter = new FighterClass(
        "<font color='#66FCF1'>Man</font>", //name
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
        buyFriendly(availableFighters[i].gold,
            availableFighters[i].name,
            availableFighters[i].level,
            availableFighters[i].health,
            availableFighters[i].damageMin,
            availableFighters[i].damageMax,
            availableFighters[i].gold,
            availableFighters[i].xp,
            availableFighters[i].maxXp,
            availableFighters[i].atSpeed,
            availableFighters[i].rarity)
        )
    }
}
function chooseFighterShopMenu(){
    removeAllButtons();
    addFighterShopButtons();
}
const fighterShopMenuEl = document.getElementById("fighterShopMenu")
fighterShopMenuEl.addEventListener("click", chooseFighterShopMenu);
