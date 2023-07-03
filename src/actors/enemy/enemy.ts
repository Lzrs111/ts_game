import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource,Label, Font, FontUnit, ParticleEmitter, EmitterType } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import { Player } from '../player/player';
import { images } from './enemyImages';



export class Enemy extends Actor {

  private target: Player;  
  private image: ImageSource;
  public alternate: ImageSource;
  public usingMainImage: boolean = true
  public speed: number = 3
  public hp: number = 20
  public damage: number = 10
  constructor(x:number,y:number,target: Player) {  

    

    let images = Enemy.getRandomImage()
    super({
      pos: vec(x,y),
      height: images[0].height,
      width: images[0].width,
      color: new Color(255, 255, 255),
      collisionType:CollisionType.Active,
      z: 3,
      name: "enemy"
    });
    this.target = target
    this.image = images[0]
    this.alternate = images[1]
 
  }


  static  getRandomImage(): ImageSource[] {
    const keys = Object.keys(images)
    let random = Math.floor(Math.random() *5)
    return [images[random].main,images[random].alternate]

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

  public takeDamage(damage: number): void {
    Resources.hit.play(0.1)
    this.hp -=damage
   

    let damageLabel = new Label({
      text: damage.toString(),
      pos: this.pos,
      font: new Font({
          family: 'impact',
          size: 24,
          unit: FontUnit.Px,
          color: Color.Red
      }),
      z:15})
      
      //this.addChild(damageLabel)
      this.scene.add(damageLabel)
      damageLabel.actions.moveBy(vec(0,-50),100).die()

      if (this.hp <= 0) {
        this.switchImage()
        this.scene.engine.clock.schedule(() => {this.kill()},100)
      } else {
        this.switchImage()
        this.scene.engine.clock.schedule(() => {this.switchImage()},500) 
      }


  }

  public switchImage() {
    if (this.usingMainImage) {
      this.usingMainImage = false
      this.graphics.use(this.alternate.toSprite())
    } else {
      this.usingMainImage = true
      this.graphics.use(this.image.toSprite())
    }
  }

}