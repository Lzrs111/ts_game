import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource,Label, Font, FontUnit, ParticleEmitter, EmitterType, Vector, ColliderComponent } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import { Player } from '../player/player';
import { images } from './enemyImages';
import { MainScene } from '../../scenes/level-one/mainscene';
import { Enemy } from './enemy';
import { enemies } from './enemydata';



export class Boss extends Enemy{
    public projectiles: Projectile[] = []
    public minions: Enemy[] = []
    public projectileDamage: number = 20
    public mobile: boolean = false
    constructor(pos,target) {
        super(pos,target,enemies[6])
        
        this.z = 1
        
    }


    onInitialize(_engine: Engine) {    
  
        this.graphics.use(this.image.toSprite());
      
    
        this.on("collisionstart", (evt)=> {
            if (evt.other instanceof Enemy) {
              //do nothing
            }
          })
    
        this.on("collisionend", (evt)=> {
          this.colliding = false
        })
    
        let scene = this.scene as MainScene
        this.scale = scene.mobile ? vec(0.35,0.35) : vec (1,1)
        this.offset = scene.mobile ? 2 : 5
        this.mobile = scene.mobile
    
    }
    
      public update(engine, delta) {

        this.minions.forEach((minion,index) => {
          if (minion.isKilled()) {
            this.minions.splice(index,1)
          } else if (minion.actions.getQueue().isComplete()) {
            minion.actions.meet(this.target,minion.speed)
          }
        })

        this.projectiles.forEach((pr,index) => {
          if (pr.isOffScreen) {
            pr.kill()
            this.projectiles.splice(index,1) 
          }
        })
        
        this.moves()
       
      }

      public moves() {
        if (this.actions.getQueue().isComplete()) {
            const condition = this.mobile ? this.scene.engine.canvasHeight : this.scene.engine.canvasWidth

            if (this.target.pos.x > condition*0.75 || ((0 < this.target.pos.x) && this.target.pos.x  < condition*0.25)) {
              if (Math.random() > 0.5) {
                  this.actions.moveTo(this.target.pos,condition/2).moveTo(vec(this.scene.engine.halfCanvasWidth,this.scene.engine.halfCanvasHeight),condition*0.4)
              } else {
                if (this.projectiles.length == 0) {
                  this.actions.callMethod(()=> {
                    for (let i = 0; i < 3; i++) {
                      this.actions.callMethod(() => {this.createProjectiles()}).delay(1500)
                    }
                  }).delay(300)
                }  
              }
            
            } else {
              this.actions.callMethod(()=> {
                let unit = Resources.markoProjectile.height

                let numberOfProjectiles = 360/unit
                let radius = this.height/2*1.3
                let t = 0
                let circleX = this.pos.x
                let circleY = this.pos.y 
  
              this.actions.callMethod(() => {
                for (let i = 0; i < 12; i++) { 
                  this.actions.callMethod(()=> {
    
                    let x
                    let y
                    let x1 = 0
                    let y1 = 0
                    let vel
    
    
                    x = radius*Math.cos(t) + circleX
                    y = radius*Math.sin(t) + circleY;
    
    
    
                  if (Math.floor(x) == Math.floor(this.scene.engine.halfCanvasWidth) || Math.round(x) == Math.round(this.scene.engine.halfCanvasWidth)) {
                    x1 = 0
                  } else if (x < this.scene.engine.halfCanvasWidth) {
                    x1 = -x
                  } else if (x > this.scene.engine.halfCanvasWidth) {
                    x1 = x
                  }
                  if (Math.floor(y) == Math.floor(this.scene.engine.halfCanvasHeight)) {
                    y1 = 0
                  } else if (y < this.scene.engine.halfCanvasHeight) {
                    y1 = -y
                  } else if (y > this.scene.engine.halfCanvasHeight) {
                    y1 = y
                  }
    
    
                  //vel = vec(x1,y1)
    
                  let projectile = new Projectile(Vector.Zero,x,y,this.projectileDamage,Resources.markoProjectile,"bossProjectile")
                  projectile.on("exitviewport", ()=> {
                    projectile.kill()
                  })
                  projectile.graphics.use(Resources.markoProjectile.toSprite() )
                  this.scene.add(projectile)
                  this.projectiles.push(projectile)

                  projectile.on("collisionstart",(evt)=> {
                    if (evt.other instanceof Player) {
                      evt.other.takeDamage(projectile.damage)
                    }
        
                    if (evt.other instanceof Boss || evt.other instanceof Enemy) {
        
                    }
        
                    
                  })

                  t+=0.523598776
                  }).delay(100)
            
                }
              })
              })
            
            }

           if (this.projectiles.length > 0) {
              this.projectiles.forEach(projectile => {

                let x = projectile.pos.x
                let y = projectile.pos.y
                let x1
                let y1

                if (Math.floor(x) == Math.floor(this.scene.engine.halfCanvasWidth) || Math.round(x) == Math.round(this.scene.engine.halfCanvasWidth)) {
                  x1 = 0
                } else if (x < this.scene.engine.halfCanvasWidth) {
                  x1 = -x
                } else if (x > this.scene.engine.halfCanvasWidth) {
                  x1 = x
                }
                if (Math.floor(y) == Math.floor(this.scene.engine.halfCanvasHeight)) {
                  y1 = 0
                } else if (y < this.scene.engine.halfCanvasHeight) {
                  y1 = -y
                } else if (y > this.scene.engine.halfCanvasHeight) {
                  y1 = y
                }
  

                projectile.vel = vec(x1,y1)
              })
              this.projectiles = []
           }
            
            // if (this.minions.length == 0) {
            //     for (let i  = 0; i  < 10; i ++) { 
            //           this.actions.callMethod(()=> {
            //               let minion = new Enemy(this.pos,this.target,enemies[4])
            //               minion.update = () => {
                           
            //               }
            //               this.minions.push(minion)
            //               this.scene.add(minion)    
            //           }).delay(500)
            //       }
            //  }
          
          }
      }
      

     

      public createProjectiles() {
        let gap = Math.floor(Math.random() * 3) + 1
 
        for (let i = 0; i < 5; i++) {
          let vect = (vec(this.target.pos.x - this.pos.x, this.target.pos.y - this.pos.y).normalize())
          vect = vec(vect.x*500,vect.y*500)


          let projectileStart

          switch(i) {
            case 0:
              projectileStart = vec(this.pos.x,this.pos.y+this.height/2)
              break
            case 1:   
              projectileStart = vec(this.pos.x,this.pos.y)
              break
            case 4:
              projectileStart = vec(this.pos.x,this.pos.y-this.height/2)
              break
            case 3:
            projectileStart = vec(this.pos.x,this.pos.y-this.height*0.25)
            break
            case 2:
              projectileStart = vec(this.pos.x,this.pos.y+this.height*0.25)
              break
          }

          let projectile = new Projectile(vect,projectileStart.x,projectileStart.y,20,Resources.markoProjectile,"bossProjectile")
          if (gap!=i) {
            this.projectiles.push(projectile)
            this.scene.add(projectile)
          }



          projectile.on("collisionstart",(evt)=> {
            if (evt.other instanceof Player) {
              evt.other.takeDamage(projectile.damage)
            }

            if (evt.other instanceof Boss || evt.other instanceof Enemy) {

            }

            
          })

  
        }
      }

}