import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer, Color } from "excalibur";
import { Resources } from "../../resources";
import { Enemy } from "../enemy/enemy";
import { weapons } from "./weaponLevelinfo";
import { PowerUp } from "../powerup/powerup";
import { MainScene } from "../../scenes/level-one/mainscene";



export class Magnet extends Actor{
    public isColliding: boolean = false
    public level: number = 1
    constructor(x,y,name) {
        super({ pos: vec(x,y),z:2, collisionType:CollisionType.Passive, name: name,radius: weapons.Magnet.levels[1].distance})
    }

    public update(engine: Engine, delta: number): void {
        
        this.on("collisionstart", (evt)=> {
            if (evt.other instanceof PowerUp && !this.isColliding) {
                this.isColliding = true
                let scene = this.scene as MainScene
                evt.other.actions.meet(scene.player,600)
            }
        })

        this.on("collisionend", (evt)=> {
         this.isColliding = false
        })
    }

    public levelUp() {
        this.level+=1
        this.collider.clear()
        this.collider.useCircleCollider(weapons.Magnet.levels[this.level].distance)
    }

    }
