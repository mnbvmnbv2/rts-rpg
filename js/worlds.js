//world************
function addWorldButtons(){
    addBtn("Street","Go to Street", gotoStreet); //For å gå til street verdenen
    //addBtn("Nice forest", "Go to Nice forest", gotoForest) //gå til forest
    //addBtn("Desert", "Go to Desert", gotoDesert) //gå til desert
    addBtn("Next", "Goes to the harder part of your world", gotoNext) //går til samme sted bare vanskeligere
    addBtn("Previous", "Goes back to the easier part of your world", gotoPrevious) //går tilbake
}
function chooseWorldMenu(){
    removeAllButtons();
    addWorldButtons();
    menu = "worldMenu";
}
const worldMenuEl = document.getElementById("worldMenu")
worldMenuEl.addEventListener("click", chooseWorldMenu);

//-------

const topMidEl = document.getElementById("topMid"); //der navnet på verdenen står

function gotoStreet(){
    world = "Street";
    worldDifficulty = 1;
    topMidEl.innerHTML = "<b>" + world + " 1-" + worldDifficulty + "</b>"
}
function gotoNext(){
    worldDifficulty++;
    topMidEl.innerHTML = "<b>" + world + " 1-" + worldDifficulty + "</b>"
}
function gotoPrevious(){
    if(worldDifficulty != 1){
        worldDifficulty--;
        topMidEl.innerHTML = "<b>" + world + " 1-" + worldDifficulty + "</b>"
    }
}