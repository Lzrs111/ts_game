import { Actor,CollisionType,Engine,Vector,vec,Logger } from "excalibur";
import { Resources } from "../../resources";
import { Projectile } from "./projectile";
import { Direction } from "../player/direction";

export class ProjectileWrapper {
    
    public _projectiles: Projectile[] = [];
    private x: number
    private y: number
    private _orientation: Direction = Direction.Right
    private _numOfProjectiles
    constructor(orientation, number, x,y) {
        this._orientation = orientation
        this.x = x
        this.y = y
        this._numOfProjectiles = number
    }

    public makeProjectile() {
        let first;
        let second;
        let third;
        if (this._orientation == Direction.Down) {
           
            switch (this._numOfProjectiles) {
                case 1:
                default:
                    first = new Projectile(vec(0,1000),this.x,this.y)
                    this._projectiles.push(first)
                break;

                case 2:
                    first = new Projectile(vec(0,1000),this.x+30,this.y+30)
                    second = new Projectile(vec(0,1000),this.x-30,this.y-30)
                    this._projectiles.push(first)
                    this._projectiles.push(second)

                break;
                
                case 3:
                    first = new Projectile(vec(0,1000),this.x,this.y)
                    second = new Projectile(vec(1000,1000),this.x,this.y)
                    third = new Projectile(vec(-1000,1000),this.x,this.y)
                    this._projectiles.push(first)
                    this._projectiles.push(second)
                    this._projectiles.push(third)
                break;
            
                
            }

        } else if (this._orientation == Direction.Up) {

                switch (this._numOfProjectiles) {
                    case 1:
                    default:
                        first = new Projectile(vec(0,-1000),this.x,this.y)
                        this._projectiles.push(first)
                    
                    break;

                    case 2:
                        first = new Projectile(vec(0,-1000),this.x+30,this.y+30)
                        second = new Projectile(vec(0,-1000),this.x-30,this.y-30)
                        this._projectiles.push(first)
                        this._projectiles.push(second)
                        
                    break;
                    
                    case 3:
                        first = new Projectile(vec(0,-1000),this.x,this.y)
                        second = new Projectile(vec(1000,-1000),this.x,this.y)
                        third = new Projectile(vec(-1000,-1000),this.x,this.y)
                        this._projectiles.push(first)
                        this._projectiles.push(second)
                        this._projectiles.push(third)
                    break;
                }


        }else if (this._orientation == Direction.Right) {

            switch (this._numOfProjectiles) {
                case 1:
                default:
                    first = new Projectile(vec(1000,0),this.x,this.y)
                    this._projectiles.push(first)
                        
                break;

                case 2:
                    first = new Projectile(vec(1000,0),this.x+30,this.y+30)
                    second = new Projectile(vec(1000,0),this.x-30,this.y-30)
                    this._projectiles.push(first)
                    this._projectiles.push(second)
                break;
                
                case 3:
                    first = new Projectile(vec(1000,0),this.x,this.y)
                    second = new Projectile(vec(1000,1000),this.x,this.y)
                    third = new Projectile(vec(1000,-1000),this.x,this.y)
                    this._projectiles.push(first)
                    this._projectiles.push(second)
                    this._projectiles.push(third)
                break;
            }
            
        }else if (this._orientation == Direction.Left) {
            switch (this._numOfProjectiles) {
                case 1:
                default:
                    first = new Projectile(vec(-1000,0),this.x,this.y)
                    this._projectiles.push(first)
                    
                break;

                case 2:
                    first = new Projectile(vec(-1000,0),this.x+30,this.y+30)
                    second = new Projectile(vec(-1000,0),this.x-30,this.y-30)
                    this._projectiles.push(first)
                    this._projectiles.push(second)
                break;
                
                case 3:
                    first = new Projectile(vec(-1000,0),this.x,this.y)
                    second = new Projectile(vec(-1000,1000),this.x,this.y)
                    third = new Projectile(vec(-1000,-1000),this.x,this.y)
                    this._projectiles.push(first)
                    this._projectiles.push(second)
                    this._projectiles.push(third)
                break;
            }
        }


    }


}