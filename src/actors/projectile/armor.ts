import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer } from "excalibur";
import { Resources } from "../../resources";
import { Enemy } from "../enemy/enemy";
import { weapons } from "./weaponLevelinfo";
import { PowerUp } from "../powerup/powerup";
import { MainScene } from "../../scenes/level-one/mainscene";



export class Armor extends Actor{
    public level: number = 1
    public damageResist: number
    constructor() {
        super({name: "Armor"})
        this.damageResist = weapons.Armor.levels[1].damageResist
    }

    

    public levelUp() {
        this.level+=1
        this.damageResist = weapons["Armor"]["levels"][this.level]["damageResist"]
    }

    }
