var playerPlaceTextEl = document.getElementById("playerPlaceText"); //Placet til venstre tilhørende player
var enemyPlaceTextEl = document.getElementById("enemyPlaceText"); //Place til høyre tilhørende enemy

var textWinEl = document.getElementById("textWin") //vinduet mellom player og enemy der spillteksten kommer

function globalLevelUp(){ //levelup func for globalplayer
    if(xp >= maxXp){ //hvis man har nådd maxXP
        xp -= maxXp; //setter xp til 0 igjen
        maxXp += (5+globalLevel); //øker xp til neste lvl
        globalLevel++; //øker lvl
        textWinEl.innerHTML += "You are now level <font color='yellow'>" + globalLevel + "</font><br>";
    }
}

class FighterClass { //felles class for fiende og player 
    constructor(name, level, maxLevel, health, maxHealth, damageMin, damageMax, gold,
         xp, maxXp, atSpeed, rarity, type, defence, critChance, critDmg, items, effect, fightId) {
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
}
    attack(target){ //dette er felles angrepsfunksjon
        if(target.health > 0 && this.health > 0 && dead != true){ //hvis både angriper og target er i live kan funksjonen kjøre
            var that = this; //for indre funksjon i settimeout

            //************DAMAGE*************
            let dmgEffect = "";
            let ifDmgEffect = false;
            let theDmg = (Math.floor(Math.random()*(this.damageMax-(this.damageMin-1)))+this.damageMin); //damage mellom min og max

            //super effective etc
            if(target.type == (this.type+1)){ 
                theDmg=Math.round(theDmg*1.4);
                dmgEffect = "140% effective";
                ifDmgEffect = true;
            } else if((this.type == 2) && (target.type == 0)){
                theDmg=Math.round(theDmg*1.4);
                dmgEffect = "140% effective";
                ifDmgEffect = true;
            } else if(target.type == (this.type-1)){
                theDmg=Math.round(theDmg*0.6);
                dmgEffect = "70% effective";
                ifDmgEffect = true;
            } else if((this.type == 0) && (target.type == 2)){
                theDmg=Math.round(theDmg*0.6);
                dmgEffect = "70% effective";
                ifDmgEffect = true;
            }

            theDmg -= target.defence[0]; //defence/armor
            if(theDmg < 0){ //forhindrer negativ skade
                theDmg = 0;
            }

            target.health -= theDmg; //gjør skaden
            textWinEl.innerHTML += this.name + " attacked " + target.name + " for " + theDmg + " damage<br>"; //skriver i tekstvindu
            if(ifDmgEffect){
                textWinEl.innerHTML += "The attack was " + dmgEffect + "<br>";
            }
            target.die(that); //sjekker om target dør
            setTimeout(function(){ that.attack(target);}, this.atSpeed ); //angriper når timeout er ute
        }
    }
}

class EnemyClass extends FighterClass{ //kun for fiender (egen die func)
    constructor(name,level,maxLevel,health,maxHealth,damageMin,damageMax,gold,xp,maxXp,atSpeed,rarity,type,defence,critChance,critDmg,items,effect,fightId) {
        // Chain constructor with super
        super(name,level,maxLevel,health,maxHealth,damageMin,damageMax,gold,xp,maxXp,atSpeed,rarity,type,defence,critChance,critDmg,items,effect,fightId);
    }
    die(killer){ //denne er kun for fiender
        if(this.health <= 0){ //hvis fienden er død
            fighting = false; //slåss ikke mer
            this.health = 0; //fienden til 0 hp (prevent -hp)
            gold += (this.gold * goldDrop * goldMult); //man får gull
            xp += (this.xp * xpDrop); //gir global player xp
            killer.xp += (this.xp * xpDrop); //man får xp
            killer.health = killer.maxHealth; //morderen får fullt liv (player)
            textWinEl.innerHTML += this.name + " died<br>"; //skriver text
            textWinEl.innerHTML += "You gained <font color='gold'>" + (this.gold * goldDrop * goldMult) + "</font> gold<br>"; //text for gull
            textWinEl.innerHTML += "You gained <font color='#820088'>" + (this.xp * xpDrop) + "</font> xp<br>"; //text for xp
    
            globalLevelUp(); //levler up global player om man kan
            killer.levelUp(); //levler opp player om man har nok xp
            if(autoFighting === true){ //starter neste kamp (når fienden dør)
                setTimeout(newEncounter,500) //laster inn neste fiende først
                setTimeout(startFight,1000) //så begynner kamp
            }
        }
    }
}

