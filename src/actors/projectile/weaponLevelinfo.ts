import {vec} from "excalibur"
import { Resources } from "../../resources";

export const weapons = {

    Ante: 
        {   
            levels: {
                1: {damage: 10,step: 0.06,radiusMultiplier: 1, scaleMultiplier: 1.2, projectiles: 1, text: "Kruži oko tebe i ubija boobe uhh"},
                2: {damage: 10,step: 0.06,radiusMultiplier:  1,scaleMultiplier: 1.2,projectiles: 2, text: "Ante level 2"},
                3: {damage: 15,step: 0.06,radiusMultiplier:  1,scaleMultiplier: 1.2,projectiles: 2, text: "Ante level 3 "},
                4: {damage: 20,step: 0.06,radiusMultiplier:  1,scaleMultiplier: 1.2, projectiles: 3,text: "Ante level 4"},
                5: {damage: 25,step: 0.06,radiusMultiplier:  1,scaleMultiplier: 1.2, projectiles: 4,text: "Ante level 5 "},
            },
            image: Resources.ante,
            smallImage: Resources.anteSmall
        },
    
    Shuriken: {

            levels: {
                1: {damage: 10,attackSpeed:2000,projectileSpeed: 1000,  projectiles: 1,  text: "Leteće tangice itd i sl"},
                2: {damage: 15,attackSpeed: 2000,projectileSpeed: 1000,projectiles: 2, text: " Tangice level 2"},
                3: {damage: 20,attackSpeed: 2000,projectileSpeed: 1000,projectiles: 2,  text: " Tangice level 3"},
                4: {damage: 25,attackSpeed: 2000,projectileSpeed: 1000, projectiles: 3, text: " Tangice level 4"},
                5: {damage: 30,attackSpeed: 2000,projectileSpeed: 1000, projectiles: 4 ,text: " Tangice level 5"},
            },
            image: Resources.tangice,
            smallImage: Resources.tangiceSmall
    
    },

    Blaster: {
        levels: {
            1: {damage: 20,attackSpeed: 500,projectileSpeed: 1000, text: "Sengulica"},
            2: {damage: 30,attackSpeed: 400,projectileSpeed: 1000,  text: "Sengula level 2"},
            3: {damage: 40,attackSpeed: 300,projectileSpeed: 1000,  text: "Sengula level 3"},
            4: {damage: 50,attackSpeed: 200,projectileSpeed: 1000,  text: "Sengula level 4"},
            5: {damage: 60,attackSpeed: 100,projectileSpeed: 1000,  text: "Sengula level 5"},
        },
        image: Resources.sengula,
        smallImage: Resources.sengulaSmall


    },
    Magnet: {
        levels: {
            1: {distance:100, text: "Uživa speed"},
            2: {distance:200,  text: "Cejo level 2"},
            3: {distance:300,  text: "Cejo level 3"},
            4: {distance:400,  text: "Cejo level 4"},
            5: {distance:500,  text: "Cejo level 5"},
        },
        image: Resources.tzeyo,
        smallImage: Resources.tzeyo

    },
    BigBlaster: {
        levels: {
            1: {damage:100,attackSpeed: 3000,projectileSpeed: 500,scale: vec(1.5,1.5), text: "Velik dmg, dug cooldown"},
            2: {damage:100,attackSpeed: 2750,projectileSpeed: 500, scale: vec(2,2),     text: " Bugre level 2"},
            3: {damage:100,attackSpeed: 2500,projectileSpeed: 500, scale: vec(3,3),     text: " Bugre level 3"},
            4: {damage:100,attackSpeed: 2250,projectileSpeed: 500, scale: vec(4,4),     text: " Bugre level 4"},
            5: {damage:100,attackSpeed: 2000,projectileSpeed: 500, scale: vec(5,5),     text: " Bugre level 5"},
        },
        image: Resources.nugre,
        smallImage: Resources.nugreSmall
    },
    Bouncy: {
        levels: {
            1: {damage: 20,attackSpeed: 2500, projectileSpeed: 800, text: "Naspidirana glupača skače okolo"},
            2: {damage: 30,attackSpeed: 2400, projectileSpeed: 900,  text: " Kile level 2"},
            3: {damage: 40,attackSpeed: 2300, projectileSpeed: 1000,  text: " Kile level 3"},
            4: {damage: 50,attackSpeed: 2200, projectileSpeed: 1100,  text: " Kile level 4"},
            5: {damage: 55,attackSpeed: 2100, projectileSpeed: 1200,  text: " Kile level 5"},
        },
        image: Resources.bouncy,
        smallImage: Resources.bouncySmall
    },
    Armor: {
        levels: {
            1: {damageResist: 1, text: "Smanjuje primljeni dmg"},
            2: {damageResist: 2,  text: "Armor level 2"},
            3: {damageResist: 3,  text: "Armor level 3"},
            4: {damageResist:4,  text: "Armor level 4"},
            5: {damageResist:5,  text: "Armor level 5"},
        },
        smallImage: Resources.armor
    },
    HpRegen:{
        levels: {
            1: {hps: 0.2, text: "Hp regen"},
            2: {hps: 0.3,  text: "Hp regen level 1"},
            3: {hps: 0.4,  text: "Hp regen level 2"},
            4: {hps: 0.5,  text: "Hp regen level 3"},
            5: {hps: 0.6,  text: "Hp regen level 4"},
        },
        smallImage: Resources.hpRegen
    },
}
    


