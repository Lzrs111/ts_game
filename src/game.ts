import {Engine, Actor, DisplayMode, Loader, Logger, Timer, TimerOptions,vec, Sound} from "excalibur"
import { Resources } from "./resources";
import { Player } from "./actors/player/player";
import { Enemy } from "./actors/enemy/enemy";

export class Game extends Engine {


    private player: Player;
    private _enemy: Enemy;
    private _enemies: Enemy[] = [];
    private _numOfEnemies = 20;
    constructor() {
    super({displayMode: DisplayMode.FillScreen, suppressHiDPIScaling: true, maxFps: 60});


    

    }

    public start() {

        //game initialization functions
        this.createPlayer();
        this.createShotTimer();
        this.createEnemy()

        const loader = new Loader(Object.values(Resources))
        return super.start(loader)
    }

    public createPlayer() {
        this.player = new Player(200,200)
        this.add(this.player)
    }

    
    //we want the player to automatically shoot projectiles in a certain interval
    public createShotTimer() {
        const shotTimer = new Timer({repeats:true,fcn: ()=> {
            this.player.shoot(1)
            this.player.projectiles.forEach(projectile => {
                this.add(projectile)
            })
        },interval:this.player._shotspeed})
        this.add(shotTimer)
        shotTimer.start()
    }

    public createEnemy() {
        for (let i = 0; i < this.numOfEnemies; i++) {
            //let random = Math.floor(Math.random() * (this.halfCanvasHeight - 1)) + 0;
            let enemy = new Enemy(this.canvasWidth*(Math.random()),this.canvasHeight*(Math.random()),this.player);
            Logger.getInstance().info(enemy)
            this._enemies.push(enemy) 
            this.add(enemy)                 
        }

        Logger.getInstance().info(this.player.projectiles)
           
    }

    public onPreUpdate(_engine: Engine, _delta: number): void {
        
        this._enemies.forEach((enemy,index) => {
            if (enemy.isKilled()) {
                this._enemies.splice(index,1)
            }
        });

        //Logger.getInstance().info(this._enemies)



        this.player.projectiles.forEach((projectile,index) => {
            if (projectile.isKilled() || projectile.isOffScreen) {
                this.player.projectiles.splice(index,1)
            }
        });

    Logger.getInstance().info(this.player.projectiles)
    }


    public get numOfEnemies() {
        return this._numOfEnemies
    }


}