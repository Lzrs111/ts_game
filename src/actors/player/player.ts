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
  constructor(x: number,y: number) {
    super({
      pos: vec(x,y),
      width: 25,
      height: 25,
      color: new Color(255, 255, 255),
      name: "player"
    });
  }

  public update(engine, delta) {
    if (
      engine.input.keyboard.isHeld(Input.Keys.W) ||
      engine.input.keyboard.isHeld(Input.Keys.Up)
    ) {
      this.pos.y -=10;
      this.orientation = Direction.Up
    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.S) ||
      engine.input.keyboard.isHeld(Input.Keys.Down)
    ) {
      this.pos.y +=10;
      this.orientation = Direction.Down

    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.A) ||
      engine.input.keyboard.isHeld(Input.Keys.Left)
    ) {
      this.pos.x -=10;
      this._sprite = Resources.giljoL.toSprite()
      this.orientation = Direction.Left

    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.D) ||
      engine.input.keyboard.isHeld(Input.Keys.Right)
    ) {
      this.pos.x +=10;
      this._sprite = Resources.giljoR.toSprite()
      this.orientation = Direction.Right

    }
  }
  onInitialize() {
    this._sprite = Resources.giljoR.toSprite()
    this.graphics.use(this._sprite)
  }


  public shoot(num: number) {
    this.weapon.shoot(this)
  }

  public get projectiles() {
    return this._projectiles
  }

  public set orientation(orient: Direction) {
    this._orientation = orient
  }

  public flip() {
    this._sprite.flipHorizontal = !this._sprite.flipHorizontal
    this.graphics.use(this._sprite)
  }

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

 

}
  

