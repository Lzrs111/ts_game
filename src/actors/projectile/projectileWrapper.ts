import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer } from "excalibur";
import { Resources } from "../../resources";
import { Projectile } from "./projectile";
import { weapons } from "./weaponLevelinfo";
import { MainScene } from "../../scenes/level-one/mainscene";

export class ProjectileWrapper extends Actor {
    
    public _projectiles: Projectile[] = [];
    public x: number
    public y: number
    private _numOfProjectiles: number = 1
    public shotTimer: Timer
    public damage: number 
    public attackSpeed: number 
    public projectileSpeed: number = 1000
    public level = 1
    public image

    constructor( x,y,name,info) {
        super({name: name })
        this.pos.x = x
        this.pos.y = y
        this.damage = info["levels"][this.level]["damage"]
        this.image = info["image"]
        this.attackSpeed = info["levels"][this.level]["attackSpeed"]
        this.projectileSpeed = info["levels"][this.level]["projectileSpeed"]
    }

    
    public onInitialize(_engine: Engine): void {
        let scene = this.scene as MainScene
        this.projectileSpeed = scene.mobile ? this.projectileSpeed*0.5 : this.projectileSpeed
        this.createShotTimer()
    }

    public makeProjectile() {
        for (let i = 0; i < 4; i++) {
            let x
            let y   
            
            switch (i) {
                case 0:
                x = -0.5
                y = -0.5  
                break;
                case 1:
                x = 0.5
                y = -0.5   
                break;  
                case 2:
                x = -0.5
                y = 0.5
                break;
                case 3:
                x = 0.5
                y = 0.5
                break;
                default:
                    break;
            }

        x *=this.projectileSpeed
        y *=this.projectileSpeed
        this._projectiles.push(new Projectile(vec(x,y),this.pos.x,this.pos.y,this.damage, this.image, this.name))

       }

    }

    public update(engine: Engine, delta: number): void {
        this._projectiles.forEach((element,index) => {
            if (element.isKilled() || element.isOffScreen) {
                this._projectiles.splice(index,1)
            }
        });

    
    }


    public createShotTimer() {

        if (this.shotTimer) {
            this.scene.timers.forEach(timer => {
                if (timer === this.shotTimer)
                    this.scene.removeTimer(timer)
            })
        }
        let timer = new Timer({repeats: true,fcn: ()=> {
            this.makeProjectile()
            this._projectiles.forEach(element => {
                this.scene.add(element)
            })

        }, interval: this.attackSpeed})
        this.shotTimer = timer
        this.scene.add(this.shotTimer)
        this.shotTimer.start()
    }

    public levelUp() {
        this.level +=1
        this.damage =  weapons.Blaster.levels[this.level].damage
        this.attackSpeed =  weapons.Blaster.levels[this.level].attackSpeed
        this.createShotTimer()
    }



}