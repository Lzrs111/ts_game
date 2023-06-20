import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer } from "excalibur";
import { Resources } from "../../resources";

export class Ante extends Actor {
    public t = 0
    public moveTimer: Timer
    public circleX
    public circleY
    public timerInterval = 10
    constructor(x,y) {
        super({pos: vec(x,y), z:1, collisionType:CollisionType.Passive, height: Resources.ante.height, width: Resources.ante.width
        })
    }

    public onInitialize(_engine: Engine): void {
        this.circleX = this.pos.x
        this.circleY = this.pos.y -200
        this.graphics.use(Resources.ante.toSprite())
       
    }
    
    public move(): void {
        let x
        let y
        x = 200*Math.cos(this.t) + this.circleX
        y = 200*Math.sin(this.t) + this.circleY;
        this.pos = vec(x,y)

        this.t+=0.05
        if (this.t >= 2*Math.PI) {
            this.t = 0
        }

    }

    public update(engine: Engine, delta: number): void {
        
        this.on("collisionstart", (evt)=> {
            if (evt.other.name == "enemy") {
                evt.other.kill()
            }
        })
    }
    
}