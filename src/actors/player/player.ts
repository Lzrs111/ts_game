import { Actor, Color, Engine, vec, Input, ImageSource,GraphicsShowOptions, Sprite, Vector, Logger, CollisionType,RotationType, Timer,Scene, ColliderComponent } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import { PowerUp, powerUpType } from '../powerup/powerup';
import { ProjectileWrapper } from '../projectile/projectileWrapper';
import { Ante } from '../projectile/ante';
import { Shuriken } from '../projectile/shuriken';
import { Pause } from '../../scenes/level-one/pause';
import { MainScene } from '../../scenes/level-one/mainscene';
import { levels } from './levels';
import { Enemy } from '../enemy/enemy';
import { weapons } from '../projectile/weaponLevelinfo';
import { BigBlaster } from '../projectile/bigblaster';
import { Bouncy } from '../projectile/bouncy';
import { Armor } from '../projectile/armor';
import { HpRegen } from '../projectile/healthRegen';
import { Boss } from '../enemy/boss';

 export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export class Player extends Actor {
  private _sprite: Sprite;
  private _projectiles: ProjectileWrapper[] = [];
  public xp: number = 0
  public _level: number = 1
  private xpToLevel = levels[this._level] 
  private colliding: boolean = false
  public weapons: any[] = []
  public hp: number = 100
  public damageResist: number = 0
  public hps: number = 0
  public speed: number = 5
  public altControls: boolean = false
  public angle: number = 0
  public direction: Direction
  constructor(x: number,y: number) {
    super({
      pos: vec(x,y),
      width: Resources.giljo.width,
      height: Resources.giljo.height,
      color: new Color(255, 255, 255),
      name: "player",
      z: 2,
      collisionType:CollisionType.Passive
    });
  }

  public update(engine, delta) {

   if (!this.altControls) {
     if (
       engine.input.keyboard.isHeld(Input.Keys.W) ||
       engine.input.keyboard.isHeld(Input.Keys.Up)
     ) {
     
        this.angle = Math.PI/2
        this.updateSprite()
       
     }
 
     if (
       engine.input.keyboard.isHeld(Input.Keys.S) ||
       engine.input.keyboard.isHeld(Input.Keys.Down)
     ) {
        
          this.angle = -Math.PI/2
         this.updateSprite()
 
       
     }
 
     if (
       engine.input.keyboard.isHeld(Input.Keys.A) ||
       engine.input.keyboard.isHeld(Input.Keys.Left)
     ) {
         this.angle = 0
         this.updateSprite()
 
     }
 
     if (
       engine.input.keyboard.isHeld(Input.Keys.D) ||
       engine.input.keyboard.isHeld(Input.Keys.Right)
     ) {
         this.angle = -Math.PI
         this.updateSprite()
    
     }
   } else {

      if (
        engine.input.keyboard.isHeld(Input.Keys.W) ||
        engine.input.keyboard.isHeld(Input.Keys.Up)
      ) {
      
        this.angle = Math.PI/2
        this.updateSprite()
        this.pos.y -=this.speed
        let scene = this.scene as MainScene
  
      }
      if (
        engine.input.keyboard.isHeld(Input.Keys.S) ||
        engine.input.keyboard.isHeld(Input.Keys.Down)
      ) {
          this.angle = -Math.PI/2
          this.updateSprite()    
          this.pos.y +=this.speed


      }

      if (
        engine.input.keyboard.isHeld(Input.Keys.A) ||
        engine.input.keyboard.isHeld(Input.Keys.Left)
      ) {
          this.angle = 0
          this.updateSprite()
          this.pos.x-=this.speed
        // let scene = this.scene as MainScene
  
        // this.logger.info(scene.walls[3].pos)

        // scene.walls.forEach(wall => {
        //   wall.pos.x+=this.speed
        // })

      }

      if (
        engine.input.keyboard.isHeld(Input.Keys.D) ||
        engine.input.keyboard.isHeld(Input.Keys.Right)
      ) {
          this.angle = -Math.PI
          this.updateSprite()
          this.pos.x+=this.speed
        // let scene = this.scene as MainScene

      }

      if (this.scene instanceof MainScene && this.scene.pointerDown) {
        this.pos.x -= Math.cos(this.angle)*this.speed
        this.pos.y -= Math.sin(this.angle)*this.speed
      }

      this.weapons.forEach(element => {        
        element.pos = this.pos 
      })


    


   }
  }
  onInitialize() {
    this._sprite = Resources.giljoR.toSprite()
    this.graphics.use(this._sprite)
    this.weapons.push(new ProjectileWrapper(this.pos.x,this.pos.y,"Blaster",weapons["Blaster"]))
   

    this.weapons.forEach(weapon => {
      this.scene.add(weapon)
    })

    
    
    let scene = this.scene as MainScene
    this.scale = scene.scale


    this.on("collisionstart",(evt)=> {
          
      if (!this.colliding) {
      this.colliding = true
      if (evt.other instanceof Enemy || evt.other instanceof Boss) {
        this.takeDamage(evt.other.damage)
       }     
      }
     })
    this.on("collisionend", ()=> {
      this.colliding = false
    })


  }
 
  public altControl() {
    this.altControls = true

    this.weapons.forEach(weapon => {
      try {
        weapon.altControls = true
      } catch (error) {
        
      }
    })
  }
  
  public get projectiles(): ProjectileWrapper[] {
    return this._projectiles
  }




  public updateSprite() {
    if (0 <= this.angle && this.angle < Math.PI/4 || (this.angle >= -Math.PI/4 && this.angle < Math.PI/4)) {
      this._sprite = Resources.giljoL.toSprite()
      this.direction = Direction.Left
    } else if (this.angle >= Math.PI/4 && this.angle < Math.PI*3/4) {
      this._sprite = Resources.giljo.toSprite()
      this.direction = Direction.Up

    } else if (this.angle >= Math.PI*3/4 && this.angle < Math.PI || (this.angle >= -Math.PI && this.angle < -Math.PI*3/4)) {
      this._sprite = Resources.giljoR.toSprite()
      this.direction = Direction.Right
    }
    else if (this.angle >= -Math.PI*3/4 && this.angle < -Math.PI/4) {
      this._sprite = Resources.giljo.toSprite()
      this.direction = Direction.Down

    }
  this.graphics.use(this._sprite)
  }

  public checkIflevel() {
    if (this.xp >= this.xpToLevel) {
      this._level+=1;
      this.xp = this.xp - this.xpToLevel
      this.updateXpToLevel()
      return true
    }
    return false
  }


  public updateXpToLevel() {
    this.xpToLevel = levels[this._level]
  }


  public addWeapon(weapon) {
    this.weapons.push(weapon)

    if (weapon instanceof Armor) {
      this.damageResist = weapon.damageResist
    }
    this.scene.add(weapon)
    
    
  }

  public xpPercentage() {
    return (this.xp/this.xpToLevel)*100
  }

  public takeDamage(damage) {
    this.actions.blink(50,50,10)
    this.hp -=damage - this.damageResist
  }

  public godMode() {
    this.addWeapon(new Ante(this.pos.x,this.pos.y,"Ante"))
    this.addWeapon(new BigBlaster(this.pos.x,this.pos.y))
    this.addWeapon(new Bouncy(this.pos.x,this.pos.y))
    this.addWeapon(new HpRegen())
    this.addWeapon(new Shuriken(this.pos.x,this.pos.y))
    this.addWeapon(new Armor())

    this.weapons.forEach(weapon => {
      for (let i = 1; i < 5; i++) {
        weapon.levelUp()  
      }
    })
  }


  

 

}
  

