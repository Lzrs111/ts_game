import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer } from "excalibur";
import { Resources } from "../../resources";
import { Enemy } from "../enemy/enemy";
import { weapons } from "./weaponLevelinfo";


const level = weapons["Ante"]

export class Ante extends Actor{
    public t = 0
    public shotTimer: Timer
    public circleX
    public circleY
    public timerInterval = 10
    public damage: number = level["levels"][1].damage
    public level:number =  1;
    public step:number = level["levels"][1].step
    public radius: number = 250
    public isColliding: boolean = false
    constructor(x,y,name) {
        super({ z:2, collisionType:CollisionType.Passive, height: Resources.ante.height, width: Resources.ante.width, name: name
        })
        this.pos = vec(x,this.radius+y)
    }

    public onInitialize(_engine: Engine): void {
        this.circleX = this.pos.x
        this.circleY = this.pos.y - this.radius
        this.graphics.use(Resources.ante.toSprite())
        this.createShotTimer()
       
    }
    
    public move(): void {
        let x
        let y
        x = this.radius*Math.cos(this.t) + this.circleX
        y = this.radius*Math.sin(this.t) + this.circleY;
        this.pos = vec(x,y)

        this.t+=this.step
        if (this.t >= 2*Math.PI) {
            this.t = 0
        }

    }

    public update(engine: Engine, delta: number): void {
        
        this.on("collisionstart", (evt)=> {
            if (evt.other instanceof Enemy && !this.isColliding) {
                this.isColliding = true
                
                let intersection = evt.contact.mtv.normalize();
            
                if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
                   
                    if (this.scene.engine.canvas.width/2 > evt.other.pos.x) {
                        evt.other.pos.x-=15
                    } else {
                        evt.other.pos.x+=15
                    }

                  } else {

                    if (this.scene.engine.canvas.height/2 > evt.other.pos.x) {
                        evt.other.pos.y-=15
                    } else {
                        evt.other.pos.y+=15
                    }
                  }
                  evt.other.takeDamage(this.damage)
            }
        })

        this.on("collisionend", (evt)=> {
         this.isColliding = false
        })
    }

    public createShotTimer() {
        let timer = new Timer({repeats: true, fcn: ()=> {
            this.move()
        },interval: this.timerInterval})
        this.shotTimer = timer
        this.scene.addTimer(this.shotTimer)
        this.shotTimer.start()
    }

    public levelUp() {
        this.level +=1
        this.damage = level.levels[this.level].damage
        this.step = level.levels[this.level].step
    }
    
}