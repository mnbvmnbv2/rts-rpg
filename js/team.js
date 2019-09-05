//team ****
function addTeamButtons(){
    for(i in team){ //for i in team
        addBtn("Choose " + team[i].name + rarityStars(team[i].rarity),
        //textBox
        "<font color='gold'>"+team[i].gold+" gold</font>"+ //Prisen
        "<br><font color='#66FCF1'>"+team[i].name+"</font>"+ //navnet
        "<br>"+rarityStars(team[i].rarity)+ //hvor sjelden utifra stjerner etc
        "<br>Level: "+team[i].level+ //lvl
        "<br>Health: "+team[i].health+ //liv
        "<br>AttackPower: "+team[i].damageMin+"-"+team[i].damageMax+ //hvor mye skade
        "<br>AttackSpeed: "+team[i].atSpeed+
        "<br>Experience: "+team[i].xp+"/"+team[i].maxXp, //hvor rask
        //funksjonen som velger denne fighteren
        chooseFighter);
    }
}
function chooseTeamMenu(){
    removeAllButtons();
    addTeamButtons();
    teamMenu = true;
}
const teamMenuEl = document.getElementById("teamMenu")
teamMenuEl.addEventListener("click", chooseTeamMenu);

function chooseFighter(e){
    if(fighting == false){
        if(e.target.innerHTML.includes("<font")){
            player = team[buttonsz.indexOf(e.target)];
            dead = false;
        } else{
            player = team[buttonsz.indexOf(e.target.parentNode)];
            dead = false;
        }
    }
}