//team ****
var team = []; //en array med alle folka i laget

function addTeamButtons(){
    for(i in team){ //for i in team
        addBtn("Choose " + team[i].name + rarityStars(team[i].rarity) +" "+ typeBoxes(team[i].type),
        //textBox
        team[i].displayStats()
        ,
        //funksjonen som velger denne fighteren
        chooseFighter);
    }
}
function chooseTeamMenu(){
    removeAllButtons();
    addTeamButtons();
    menu = "teamMenu";
}
const teamMenuEl = document.getElementById("teamMenu")
teamMenuEl.addEventListener("click", chooseTeamMenu);

function chooseFighter(e){
    if(fighting == false){
        if(e.target.innerHTML.includes("<font")){
            player = team[buttonsz.indexOf(e.target)];
        } else{
            player = team[buttonsz.indexOf(e.target.parentNode)];
        }
        dead = false;
    }
}