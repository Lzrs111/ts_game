import { Actor, Color, Engine, vec, Input,Logger, CollisionType, ImageSource,Label, Font, FontUnit, ParticleEmitter, EmitterType, Vector, Scene } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import { Player } from '../player/player';
import { MainScene } from '../../scenes/level-one/mainscene';
import { Pause } from '../../scenes/level-one/pause';



export class Enemy extends Actor {

  public target: Player;  
  public image: ImageSource;
  public alternate: ImageSource;
  public usingMainImage: boolean = true
  public speed: number 
  public offset: number = 5
  public hp: number 
  public damage: number 
  public colliding: boolean = false
  public moving: boolean = false
  public movementVector:Vector = Vector.Zero 
  public angle
  public offscreenDistance: number = 25
  constructor(pos: Vector,target: Player,data) {  

    

    super({
      pos: pos,
      height: data.image.height,
      width: data.image.width,
      color: new Color(255, 255, 255),
      collisionType: data.image == Resources.marko ? CollisionType.Passive : CollisionType.Passive,
      z: 3,
      name: "enemy"
    });
    this.target = target
    this.image = data.image
    this.alternate = data.alternate
    this.hp = data.hp
    this.damage = data.damage
    this.speed = data.speed
  }



  
  onInitialize(_engine: Engine) {    
    
    let scene = this.scene as MainScene
    this.scale = scene.scale
    this.offset = scene.mobile ? 3 : 5
    this.speed = scene.mobile ? this.speed*0.3 : this.speed
    this.offscreenDistance = scene.mobile ? 25 : 55

    this.graphics.use(this.image.toSprite());
    this.actions.meet(this.target,this.speed)

    this.on("collisionstart", (evt)=> {
      //
      })

    this.on("collisionend", (evt)=> {
      this.colliding = false
    })


}

  public update(engine, delta) {


    if (this.scene instanceof MainScene && this.scene.pointerDown) {
      this.angle = this.scene.angle
      this.pos.x += Math.cos(this.angle)*this.offset
      this.pos.y += Math.sin(this.angle)*this.offset
      
    }

   
    if (
      engine.input.keyboard.isHeld(Input.Keys.W) ||
      engine.input.keyboard.isHeld(Input.Keys.Up)
    ) {
      this.pos.y +=this.offset;

    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.S) ||
      engine.input.keyboard.isHeld(Input.Keys.Down)
    ) {
      this.pos.y -=this.offset;
  
    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.A) ||
      engine.input.keyboard.isHeld(Input.Keys.Left)
    ) {
      this.pos.x +=this.offset;
   

    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.D) ||
      engine.input.keyboard.isHeld(Input.Keys.Right)
    ) {
      this.pos.x -=this.offset;
    }


    let scene = this.scene as MainScene
    if (this.pos.x > engine.canvasWidth + this.offscreenDistance) {
      this.pos.x = scene.mobile ? -5 : Math.floor(Math.random() * (-this.offscreenDistance+1)) -this.offscreenDistance
    } else if (this.pos.x < -this.offscreenDistance) {
      this.pos.x = scene.mobile ? engine.canvasWidth +5 : Math.floor(Math.random()* engine.canvasWidth) + engine.canvasWidth + this.offscreenDistance
    }

    if (this.pos.y > engine.canvasHeight + this.offscreenDistance) {
      this.pos.y = scene.mobile ? -5 : Math.floor(Math.random() * (-this.offscreenDistance+1)) -this.offscreenDistance
    } else if (this.pos.y < -this.offscreenDistance) {
      this.pos.y = scene.mobile ? engine.canvasHeight+5 : Math.floor(Math.random()* engine.canvasHeight) + engine.canvasHeight + this.offscreenDistance
    }
   

   
  }

  public onPostKill(_scene: MainScene): void {

    this.logger.info(_scene.enemies.length, "BEFORE")
    _scene.enemies = _scene.enemies.filter((val)=> {
      return !val.isKilled()
    })

    
    if (_scene.player._level < 35) {
     _scene.player.xp +=4
     if (_scene.enemies.length < _scene.numOfEnemies) {
      _scene.spawnSingle()
     }
  }

  _scene.weaponBar.killText.text = (parseInt(_scene.weaponBar.killText.text) + 1).toString()

  if (_scene.player.checkIflevel()) {
    _scene.weaponBar.levelText.text = (parseInt(_scene.weaponBar.levelText.text) +1).toString()
    let pause = _scene.engine.scenes["pause"] as Pause      
    pause.mainScene = _scene as MainScene
    _scene.engine.goToScene("pause")
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
          size: this.scale == vec(0.5,0.5) ? 5 : 24,
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