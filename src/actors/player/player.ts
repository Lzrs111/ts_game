import { Actor, Color, Engine, vec, Input, ImageSource,GraphicsShowOptions, Sprite, Vector, Logger, CollisionType,RotationType, Timer,Scene } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import {Direction} from "./direction"
import { PowerUp, powerUpType } from '../powerup/powerup';
import { ProjectileWrapper } from '../projectile/projectileWrapper';
import { Ante } from '../projectile/ante';
import { Shuriken } from '../projectile/shuriken';
import { Pause } from '../../scenes/level-one/pause';
import { MainScene } from '../../scenes/level-one/mainscene';
import { levels } from './levels';
import { Enemy } from '../enemy/enemy';
import { HpBar } from './healthBar';

export class Player extends Actor {
  private _sprite: Sprite;
  private _orientation: Direction = Direction.Right
  private _projectiles: ProjectileWrapper[] = [];
  public xp: number = 0
  public _level: number = 1
  private xpToLevel = levels[this._level] 
  private colliding: boolean = false
  public weapons: any[] = []
  public hp: number = 100
  public hpBar: HpBar
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

     this.on("collisionstart",(evt)=> {
          
      if (!this.colliding) {
      this.colliding = true
      if (evt.other instanceof Enemy) {
        this.actions.blink(50,50,10)
        this.takeDamage(evt.other.damage)
       }     
      }
     })
    this.on("collisionend", ()=> {
      this.colliding = false
    })
             


    if (
      engine.input.keyboard.isHeld(Input.Keys.W) ||
      engine.input.keyboard.isHeld(Input.Keys.Up)
    ) {
      if (this.orientation != Direction.Up) {
        this.orientation = Direction.Up
        this.updateSprite()

      }
    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.S) ||
      engine.input.keyboard.isHeld(Input.Keys.Down)
    ) {
      if (this.orientation != Direction.Down) {
        this.orientation = Direction.Down
        this.updateSprite()

      }
    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.A) ||
      engine.input.keyboard.isHeld(Input.Keys.Left)
    ) {
      if (this.orientation != Direction.Left) {
        this.orientation = Direction.Left
        this.updateSprite()

      }

    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.D) ||
      engine.input.keyboard.isHeld(Input.Keys.Right)
    ) {
      this.graphics.use(this._sprite)
      if (this.orientation != Direction.Right) {
        this.orientation = Direction.Right
        this.updateSprite()
      }

    }

    this.weapons.forEach(element => {
      if (element instanceof ProjectileWrapper)
      element._orientation = this._orientation
    })

   
  }
  onInitialize() {
    this._sprite = Resources.giljoR.toSprite()
    this.graphics.use(this._sprite)
    // this.weapons.push(new ProjectileWrapper(this.orientation,this.pos.x,this.pos.y,this.scene))
    // this.scene.add(this.weapons[0])

    // this.weapons.push(new Shuriken(this.pos.x,this.pos.y))
    // this.weapons.push(new Ante(this.pos.x,this.pos.y))
    Logger.getInstance().info(this.pos.x,this.pos.y)
    this.weapons.push(new ProjectileWrapper(this._orientation,this.pos.x,this.pos.y))
    this.weapons.forEach(weapon => {
      this.scene.add(weapon)
    })

    this.hpBar = new HpBar
    this.addChild(this.hpBar)

  }
 
  
  
  public get projectiles(): ProjectileWrapper[] {
    return this._projectiles
  }

  public set orientation(orient: Direction) {
    this._orientation = orient
  }

  public get orientation() {
    return this._orientation
  }



  public updateSprite() {
    
    
    switch (this._orientation) {
      case Direction.Up:
      case Direction.Down:
        this._sprite = Resources.giljo.toSprite()
        break
      case Direction.Left:
        this._sprite = Resources.giljoL.toSprite()
        break
      case Direction.Right:
        this._sprite =  Resources.giljoR.toSprite()
        break
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
    this.scene.add(weapon)
    
  }

  public xpPercentage() {
    return (this.xp/this.xpToLevel)*100
  }

  public takeDamage(damage) {
    this.hp -=damage
    this.hpBar.currentHp = this.hp
  }


  

 

}
  

