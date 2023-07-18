import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer, RotationType, ActionSequence, ParallelActions } from "excalibur";
import { Resources } from "../../resources";
import { Ante } from "./ante";
import { weapons } from "./weaponLevelinfo";
import { MainScene } from "../../scenes/level-one/mainscene";
import { Projectile } from "./projectile";
import { ProjectileWrapper } from "./projectileWrapper";
import { Player } from "../player/player";
import { Enemy } from "../enemy/enemy";
import { Weapons } from "../../scenes/level-one/ui";



export class Shuriken extends ProjectileWrapper{
    public numberOfProjectiles:number = 1
    constructor(x,y) {
        super(x,y,"Shuriken",weapons["Shuriken"])
    }

    public makeProjectile(): void {
 
        let scene = this.scene as MainScene
        let enemies = this.scene.actors.filter((val)=> {
            if (val instanceof Enemy) {
                return val
            }
        })
        if (enemies.length > 0) {
            for (let i = 0; i < this.numberOfProjectiles; i++) {
                let target =  this.getTarget(enemies)
                if (target instanceof Vector) {
                    let projectile = new Projectile(Vector.Zero, scene.player.pos.x, scene.player.pos.y,this.damage,Resources.tangice, this.name)
                    let endPoint = vec(scene.player.pos.x - (target.x - scene.player.pos.x), scene.player.pos.y - (target.y - scene.player.pos.y))
                    this._projectiles.push(projectile)
                    
                    let move = new ActionSequence(projectile, ctx => {
                        ctx.moveTo(target,this.projectileSpeed)
                        ctx.moveTo(endPoint,this.projectileSpeed)
                        ctx.die()
                    })
            
                    let rotate = new ActionSequence(projectile, ctx => {
                       ctx.rotateBy(Math.PI*20,Math.PI*2)
                    })
                    let parallel = new ParallelActions([rotate,move])
                    projectile.actions.runAction(parallel)
                }
            }
        }
    }

    // public getNewAngle() {
    //     this.angle = 2*Math.PI*Math.random()
    // }


    public levelUp() {
        this.level +=1
        this.damage =  weapons.Shuriken.levels[this.level].damage
        this.attackSpeed =  weapons.Shuriken.levels[this.level].attackSpeed
        this.numberOfProjectiles = weapons.Shuriken.levels[this.level].projectiles
    }

    public getTarget(enemies) {
        let scene = this.scene as MainScene
        let target
        if (enemies.length > 0) {
               while(true) {
                   target = enemies[Math.floor(Math.random() * enemies.length)]
   
                   if (target && !target.isOffScreen) {
                        return vec(target.pos.x,target.pos.y)
                   } else if (target.isOffScreen) {
                     break
                   }
               }
         }
    }



}