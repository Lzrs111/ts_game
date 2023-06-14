import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import { Player } from '../player/player';

export class Enemy extends Actor {

  private target: Player;  
  private image: ImageSource;
  constructor(x:number,y:number,target: Player) {  
    let image = Enemy.getRandomProperty(Resources);
    super({
      pos: vec(x,y),
      height: image.height,
      width: image.width,
      color: new Color(255, 255, 255),
      collisionType:CollisionType.Passive
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
}