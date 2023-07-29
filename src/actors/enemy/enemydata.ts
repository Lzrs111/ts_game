import { Resource } from "excalibur";
import { Resources } from "../../resources";



const enemies = {
    1: {
        damage: 5,
        speed: 130,
        hp: 20,
        image: Resources.enemy,
        alternate: Resources.enemy_red
    },
    2:  {
        damage: 7.5,
        speed: 130,
        hp: 35,
        image: Resources.enemy1,
        alternate: Resources.enemy1_red
    },
    3:{
        damage: 10,
        speed: 120,
        hp: 30,
        image: Resources.enemy2,
        alternate: Resources.enemy2_red
    },
    4: {
        damage: 12.5,
        speed: 120,
        hp: 35,
        image: Resources.enemy3,
        alternate: Resources.enemy3_red
    },
    5: {
        damage: 15,
        speed: 120,
        hp: 40,
        image: Resources.enemy4,
        alternate: Resources.enemy4_red
    },
    6: {
        damage: 30,
        speed: 50,
        hp: 100000,
        image: Resources.marko,
        alternate: Resources.marko_red,
    }
}


const waves = {
    1: {  
        enemies: {
           1: 1
        },
        numberOfEnemies: 50,
    },
    2: {
        enemies: {
            1: 0.7,
            2: 0.3
        },
        numberOfEnemies: 55
    },
    3:{
        enemies: {
            1: 0.4,
            2: 0.6
        },
        numberOfEnemies: 60
    },
    4: {
        enemies: {
            1: 0.2,
            2: 0.5,
            3: 0.3
            
        },
        numberOfEnemies: 60
    },
    5: {
        enemies: {
            1: 0.05,
            2: 0.25,
            3: 0.35,
            4: 0.35,
        },
        numberOfEnemies: 60
    },
    6: {
       enemies:{ 1: 0,
        2: 0.1,
        3: 0.2,
        4: 0.6,
        5: 0.1,},
        numberOfEnemies: 60
    },
        
    7: {
       enemies: {1: 0,
        2: 0,
        3: 0.25,
        4: 0.45,
        5: 0.3,},
        numberOfEnemies: 60


    },
    8: {
      enemies:{  1: 0,
        2: 0,
        3: 0.05,
        4: 0.35,
        5: 0.6,},
        numberOfEnemies: 60

    },
    9: {
      enemies: { 1: 0,
        2: 0,
        3: 0,
        4: 0.5,
        5: 0.5},
        numberOfEnemies: 60    },
    10: {
      enemies: {  
        1: 0,
        2: 0,
        3: 0,
        4: 0.1,
        5: 0.9,},
        numberOfEnemies: 60
    }
    
}

export {enemies,waves}