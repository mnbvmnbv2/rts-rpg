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
}
const teamMenuEl = document.getElementById("teamMenu")
teamMenuEl.addEventListener("click", chooseTeamMenu);

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