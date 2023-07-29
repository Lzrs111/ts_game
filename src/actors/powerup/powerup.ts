import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource, Sprite } from 'excalibur';
import { Resources } from '../../resources';
import { Player } from '../player/player';
import { MainScene } from '../../scenes/level-one/mainscene';


 export enum powerUpType {
  Speed,
  SpeedBig

}

export class PowerUp extends Actor { 
    private image: ImageSource;
    private speed: number = 5;
    private type: powerUpType;
    public colliding = false
    public xp: number  = 2
    public moving: boolean = false
    public angle
    constructor(x:number,y:number, type: powerUpType) {  
      let image = type == powerUpType.Speed ?  Resources.powerUp_speed : Resources.tzeyo
      super({
        pos: vec(x,y),
        height: image.height,
        width: image.width,
        color: new Color(255, 255, 255),
        collisionType:CollisionType.Passive,
        z: 2,
      });
      
      this.image = image

      this.type = type
      this.xp = (this.type == powerUpType.Speed) ? 4 : 0
    
   
    }
  

  
    
    onInitialize() {
       this.graphics.use(this.image.toSprite());

       let scene = this.scene as MainScene

       if (scene.mobile) {
         this.scale = vec(0.5,0.5)
         this.speed = 3
       }
    }

    public update(engine, delta) {

        this.on("collisionstart", (evt)=> {
          if (!this.colliding && evt.other instanceof Player) {
            if (this.type == powerUpType.Speed) {
                this.colliding = true
                evt.other.xp += this.xp
                Resources.coin.play(1)
            } else {
              evt.other.emit("pull", {})
            }
            this.kill() 

          }

          // if (evt.other instanceof PowerUp) {
          //   evt.other.kill()
          //   this.xp+=evt.other.xp
          // }
        })

        if (this.scene instanceof MainScene && this.scene.pointerDown) {
          this.angle = this.scene.angle
          this.pos.x += Math.cos(this.angle)*this.speed
          this.pos.y += Math.sin(this.angle)*this.speed
          
        }
      
        if (!this.moving) {
          if (
            engine.input.keyboard.isHeld(Input.Keys.W) ||
            engine.input.keyboard.isHeld(Input.Keys.Up)
          ) {
            this.pos.y +=this.speed;
      
          }
      
          if (
            engine.input.keyboard.isHeld(Input.Keys.S) ||
            engine.input.keyboard.isHeld(Input.Keys.Down)
          ) {
            this.pos.y -=this.speed;
        
          }
      
          if (
            engine.input.keyboard.isHeld(Input.Keys.A) ||
            engine.input.keyboard.isHeld(Input.Keys.Left)
          ) {
            this.pos.x +=this.speed;
         
      
          }
      
          if (
            engine.input.keyboard.isHeld(Input.Keys.D) ||
            engine.input.keyboard.isHeld(Input.Keys.Right)
          ) {
            this.pos.x -=this.speed;
            
      
          }
        }
        }

}