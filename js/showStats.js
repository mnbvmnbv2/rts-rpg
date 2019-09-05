const topLeftTextEl = document.getElementById("topLeftText");
const xpBarEl = document.getElementById("xpBar")
const xpBarTextEl = document.getElementById("xpBarText")
const globalXpBarEl = document.getElementById("globalXpBar")
const globalXpBarTextEl = document.getElementById("globalXpBarText")
const stats1leftEl = document.getElementById("stats1left");
const stats1rightEl = document.getElementById("stats1right");
const stats2leftEl = document.getElementById("stats2left");
const stats2rightEl = document.getElementById("stats2right");
statsUpdate();
function statsUpdate(){ //i fanen til venstre stats
    if(dead == true){
        playerPlaceTextEl.innerHTML = "None";
    } else {
        playerPlaceTextEl.innerHTML = //i playerboxen
        "<font color='#FFFFFF'>" + player.name + rarityStars(player.rarity) + //navn og rarity
        "<br>Level: " + player.level + //level
        "<br>Health: <font color='green'>" + player.health + "</font>/<font color='green'>" + player.maxHealth + "</font>"; //health av maxHealth

        stats2leftEl.innerHTML =  //global player stats helt til venstre (text delen)
        "<font color='white'>Damage: </font>" + 
        "<br><font color='white'>Speed: </font>";

        stats2rightEl.innerHTML =  //samme som over men talldelen
        "<font>" + player.damageMin + "-" + player.damageMax + "</font>" + 
        "<br><font>" + player.atSpeed + " </font>";    

        topLeftTextEl.innerHTML = player.health + "/" + player.maxHealth; //healthbar
        document.getElementById("topLeftBar").style.width = ((player.health/player.maxHealth) * 596) + "px"; //bredden på healthbar

        xpBarTextEl.innerHTML = player.xp + "/" + player.maxXp; //xpbar text
        document.getElementById("xpBar").style.width = ((player.xp/player.maxXp) * 1900) + "px"; //xpbar bredde
    }

    globalXpBarTextEl.innerHTML = xp + "/" + maxXp; //globalxpbar text
    document.getElementById("globalXpBar").style.width = ((xp/maxXp) * 1900) + "px"; //globalxpbar bredde

    stats1leftEl.innerHTML =  //global player stats helt til venstre (text delen)
    "<font color='white'>Level:</font> " + //globallevel
    "<br><font color='white'>Gold:</font> " + //gold
    "<br><font color='white'>Encounter: " + //hvor mange møtt
    "<br>Time: </font>"; //tid

    stats1rightEl.innerHTML =  //samme som over men talldelen
    "<font color='#2adb59'>" + globalLevel + "</font> " +
    "<br><font color='gold'>" + gold + "</font> " + //gold + mellomrom
    "<br>" + encounterNumber + " " + //skriver ut antall man har møtt
    "<br>" + min + ":" + sec + "</font>&nbsp"; //tiden i min:sek

    requestAnimationFrame(statsUpdate); //kjører/oppdaterer hver frame
}

var stats3leftEl = document.getElementById("stats3left"); //enemy stats
var stats3rightEl = document.getElementById("stats3right");
var topRightTextEl = document.getElementById("topRightText"); //enemy health
enemyStatsUpdate();
function enemyStatsUpdate(){ //helt høyre stats
    if(dead === false){
        enemyPlaceTextEl.innerHTML =
        "<font color='#FFFFFF'>" + enemy.name +
        "<br>Level: " + enemy.level +
        "<br>Health: <font color='green'>" + enemy.health + "</font>/<font color='green'>" + enemy.maxHealth + "</font>";

        stats3leftEl.innerHTML =  //global player stats helt til venstre (text delen)
        "<font color='white'>Damage: </font>" + 
        "<br><font color='white'>Speed: </font>" + 
        "<br><font color='#F6F4D2'>Gold: " + 
        "<br>Experience: </font>";

        stats3rightEl.innerHTML =  //samme som over men talldelen
        "<font>" + enemy.damageMin + "-" + enemy.damageMax + "</font>" + 
        "<br><font>" + enemy.atSpeed + " </font>" + 
        "<br><font color='gold'>" + enemy.gold + "</font>" +
        "<br><font color='#820088'>" + enemy.xp + "</font>";


        topRightTextEl.innerHTML = enemy.health + "/" + enemy.maxHealth;
        document.getElementById("topRightBar").style.width = ((enemy.health/enemy.maxHealth) * 596) + "px";
    } else {
        //enemyStatsEl.innerHTML = "</font><br><font color='white'>You died";
    }
    requestAnimationFrame(enemyStatsUpdate);
}

timeIncrement();
function timeIncrement(){ //for å ha en timer func
    sec++; //øker sekunder
    if(sec === 60){ //øker minutter
        sec = 0; //setter sekundene til 0 igjen for hvert minutt
        min++; //øker minutt med 1
        createAvailableFighters(); //oppdaterer shoppen hvert min
        if(fighterShopMenu == 1){
            chooseFighterShopMenu();
        }
    }
    setTimeout(timeIncrement, 1000); //kjører funksjonen hvert sekund
}