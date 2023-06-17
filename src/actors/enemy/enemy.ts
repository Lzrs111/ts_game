import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import { Player } from '../player/player';

export class Enemy extends Actor {

  private target: Player;  
  private image: ImageSource;
  public speed: number = 5
  constructor(x:number,y:number,target: Player) {  
    let image = Enemy.getRandomProperty(Resources);
    super({
      pos: vec(x,y),
      height: image.height,
      width: image.width,
      color: new Color(255, 255, 255),
      collisionType:CollisionType.Passive,
      z: 1,
      name: "enemy"
    });
    this.target = target
    this.image = image
 
  }


  static  getRandomProperty(obj): ImageSource {
    const values:ImageSource[] = Object.values(obj);
    return values[Math.floor(Math.random()*(8-3)+3)];

  }

  
  onInitialize() {
     this.graphics.use(this.image.toSprite());
     this.actions.meet(this.target,100)
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