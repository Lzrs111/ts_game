import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer } from "excalibur";
import { Resources } from "../../resources";
import { Projectile } from "./projectile";
import { Direction } from "../player/direction";
import { weapons } from "./weaponLevelinfo";

export class ProjectileWrapper extends Actor {
    
    public _projectiles: Projectile[] = [];
    private x: number
    private y: number
    public _orientation: Direction = Direction.Right
    private _numOfProjectiles: number = 1
    public shotTimer: Timer
    public damage: number = 30
    public attackSpeed: number = 500
    public projectileSpeed: number = 1000
    public level = 1

    constructor(orientation, x,y) {
        super({name: "Blaster"})
        this._orientation = orientation
        this.x = x
        this.y = y
    }

    
    public onInitialize(_engine: Engine): void {
        this.createShotTimer()
    }

    public makeProjectile() {
        let vector: Vector
        switch (this._orientation) {
            case Direction.Right:
                vector = Vector.Right
                break;
            case Direction.Up:
                vector = Vector.Up
                break
            case Direction.Down:
                vector = Vector.Down
                break
            case Direction.Left:
                vector = Vector.Left
                break
            default:
                break;
        }
        vector = vec(vector.x*1000,vector.y*1000)
        this._projectiles.push(new Projectile(vector,this.x,this.y,this.damage))

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