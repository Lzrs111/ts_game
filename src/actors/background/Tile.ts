import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource, Sprite } from 'excalibur';
import { Resources } from '../../resources';

export class Tile extends Actor {
    private _sprite: Sprite
    private speed = 1
    constructor(x,y) {
        super({pos: vec(x,y), z: 0, anchor: vec(0,0)})
    }



    onInitialize(_engine: Engine): void {
      this._sprite = Tile.getRandomProperty(Resources).toSprite()
      this.graphics.use(this._sprite)  
    }

    static  getRandomProperty(obj): ImageSource {
        const values:ImageSource[] = Object.values(obj);
        return values[Math.floor(Math.random()*(17-17)+17)];
    
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