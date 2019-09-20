//team ****
var team = []; //en array med alle folka i laget

function addTeamButtons(){
    for(i in team){ //for i in team
        addBtn("Choose " + team[i].name + rarityStars(team[i].rarity) +" "+ typeBoxes(team[i].type),
        //textBox
        "<font color='gold'>"+team[i].gold+" gold</font>"+ //Prisen
        "<br>"+team[i].name+ //navnet
        "<br>"+rarityStars(team[i].rarity)+ //hvor sjelden utifra stjerner etc
        "<br>Type: "+typeBoxes(team[i].type)+ //typen
        "<br>Level: "+team[i].level+"/"+team[i].maxLevel+ //lvl
        "<br>Health: "+team[i].health+ //liv
        "<br>AttackPower: "+team[i].damageMin+"-"+team[i].damageMax+ //hvor mye skade
        "<br>AttackSpeed: "+team[i].atSpeed+ //hvor rask
        "<br>Experience: "+team[i].xp+"/"+team[i].maxXp+ //hvor mye xp
        "<br>Defence:"+team[i].defence[0]+ //first defence
        "<br>Crit: "+team[i].critDmg+" (chance "+team[i].critChance+")"+ //crit (chance x)
        "<br>Items: "+team[i].items[0] //first item
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
            dead = false;
        } else{
            player = team[buttonsz.indexOf(e.target.parentNode)];
            dead = false;
        }
    }
}