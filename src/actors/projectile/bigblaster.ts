import { Logger,Vector,vec, Engine, Input } from "excalibur";
import { MainScene } from "../../scenes/level-one/mainscene";
import { Enemy } from "../enemy/enemy";
import { ProjectileWrapper } from "./projectileWrapper";
import { weapons } from "./weaponLevelinfo";
import { Resources } from "../../resources";
import { Projectile } from "./projectile";


export class BigBlaster extends ProjectileWrapper {
    public altControls: boolean = false
    constructor(x,y){
        super(x,y,"BigBlaster",weapons["BigBlaster"])
    }

    public onInitialize(_engine: Engine): void {
      let scene = this.scene as MainScene
      this.projectileSpeed = scene.mobile ? this.projectileSpeed*0.5 : this.projectileSpeed
    }

    public makeProjectile(): void {
        let scene = this.scene as MainScene
        let enemies = this.scene.actors.filter((val)=> {
          if (val instanceof Enemy) {
              return val
          }
      })
        if (enemies.length > 0) {       
         let projectile = new Projectile(Vector.Zero,this.pos.x,this.pos.y,this.damage,Resources.nugre,this.name)
         this._projectiles.push(projectile)

        projectile.once("boom",(evt)=> {
            projectile.exploding = true
          })


         projectile.actions.moveTo(this.getTarget(enemies),this.projectileSpeed).callMethod(()=> {this.emitBoom(projectile)}).scaleBy(vec(1.5,1.5),1.5).die()
        

   
         projectile.update = () => {
                let engine = this.scene.engine
                if (projectile.exploding && !this.altControls) {
                    if (
                        engine.input.keyboard.isHeld(Input.Keys.W) ||
                        engine.input.keyboard.isHeld(Input.Keys.Up)
                      ) {
                        projectile.pos.y +=projectile.offset;
                  
                      }
                  
                      if (
                        engine.input.keyboard.isHeld(Input.Keys.S) ||
                        engine.input.keyboard.isHeld(Input.Keys.Down)
                      ) {
                        projectile.pos.y -=projectile.offset;
                    
                      }
                  
                      if (
                        engine.input.keyboard.isHeld(Input.Keys.A) ||
                        engine.input.keyboard.isHeld(Input.Keys.Left)
                      ) {
                        projectile.pos.x +=projectile.offset;
                     
                  
                      }
                  
                      if (
                        engine.input.keyboard.isHeld(Input.Keys.D) ||
                        engine.input.keyboard.isHeld(Input.Keys.Right)
                      ) {
                        projectile.pos.x -=projectile.offset;
                      }
                }

              this._projectiles.forEach((projectile,index) => {
                if (projectile.isKilled()) {
                  this._projectiles.splice(index,1)
                }
              })
                
            }
        
         
        }

            
       

    }

    public emitBoom(projectile: Projectile) {
        projectile.emit("boom",{})
    }
  


    public levelUp() {
        this.level +=1
        this.damage =  weapons.BigBlaster.levels[this.level].damage
        this.attackSpeed =  weapons.BigBlaster.levels[this.level].attackSpeed
        this.scale =  weapons.BigBlaster.levels[this.level].scale
        this.createShotTimer()
    }

    public getTarget(enemies) {
        let scene = this.scene as MainScene
        let target
        while(true) {
            target = enemies[Math.floor(Math.random() * enemies.length)]

            if (target && !target.isOffScreen) {
                return vec(target.pos.x,target.pos.y)
            } else {
                break
            }
        }
    }
    
}