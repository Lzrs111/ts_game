import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource, Sprite, Vector } from 'excalibur';
import { Resources } from '../../resources';
import { MainScene } from '../../scenes/level-one/mainscene';

export class Tile extends Actor {
    private _sprite: Sprite
    public offset = 1
    private tilesInRow
    private tilesInColumn
    public movementVector = Vector.Zero
    public moving = false
    public angle
    constructor(x,y) {
        super({pos: vec(x,y), z: 0, anchor: vec(0,0)})
    }



    onInitialize(_engine: Engine): void {
      
      this._sprite = Resources.bg8.toSprite()
      this.graphics.use(this._sprite)  


      // _engine.input.pointers.on("down", (evt) => {
      //   let coords = evt.coordinates
      //   let vect = vec(coords.screenPos.x,coords.screenPos.y).normalize()
  
      //   this.moving = true
  
      //   this.logger.info(coords.screenPos,vect)
  
  
      //   if (coords.screenPos.x < _engine.canvasWidth/2) {
      //     this.movementVector.x = this._speed*((vect.x)) 
      //   } else {
      //     this.movementVector.x = -(this._speed*((vect.x)))
      //   }
  
      //   if (coords.screenPos.y < _engine.canvasHeight/2) {
      //     this.movementVector.y = this.speed*((vect.y)) 
      //   } else {
      //     this.movementVector.y = -(this.speed*((vect.y)))
      //   }
      
      // })

      // _engine.input.pointers.on("move",(evt)=> {

      //   if (this.moving) {
      //   let coords = evt.coordinates
      //   let vect = vec(coords.screenPos.x,coords.screenPos.y).normalize()
  
      //   this.moving = true
  
      //   this.logger.info(coords.screenPos,vect)
  
  
      //   if (coords.screenPos.x < _engine.canvasWidth/2) {
      //     this.movementVector.x = this._speed*((vect.x)) 
      //   } else {
      //     this.movementVector.x = -(this._speed*((vect.x)))
      //   }
  
      //   if (coords.screenPos.y < _engine.canvasHeight/2) {
      //     this.movementVector.y = this._speed*((vect.y)) 
      //   } else {
      //     this.movementVector.y = -(this._speed*((vect.y)))
      //   }
      // }
      // })
  
      // _engine.input.pointers.on("up",()=> {
      //   this.moving = false
      // })
  
    }

    static  getRandomProperty(obj): ImageSource {
        const values:ImageSource[] = Object.values(obj);
        return values[Math.floor(Math.random()*(14-14)+14)];
    
      } 

      public get speed() {
        return this.offset
      }

      public update(engine, delta) {

        if (this.moving) {
          this.pos.x += Math.cos(this.angle)*this.offset
          this.pos.y += Math.sin(this.angle)*this.offset
          
        }
        
    

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