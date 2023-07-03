import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer, RotationType } from "excalibur";
import { Resources } from "../../resources";
import { Ante } from "./ante";
import { weapons } from "./weaponLevelinfo";



export class Shuriken extends Ante{
    public t = Math.PI/2
    public steps;
    public _scale: number
    public centerX: number
    public centerY: number
    public angle: number = 2*Math.PI
    constructor(x,y) {
        super(x,y,"Shuriken")
        this.centerX = x
        this.centerY = y

    }

    public onInitialize(_engine: Engine): void {
        this._scale = _engine.canvasHeight/2
        this.damage = weapons.Shuriken.levels[1].damage
        this.steps = weapons.Shuriken.levels[1].steps
        this.graphics.use(Resources.tangice.toSprite())
        this.createShotTimer()
       
    }
    
    public move(): void {

        this.actions.rotateBy(Math.PI / 2,2*Math.PI, RotationType.CounterClockwise)
       
       let x = (this._scale * Math.SQRT2*Math.cos(this.t) /(1+Math.sin(this.t)*Math.sin(this.t))) 
       let y = (this._scale*0.75 * Math.SQRT2*Math.cos(this.t) * Math.sin(this.t) /(1+Math.sin(this.t)*Math.sin(this.t))) 

        let x_n = x* Math.cos(this.angle)-y*Math.sin(this.angle) + this.centerX
        let y_n = x* Math.sin(this.angle)+y*Math.cos(this.angle) + this.centerY
    
       this.t+=Math.PI/this.steps

       

       if(this.t>5/2*Math.PI) {
        this.t = Math.PI/2
       }
       
       this.pos = vec(x_n,y_n)
    }

    public getNewAngle() {
        this.angle = 2*Math.PI*Math.random()
    }

    public levelUp() {
        this.level +=1
        this.damage =  weapons.Shuriken.levels[this.level].damage
        this.steps =  weapons.Shuriken.levels[this.level].steps
    }



}