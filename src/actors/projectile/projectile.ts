import { Actor,CollisionType,Engine,Vector,vec } from "excalibur";
import { Resources } from "../../resources";

export class Projectile extends Actor {
    constructor(speedVector: Vector, x:number,y:number) {
        super({vel: speedVector,height:1,width:1,pos: vec(x,y), collisionType: CollisionType.Passive})
      

    }

    public onInitialize(_engine: Engine): void {
        this.graphics.use(Resources.sengula.toSprite())
    }

    public onPostUpdate(_engine: Engine, _delta: number): void {
        this.on("collisionstart", (evt)=> {
            if (evt.other.name !="player") {
                evt.other.kill()
                this.kill();
            }
        })
    }
}