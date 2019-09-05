var playerPlaceTextEl = document.getElementById("playerPlaceText"); //Placet til venstre tilhørende player
var enemyPlaceTextEl = document.getElementById("enemyPlaceText"); //Place til høyre tilhørende enemy

var textWinEl = document.getElementById("textWin") //vinduet mellom player og enemy der spillteksten kommer

// stats
var team = []; //en array med alle folka i laget

let min = 0; //global for klokkefunk
let sec = 0; //global for klokkefunk

let gold = 100;
/*let xp = 0;
let maxXp = 5; //ligger i localStorage nå
let globalLevel = 1;*/
let world = "Street";
let worldDifficulty = 1;

let teamMenu = false; //hvis man er i teammenu
let fighterShopMenu = false; //hvis man er i fightershopmenu

let dead = true; //hvis player er død
let fighting = false; //hvis man er i kamp
let autoFighting = false; //hvis autonestekamp og autostartkamp er påslått (til if statement i startkamp og nestekamp)

let globalFightId = 0;

//LOCALSTORAGE
//beholder verdier når man lukker gamet
let encounterNumber = localStorage.getItem("encounterNumber") //henter gammel localstorage //null om den ikke finnes
checkLocalStorage(encounterNumber,0);

let globalLevel = 1;
let xp = 3;
let maxXp = 5;
/*
let globalLevel = Number(localStorage.getItem("globalLevel")) //henter gammel localstorage //null om den ikke finnes
checkLocalStorage(globalLevel,1)

let xp = Number(localStorage.getItem("xp")) //henter gammel localstorage //null om den ikke finnes
checkLocalStorage(xp,0);

let maxXp = Number(localStorage.getItem("maxXp")) //henter gammel localstorage //null om den ikke finnes
checkLocalStorage(maxXp,5);
*/

function checkLocalStorage(variable, startNum){ //henter gammel localstorage //null om den ikke finnes
    if(variable == null){
        variable = startNum;
    }
}

window.addEventListener("unload", function() {
    localStorage.setItem("encounterNumber", encounterNumber)
    localStorage.setItem("globalLevel", globalLevel)
    localStorage.setItem("xp", xp)
    localStorage.setItem("maxXp", maxXp)
});

// mults
let goldDrop = 1;
let goldMult = 1;
let xpDrop = 1;
//

function globalLevelUp(){ //levelup func for globalplayer
    if(xp >= maxXp){ //hvis man har nådd maxXP
        xp -= maxXp; //setter xp til 0 igjen
        maxXp += 5; //øker xp til neste lvl
        globalLevel++; //øker lvl
        textWinEl.innerHTML += "You are now level <font color='yellow'>" + globalLevel + "</font><br>";
    }
}

class FighterClass { //felles class for fiende og player 
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
    attack(target){ //dette er felles angrepsfunksjon
        if(target.health > 0 && this.health > 0 && dead != true){ //hvis både angriper og target er i live kan funksjonen kjøre
            var that = this; //for indre funksjon i settimeout
            var theDmg = (Math.floor(Math.random()*(this.damageMax-(this.damageMin-1)))+this.damageMin)
            target.health -= theDmg; //gjør skaden
            textWinEl.innerHTML += this.name + " attacked " + target.name + " for " + theDmg + " damage<br>"; //skriver i tekstvindu
            target.die(that); //sjekker om target dør
            setTimeout(function(){ that.attack(target);}, this.atSpeed ); //angriper når timeout er ute
        }
    }
}

function rarityStars(rarity){ //returnerer stjernene til en rarityverdi
    var rarityStars;
    if(rarity == 1){
        rarityStars = "<font color='white'>✩</font>";
    } else if(rarity == 2){
        rarityStars = "<font color='white'>✩✩</font>"
    }
    return rarityStars;
}

class EnemyClass extends FighterClass{ //kun for fiender (egen die func)
    constructor(name, level, health, maxHealth, damageMin, damageMax, gold, xp, maxXp, atSpeed, rarity, fightId) {
        // Chain constructor with super
        super(name, level, health, maxHealth, damageMin, damageMax, gold, xp, maxXp, atSpeed, rarity, fightId);
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
    constructor(name, level, health, maxHealth, damageMin, damageMax, gold, xp, maxXp, atSpeed, rarity, fightId) {
        // Chain constructor with super
        super(name, level, health, maxHealth, damageMin, damageMax, gold, xp, maxXp, atSpeed, rarity, fightId);
    }
    die(killer){ //hvis player dør
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
            this.maxXp += 5;
            this.damageMin += 1;
            this.damageMax += 2;
            this.maxHealth += 2;
            this.health = this.maxHealth;
            this.level++;
            textWinEl.innerHTML += this.name + " is now level <font color='yellow'>" + this.level + "</font><br>";
            if(teamMenu == true){
                chooseTeamMenu();
            }
        }
    }
}

var player; //lager global variabel for player og enemy
var enemy;

//enemyNames = ["Hans", "Kuku", "Ballong", "Stein"];
//enemyName = enemyNames[Math.floor(Math.random()*4)];

function newEncounter(){
    if(enemy.health <= 0 && player.health > 0){
        player.health = player.maxHealth;
        createEncounter()
    }
}
createEncounter();
function createEnemy(name,level,hp,dmgmin,dmgmax,golddrop,xp,atspeed){
    enemy = new EnemyClass(
        "<font color='red'>" + name + "</font>", //name
        level, //level
        hp, //hp
        hp, //maxhp
        dmgmin, //dmgmin
        dmgmax, //dmgmax
        golddrop, //gold
        xp, //xp
        xp, //maxxp
        atspeed, //atSpeed
        0, //rarity
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
            player.attack(enemy);
            enemy.attack(player);
        }
    }
}