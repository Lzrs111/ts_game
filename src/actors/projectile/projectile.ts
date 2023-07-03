import { Actor,CollisionType,Engine,Vector,vec,Logger } from "excalibur";
import { Resources } from "../../resources";
import { Enemy } from "../enemy/enemy";




export class Projectile extends Actor {
    public damage: number
    public isColliding: boolean = false
    constructor(speedVector: Vector, x:number,y:number, damage: number) {
       // Logger.getInstance().info(speedVector,x,y)
        super({vel: speedVector,height:Resources.sengula.height,width:Resources.sengula.width,pos: vec(x,y), collisionType: CollisionType.Passive,z:2})
        this.damage = damage
    }

    public onInitialize(_engine: Engine): void {
        this.graphics.use(Resources.sengula.toSprite())
    }

    public onPostUpdate(_engine: Engine, _delta: number): void {
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

                    if (this.scene.engine.canvas.height/2 > evt.other.pos.y) {
                        evt.other.pos.y-=15
                    } else {
                        evt.other.pos.y+=15
                    }
                  }
                  evt.other.takeDamage(this.damage)
                  this.kill()
            }
        })

        this.on("collisionend", (evt)=> {
         this.isColliding = false
        })
        
    }
}