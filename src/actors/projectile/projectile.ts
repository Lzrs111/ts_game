import { Actor,CollisionType,Engine,Vector,vec,Logger, ImageSource, Input, Timer } from "excalibur";
import { Resources } from "../../resources";
import { Enemy } from "../enemy/enemy";
import { MainScene } from "../../scenes/level-one/mainscene";
import { Boss } from "../enemy/boss";



export class Projectile extends Actor {
    public damage: number
    public colliding: boolean = false
    public image: ImageSource
    public offset: number = 5
    public exploding: boolean = false
    public t: number = 0
    public bounces: number = 1
    public duration: number = 10000
    constructor(speedVector: Vector, x:number,y:number, damage: number, image: ImageSource,name) {
       // Logger.getInstance().info(speedVector,x,y)
        super({vel: speedVector,height:image.height,width:image.width,pos: vec(x,y), collisionType: CollisionType.Passive,z:2,name})
        this.damage = damage
        this.image = image
    }

    public onInitialize(_engine: Engine): void {
        this.graphics.use(this.image.toSprite())

        this.durationTimer()
        let scene = this.scene as MainScene
        this.scale = scene.scale

      

        this.on("collisionstart", (evt)=> {
        if (!this.colliding && this.name!="bossProjectile" && (evt.other instanceof Enemy || evt.other instanceof Boss)) {
            this.colliding = true
            if (this.name == "Blaster") {
                this.kill()
            }
            evt.other.takeDamage(this.damage)

            } 
        })
           
       


        this.on("collisionend", (evt)=> {
         this.colliding = false
        })
    }

    public durationTimer() {
      let timer = new Timer({repeats: false, fcn: ()=> {
        this.kill()
      },interval: this.duration})
      this.scene.addTimer(timer)
      timer.start()
    }

    public move() {
      
    }

    
}