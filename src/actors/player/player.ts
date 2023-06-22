import { Actor, Color, Engine, vec, Input, ImageSource,GraphicsShowOptions, Sprite, Vector, Logger, CollisionType,RotationType, Timer,Scene } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import {Direction} from "./direction"
import { Weapon } from '../weapon/weapon';
import { PowerUp, powerUpType } from '../powerup/powerup';
import { ProjectileWrapper } from '../projectile/projectileWrapper';
import { Ante } from '../projectile/ante';

export class Player extends Actor {
  private _sprite: Sprite;
  private _orientation: Direction = Direction.Right
  private _numOfProjectiles: number = 1
  private _projectiles: ProjectileWrapper[] = [];
  private _projectileSpeed: number = 1000;
  public _shotspeed: number = 500;
  public weapons: any[] = [];
  private _xp: number = 0
  public _level: number = 1
  private xpToLevel =  50
  private colliding: boolean = false
  constructor(x: number,y: number) {
    super({
      pos: vec(x,y),
      width: Resources.giljo.width,
      height: Resources.giljo.height,
      color: new Color(255, 255, 255),
      name: "player",
      z: 1,
      collisionType:CollisionType.Passive
    });
  }


  public get xp() {
    return this._xp
  }

  public set xp(num: number) {
    this._xp +=num 
  }

  


  public update(engine, delta) {

     this.on("collisionstart",(evt)=> {
            if (!this.colliding && evt.other instanceof PowerUp) {
              this.colliding = true
              evt.other.kill();


              if (evt.other.name == "speed") {
              this._shotspeed -= this._shotspeed*0.1
              this.emit("timer",{})
              
              }else if (evt.other.name == "projectile") {
                if (this._numOfProjectiles <3) {
                  this._numOfProjectiles +=1
                }
              } else if (evt.other.name == "floater") {
                let temp = new Ante(engine.halfCanvasWidth,engine.halfCanvasHeight+200)
                engine.add(temp)
                temp.moveTimer = new Timer({repeats: true, fcn: ()=> {
                  temp.move()
              }, interval: temp.timerInterval})
              engine.add(temp.moveTimer)
              temp.moveTimer.start()
              }

              else if (evt.other.name == "enemy")
                this.actions.blink(50,50,10)
            }})

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

   
  }
  onInitialize() {
    this._sprite = Resources.giljoR.toSprite()
    this.graphics.use(this._sprite)
  }
  
  



  public shoot(scene: Scene) {
    let temp = new ProjectileWrapper(this._orientation,this._numOfProjectiles,this.pos.x,this.pos.y)
    temp.makeProjectile()
    this.projectiles.push(temp)
    this.projectiles.forEach(element => {
      element._projectiles.forEach(projectile => {
        scene.add(projectile)
      })
    })
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

  // public flip() {
  //   this._sprite.flipHorizontal = !this._sprite.flipHorizontal
  //   this.graphics.use(this._sprite)
  // }

  // public determineProjectileOrientation():Vector {

  //   switch (this._orientation) {
  //     case Direction.Up:
  //       return vec(0,-this._projectileSpeed)
  //     case Direction.Down:
  //       return vec(0,this._projectileSpeed)
  //     case Direction.Left:
  //       return vec(-this._projectileSpeed,0)
  //     case Direction.Right:
  //       return vec(this._projectileSpeed,0)
  //     default:
  //   }

  // }

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
    if (this.xp == this.xpToLevel) {
      this._level+=1;
      this.updateXpToLevel()
      return true
    }
    return false
  }


  public updateXpToLevel() {
    this.xpToLevel = this.xpToLevel * ((1-Math.pow(2,this._level))/(1-2))
  }


  public addWeapon(weapon) {
    weapon.createShotTimer()
    this.weapons.push(weapon)
  }

  public shootW() {
    this.weapons.forEach(weapon => {

    })
  }
  

 

}
  

