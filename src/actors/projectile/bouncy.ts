import { Actor,CollisionType,Engine,Vector,vec,Logger, Timer, RotationType, Color, ColliderComponent,Input, BoundingBox } from "excalibur";
import { Resources } from "../../resources";
import { Ante } from "./ante";
import { weapons } from "./weaponLevelinfo";
import { Enemy } from "../enemy/enemy";
import { MainScene } from "../../scenes/level-one/mainscene";
import { ProjectileWrapper } from "./projectileWrapper";
import { Projectile } from "./projectile";



export class Bouncy extends ProjectileWrapper{
    public damage: number
    public offset: number = 5
    public level: number = 1
    public colliding: boolean = false
    public posStart: Vector
    public bounces: number = 1
    public altControls: boolean = false
    public projectileNumber: number = 1
    constructor(x,y){
        super(x,y,"Bouncy",weapons["Bouncy"])
        this.posStart = vec(x,y)
    }


    onInitialize(_engine: Engine): void {     
      let scene = this.scene as MainScene
      this.projectileSpeed = scene.mobile ? this.projectileSpeed*0.5 : this.projectileSpeed
      this.createShotTimer()
      

    }

    public makeProjectile(): void {

        // let target: Enemy
        let scene = this.scene as MainScene
        // let enemies =  scene.enemies
      // if (enemies.length > 0) {
      //     let playerPos = scene.player.pos
      //     enemies.sort((a,b)=> {
      //         let distanceA = this.getDistance(a.pos.x,a.pos.y,playerPos.x,playerPos.y)
      //         let distanceB = this.getDistance(b.pos.x,b.pos.y,playerPos.x,playerPos.y)
  
  
      //         if (distanceA < distanceB) {
      //        //     Logger.getInstance().info("Pos Ax: ", a.pos.x,"Pos Ay: ", a.pos.y,"Pos Bx: ", b.pos.x, "Pos Bx: ",b.pos.y, "Pos Playx: ", playerPos.x,"Pos Playy: ", playerPos.y,"Dist A: ", distanceA, "Dist B: ",distanceB, "A < B")
  
      //             return -1
      //         } else {
      //         //    Logger.getInstance().info("Pos Ax: ", a.pos.x,"Pos Ay: ", a.pos.y,"Pos Bx: ", b.pos.x, "Pos Bx: ",b.pos.y, "Pos Playx: ", playerPos.x,"Pos Playy: ", playerPos.y,"Dist A: ", distanceA, "Dist B: ",distanceB, "A > B")
  
      //             return 1
      //         }
      //     })
  

      
      //   for (let i = 0; i < this.projectileNumber; i++) {
      //     if (enemies.length >= this.projectileNumber) {
      //       target = enemies[i] as Enemy          
      //     } else {
      //       target = enemies[0] as Enemy
      //     }
      //   }
      //   let vect = vec( target.pos.x - this.pos.x ,target.pos.y - this.pos.y).clampMagnitude(1)
      //   vect = vec(vect.x*this.projectileSpeed,vect.y*this.projectileSpeed)
        let target = this.getTarget(scene.enemies)
        if (target instanceof Vector) {
          let vect = vec(target.x - scene.player.pos.x,target.y - scene.player.pos.y,).clampMagnitude(1)
          vect.x*=this.projectileSpeed
          vect.y*=this.projectileSpeed
          let projectile = new Projectile(vect,this.pos.x,this.pos.y,this.damage,this.image,"Bouncy")
          projectile.bounces = this.bounces
          this.scene.add(projectile)
          this._projectiles.push(projectile)
        }
       
       
      }

    

    public getDistance(x1, y1, x2, y2){
      let y = x2 - x1;
      let x = y2 - y1;
    
        return Math.sqrt(x * x + y * y);
    }

  

    public update(engine: Engine, delta: number): void {
    

      let govno = engine.getWorldBounds()

    this._projectiles.forEach((element,index) => {
         if (element.pos.y > govno.bottom|| element.pos.y < govno.top) {
           if (element.bounces > 0) {
            element.vel.y *=-1
            element.bounces -=1
           } else {
            element.kill()
            this._projectiles.splice(index,1)
           }
         } 
   
         if (element.pos.x > govno.right || element.pos.x < govno.left) {
          if (element.bounces > 0) {
             element.vel.x*=-1
             element.bounces -=1
          } else {
            element.kill()
            this._projectiles.splice(index,1)
          }
         }
       

    
        
      if (!this.altControls) {
          if (
            engine.input.keyboard.isHeld(Input.Keys.W) ||
            engine.input.keyboard.isHeld(Input.Keys.Up)
          ) {
            element.pos.y +=this.offset;
      
          }
      
          if (
            engine.input.keyboard.isHeld(Input.Keys.S) ||
            engine.input.keyboard.isHeld(Input.Keys.Down)
          ) {
            element.pos.y -=this.offset;
        
          }
      
          if (
            engine.input.keyboard.isHeld(Input.Keys.A) ||
            engine.input.keyboard.isHeld(Input.Keys.Left)
          ) {
            element.pos.x +=this.offset;
         
      
          }
      
          if (
            engine.input.keyboard.isHeld(Input.Keys.D) ||
            engine.input.keyboard.isHeld(Input.Keys.Right)
          ) {
            element.pos.x -=this.offset;
          }
      }


    });
        



 
    }

    public reset() {
      this.pos = this.posStart
      let x = (Math.round(Math.random()) ? 1 : -1)*this.offset
      let y = (Math.round(Math.random()) ? 1 : -1)*this.offset
      this.vel = vec(x,y)
    }

    public levelUp() {
      this.level +=1
      this.damage = weapons.Bouncy.levels[this.level].damage
      this.attackSpeed = weapons.Bouncy.levels[this.level].attackSpeed
      this.bounces = weapons.Bouncy.levels[this.level].bounces
      this.projectileNumber = weapons.Bouncy.levels[this.level].projectiles
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





