import { Actor, Color, Engine, vec, Input, ImageSource,GraphicsShowOptions, Sprite, Vector } from 'excalibur';
import { Resources } from '../../resources';
import { Projectile } from '../projectile/projectile';
import { Game } from '../../game';
import {Direction} from "./direction"
import { Weapon } from '../weapon/weapon';

export class Player extends Actor {
  private _sprite: Sprite;
  private _orientation: Direction = Direction.Right
  private _graphic: ImageSource;
  private _projectiles: Projectile[] = [];
  private _projectileSpeed: number = 1000;
  public _shotspeed: number = 300;
  public weapon: Weapon = new Weapon(vec(100,100))
  private _xp: number = 0
  private _level: number = 1
  constructor(x: number,y: number) {
    super({
      pos: vec(x,y),
      width: Resources.giljo.width,
      height: Resources.giljo.height,
      color: new Color(255, 255, 255),
      name: "player",
      z: 1
    });
  }


  public get xp() {
    return this._xp
  }

  public set xp(num: number) {
    this._xp +=num 
  }

  


  public update(engine, delta) {
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

    if (this.xp % 100 == 0 ) {
      this._shotspeed-=10
    }
  }
  onInitialize() {
    this._sprite = Resources.giljoR.toSprite()
    this.graphics.use(this._sprite)
  }
  



  public shoot(num: number) {
    let first = new Projectile(this.determineProjectileOrientation(),this.pos.x,this.pos.y)
    this.projectiles.push(first)
  }

  public get projectiles() {
    return this._projectiles
  }

  public set orientation(orient: Direction) {
    this._orientation = orient
  }

  // public flip() {
  //   this._sprite.flipHorizontal = !this._sprite.flipHorizontal
  //   this.graphics.use(this._sprite)
  // }

  public determineProjectileOrientation():Vector {

    switch (this._orientation) {
      case Direction.Up:
        return vec(0,-this._projectileSpeed)
      case Direction.Down:
        return vec(0,this._projectileSpeed)
      case Direction.Left:
        return vec(-this._projectileSpeed,0)
      case Direction.Right:
        return vec(this._projectileSpeed,0)
      default:
    }

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

  

 

}
  

