import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource, Sprite } from 'excalibur';
import { Resources } from '../../resources';


 export enum powerUpType {
  Speed,
  Projectile,
  Floater

}

export class PowerUp extends Actor { 
    private image: ImageSource;
    private speed: number = 5;
    private type: powerUpType
    constructor(x:number,y:number) {  
      let type = PowerUp.determineType()
      let image = PowerUp.imageType(type)
      super({
        pos: vec(x,y),
        height: image.height,
        width: image.width,
        color: new Color(255, 255, 255),
        collisionType:CollisionType.Active,
        z: 1,
        name: PowerUp.setName(type)
      });
      this.image = image
      this.type = type
   
    }
  
  
    static  getRandomProperty(obj): ImageSource {
      const values:ImageSource[] = Object.values(obj);
      return values[Math.floor(Math.random()*+18)];
  
    }

    static determineType() {
      let temp = Math.random()

      if (temp <0.3) {
        return powerUpType.Floater
      } else if (temp >= 0.3 && temp< 0.6) {
        return powerUpType.Projectile
      } else {
        return powerUpType.Speed
      }
    }

    static imageType(type: powerUpType) {

      if (type == powerUpType.Floater) {
        return Resources.ante
      } else if (type == powerUpType.Projectile ) {
        return Resources.cat
      } else {
        return Resources.powerUp_speed
      }
    }

    static setName(type) {
      if (type == powerUpType.Floater) {
        return "floater"
      } else if (type == powerUpType.Projectile ) {
        return "projectile"
      } else {
        return "speed"
      }
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