import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource, Sprite } from 'excalibur';
import { Resources } from '../../resources';

export class Tile extends Actor {
    private _sprite: Sprite
    private _speed = 1
    private tilesInRow
    private tilesInColumn
    constructor(x,y,tilesInRow,tilesInColumn) {
        super({pos: vec(x,y), z: 0, anchor: vec(0,0)})
        this.tilesInRow = tilesInRow
        this.tilesInColumn = tilesInColumn
    }



    onInitialize(_engine: Engine): void {
      
      this._sprite = Resources.bg8.toSprite()
      this.graphics.use(this._sprite)  
    }

    static  getRandomProperty(obj): ImageSource {
        const values:ImageSource[] = Object.values(obj);
        return values[Math.floor(Math.random()*(14-14)+14)];
    
      } 

      public get speed() {
        return this._speed
      }

      public update(engine, delta) {
        if (
          engine.input.keyboard.isHeld(Input.Keys.W) ||
          engine.input.keyboard.isHeld(Input.Keys.Up)
        ) {
          this.pos.y +=this.speed;
          if (this.pos.y > (this.tilesInColumn/2)*512) {
            this.pos.y = -((this.tilesInColumn/2)*512) - this.speed
          }
        }
    
        if (
          engine.input.keyboard.isHeld(Input.Keys.S) ||
          engine.input.keyboard.isHeld(Input.Keys.Down)
        ) {
          this.pos.y -=this.speed;
          if (this.pos.y < -1024) {
            this.pos.y = ((this.tilesInColumn/2)*512) - this.speed
          }
        }
    
        if (
          engine.input.keyboard.isHeld(Input.Keys.A) ||
          engine.input.keyboard.isHeld(Input.Keys.Left)
        ) {
          this.pos.x +=this.speed;
          if (this.pos.x > (this.tilesInRow/2)*512) {
            this.pos.x = -((this.tilesInRow/2)*512) - this.speed
          }      
    
        }
    
        if (
          engine.input.keyboard.isHeld(Input.Keys.D) ||
          engine.input.keyboard.isHeld(Input.Keys.Right)
        ) {
          this.pos.x -=this.speed;
          if (this.pos.x < -2048) {
            this.pos.x = ((this.tilesInRow/2)*512) - this.speed
          }
          
    
        }
      }
}