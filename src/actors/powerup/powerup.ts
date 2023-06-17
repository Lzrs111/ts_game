import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource, Sprite } from 'excalibur';
import { Resources } from '../../resources';

export class PowerUp extends Actor { 
    private image: ImageSource;
    private speed: number = 5
    constructor(x:number,y:number) {  
      let image = Resources.powerUp_speed
      super({
        pos: vec(x,y),
        height: image.height,
        width: image.width,
        color: new Color(255, 255, 255),
        collisionType:CollisionType.Active,
        z: 1,
        name: "power"
      });
      this.image = image
   
    }
  
  
    static  getRandomProperty(obj): ImageSource {
      const values:ImageSource[] = Object.values(obj);
      return values[Math.floor(Math.random()*+18)];
  
    }
  
    
    onInitialize() {
       this.graphics.use(this.image.toSprite());
    }

    public update(engine, delta) {
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