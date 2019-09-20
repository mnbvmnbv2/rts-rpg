function createEncounter(){
    if(world == "Street"){
        let enemyNames = [
            "🐀Rat",
            "🐀Huge Rat"
        ];
        let enemyName = enemyNames[Math.floor(Math.random()*enemyNames.length)];
        createEnemy(enemyName, //name
        1*worldDifficulty, //level
        3*worldDifficulty, //hp
        1*worldDifficulty, //dmgmin
        2*worldDifficulty-1, //dmgmax
        1*worldDifficulty, //golddrop
        1*worldDifficulty, //xp
        2500, //atspeed
        0, //rarity
        Math.floor(Math.random()*3), //type
        [0,0,0], //defence
        0, //critchacne
        0, //critdmg
        [0] //effect
        );
    }//createEnemy(name,level,hp,dmgmin,dmgmax,golddrop,xp,atspeed,rarity,type,defence,critChance,critDmg,effect)
}