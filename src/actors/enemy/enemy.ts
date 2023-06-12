import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import { Player } from '../player/player';

export class Enemy extends Actor {

  private target: Player;  
  constructor(x:number,y:number,target: Player) {
    super({
      pos: vec(x,y),
      width: 25,
      height: 25,
      color: new Color(255, 255, 255),
      collisionType:CollisionType.Passive
    });
    this.target = target
  }


  public  getRandomProperty(obj): ImageSource {

    const values:ImageSource[] = Object.values(obj);
    return values[Math.floor(Math.random()*(8-3)+3)];

  }

  
  onInitialize() {
    let random = this.getRandomProperty(Resources)
     this.graphics.use(random.toSprite());
     this.actions.meet(this.target,100)
  }
}