class PlayerClass extends FighterClass{ //dette er player class (levelup og egen die func)
    constructor(name,level,maxLevel,health,maxHealth,damageMin,damageMax,gold,xp,maxXp,atSpeed,rarity,type,defence,critChance,critDmg,items,effect,fightId) {
        // Chain constructor with super
        super(name,level,maxLevel,health,maxHealth,damageMin,damageMax,gold,xp,maxXp,atSpeed,rarity,type,defence,critChance,critDmg,items,effect,fightId);
    }
    die(){ //hvis player dør
        if(this.health <= 0){ //når player 0 liv
            this.health = 0;
            textWinEl.innerHTML += this.name + " died!";
            dead = true; //player død= sann
            fighting = false; //stopper å sloss
            team.splice(team.indexOf(this),1); //fjerner denne fra team
        }
    }
    levelUp(){ //levelup func for player
        if(this.xp >= this.maxXp){ //hvis man har nådd maxXP
            this.xp -= this.maxXp;
            this.maxXp = this.maxXp+(this.maxXp/this.level);
            this.damageMin = this.damageMin+(this.damageMin/this.level);
            this.damageMax = this.damageMax+(this.damageMax/this.level);
            this.maxHealth = this.maxHealth+(this.maxHealth/this.level);
            this.health = this.maxHealth;
            this.level++;
            textWinEl.innerHTML += this.name + " is now level <font color='yellow'>" + this.level + "</font><br>";
            if(menu == "teamMenu"){
                chooseTeamMenu();
            }
        }
    }
}

function rarityStars(rarity){ //returnerer stjernene til en rarityverdi
    var rarityStars;
    if(rarity == 0){
        rarityStars = "";
    } else if(rarity == 1){
        rarityStars = "<font color='white'>✩</font>";
    } else if(rarity == 2){
        rarityStars = "<font color='white'>✩✩</font>";
    }
    return rarityStars;
}

function typeBoxes(type){
    var typeBox;
    if(type == 0){
        typeBox = "🟦";
    } else if(type == 1){
        typeBox = "🟥";
    } else if(type == 2){
        typeBox = "🟨";
    }
    return typeBox;
}

var player; //lager global variabel for player og enemy
var enemy;

function newEncounter(){
    if(enemy.health <= 0 && player.health > 0){
        player.health = player.maxHealth;
        createEncounter()
    }
}
createEncounter();
function createEnemy(name,level,hp,dmgmin,dmgmax,golddrop,xp,atspeed,rarity,type,defence,critChance,critDmg,effect){
    enemy = new EnemyClass(
        "<font color='red'>" + name + "</font>", //name
        level, //level
        level, //maxlvl
        hp, //hp
        hp, //maxhp
        dmgmin, //dmgmin
        dmgmax, //dmgmax
        golddrop, //gold
        xp, //xp
        xp, //maxxp
        atspeed, //atSpeed
        rarity, //rarity
        type, //type
        defence, //defence
        critChance, //critChance
        critDmg, //critDmg
        [], //items
        effect, //effect
        "fighter" + globalFightId
    )
    globalFightId++;

    encounterNumber++; //øker antall folk man har møtt med 1
    localStorage.setItem("encounterNumber",encounterNumber) //lagrer det i localStorage
    textWinEl.innerHTML = "You met " + enemy.name + "<br>";
}

function startFight(){
    if(fighting === false){
        if(player.health > 0 && enemy.health > 0){
            fighting = true;
            if(player.atSpeed <= enemy.atSpeed){
                player.attack(enemy);
                enemy.attack(player);
            } else {
                enemy.attack(player);
                player.attack(enemy);
            }
        }
    }
}