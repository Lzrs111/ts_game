import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer } from "excalibur";
import { Resources } from "../../resources";
import { Enemy } from "../enemy/enemy";
import { weapons } from "./weaponLevelinfo";
import { MainScene } from "../../scenes/level-one/mainscene";
import { ProjectileWrapper } from "./projectileWrapper";
import { Projectile } from "./projectile";


const level = weapons["Ante"]

export class Ante extends ProjectileWrapper{
    public t = 0
    public shotTimer: Timer
    public moveTimer: Timer
    public circleX
    public circleY
    public timerInterval = 10
    public level:number =  1;
    public step:number = level["levels"][1].step
    public radius: number
    public isColliding: boolean = false
    public projectileNumber: number = 1
    public cooldown: number = 5000
    public altControls: boolean = false
    constructor(x,y,name) {
        super(x,y,"Ante",weapons["Ante"])
    }

    public onInitialize(_engine: Engine): void {
        this.radius = Math.min(_engine.canvas.height,_engine.canvas.width)*0.20
        this.pos = vec(this.pos.x,this.radius+this.pos.y)
        this.circleX = this.pos.x
        this.circleY = this.pos.y - this.radius
        this.makeProjectile()
        this.createShotTimer()
        this.createMoveTimer()

        let scene = this.scene as MainScene
        this.scale = scene.scale
    }

    public makeProjectile(): void {
        let projectile = new Projectile(Vector.Zero,this.pos.x,this.pos.y, this.damage,this.image,this.name)
        projectile.duration = Infinity
        this._projectiles.push(projectile)
        this.scene.add(projectile)
    }   
    
    public move(projectile): void {
        let x
        let y
        x = this.radius*Math.cos(projectile.t) + this.circleX
        y = this.radius*Math.sin(projectile.t) + this.circleY;
        projectile.pos = vec(x,y)

        projectile.t+=this.step
        if (projectile.t >= 2*Math.PI) {
            projectile.t = 0
        }

    }

    public update(engine: Engine, delta: number): void {
                
        this.on("collisionstart", (evt)=> {
            if (evt.other instanceof Enemy && !this.isColliding) {
                this.isColliding = true
                
                // let intersection = evt.contact.mtv.normalize();
            
                // if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
                   
                //     if (this.scene.engine.canvas.width/2 > evt.other.pos.x) {
                //         evt.other.pos.x-=15
                //     } else {
                //         evt.other.pos.x+=15
                //     }

                //   } else {

                //     if (this.scene.engine.canvas.height/2 > evt.other.pos.x) {
                //         evt.other.pos.y-=15
                //     } else {
                //         evt.other.pos.y+=15
                //     }
                //   }
                  evt.other.takeDamage(this.damage)
            }
        })



        this.on("collisionend", (evt)=> {
         this.isColliding = false
        })

        if (this.altControls) {
            this.pos = vec(this.pos.x,this.radius+this.pos.y)
            this.circleX = this.pos.x
            this.circleY = this.pos.y - this.radius
        }
        

      
    }

    // public createShotTimer() {

    //     if (this.shotTimer) {
    //         this.scene.timers.forEach(timer => {
    //             if (timer === this.shotTimer)
    //                 this.scene.removeTimer(timer)
    //         })
    //     }
    //     let timer = new Timer({repeats: true,fcn: ()=> {
    //         this.makeProjectile()
    //         this._projectiles.forEach(element => {
    //             this.scene.add(element)
    //         })

    //     }, interval: this.attackSpeed})
    //     this.shotTimer = timer
    //     this.scene.add(this.shotTimer)
    //     this.shotTimer.start()
    // }

    public createMoveTimer() {
        let timer = new Timer({repeats: true, fcn: ()=> {
            this._projectiles.forEach(projectile => {
                this.move(projectile)
            }) 
        },interval: this.timerInterval})
        this.moveTimer = timer
        this.scene.addTimer(this.moveTimer)
        this.moveTimer.start()
    }

    public levelUp() {
        this.level +=1
        this.damage = level.levels[this.level].damage
        //this.step = level.levels[this.level].step
        this.radius*=level.levels[this.level].radiusMultiplier
        this.projectileNumber = level.levels[this.level].projectiles
        this.scale = vec(this.scale.x*level.levels[this.level].scaleMultiplier,this.scale.y*level.levels[this.level].scaleMultiplier)

        if (this.projectileNumber > this._projectiles.length) {
            this.makeProjectile()
        }

        this._projectiles.forEach(pr => {
            pr.damage = this.damage
        })
    }
    
}