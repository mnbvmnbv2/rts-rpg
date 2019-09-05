timeIncrement();
function timeIncrement(){ //for å ha en timer func
    sec++; //øker sekunder
    if(sec === 60){ //øker minutter
        sec = 0; //setter sekundene til 0 igjen for hvert minutt
        min++; //øker minutt med 1
    }
    setTimeout(timeIncrement, 1000); //kjører funksjonen hvert sekund
}

var buttonsEl = document.getElementById("buttons"); 

function popupFunc(byId){ //for å toggle synligheten til span(popup text boksen)
    var popup = document.getElementById(byId); //henter elementet
    popup.classList.toggle("show"); //legger til class som viser elementet
}

var spanId = 0; //id til span
var globalButtonId = 0;
var buttonsz = [];

function addBtn(name,tips, clickFunc){ //legger til en knapp i midten av downWin
    var buttonz = document.createElement("div"); //lager diven (knappen er en div)
    buttonz.classList.add("buttonify"); //gjør så den ser ut som knapp
    buttonz.classList.add("popup"); //gjør så den kan ha tips
    buttonz.id = "button"+globalButtonId; //unik id til hver knapp
    globalButtonId++; //så neste får høyere nr
    buttonsz.push(buttonz);
    
    var spanz = document.createElement("span"); //popup boxen
    spanz.classList.add("popuptext"); //gjør span til riktig class
    spanz.id = "span" + spanId; //unik span id
    spanz.innerHTML = tips; //texten inni
    spanId++; //øker iden til neste span

    buttonz.addEventListener("mouseover",function() {popupFunc(spanz.id);}) //når man holder over så kommer tipset
    buttonz.addEventListener("mouseout", function() {popupFunc(spanz.id);}) //når man forlater boxen med musen forsvinner det
    buttonz.addEventListener("click", clickFunc); //når man klikker knappen så skjer funksjonen

    buttonz.innerHTML = name; //det som står i knappen
    buttonz.appendChild(spanz); //legger span i boxen
    buttonsEl.appendChild(buttonz); //leger knappen på siden
}

function removeAllButtons(){
    buttonsEl.innerHTML = ""; //fjerner alle knapper
    buttonsz = []; //fjerner alle knapper i arrayen
}

const autoFightBlinkEl = document.getElementById("autoFightBlink")

function autoFight(){ //toggler start av neste fight automatisk
    if(autoFighting === false){ //hvis det ikke er så skal det starte
        autoFighting = true; //setter autofight til sann (denne brukes i enemy.die til å starte neste kamp etter en viss tid)
        autoFightBlinkEl.style.visibility = "visible";
        newEncounter(); //henter neste fiende
        startFight(); //starter kampen (når fienden dør kommer neste automatisk)
    } else { //ellers stop neste fight
        autoFightBlinkEl.style.visibility = "hidden";
        autoFighting = false;
    }
}

//fighter ****
addFighterButtons();
function addFighterButtons(){
    addBtn("Start Fight","Begins the fight", startFight); //lager start kamp knappen
    addBtn("Next Fight", "Meet the next encounter", newEncounter) //lager neste kamp knappen
    addBtn("Autofight", "Starts a script for autofight", autoFight) //lager autofight knappen
}
function chooseFightMenu(){
    removeAllButtons();
    addFighterButtons();
}
const fightMenuEl = document.getElementById("fightMenu")
fightMenuEl.addEventListener("click", chooseFightMenu);

//building*****
function addBuildingButtons(){
    addBtn("Barracks","+1 barrack", startFight); //lager start kamp knappen
    addBtn("Farms", "+1 farm", newEncounter) //lager neste kamp knappen
    addBtn("Castle", "Level up castle", autoFight) //lager autofight knappen
}
function chooseBuildingMenu(){
    removeAllButtons();
    addBuildingButtons();
}
const buildingMenuEl = document.getElementById("buildingMenu")
buildingMenuEl.addEventListener("click", chooseBuildingMenu);

const statsMenu = document.getElementById("statsMenu")

const topLeftEl = document.getElementById("topLeft")
const topRightEl = document.getElementById("topRight")