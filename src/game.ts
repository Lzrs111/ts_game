import {Engine, Actor, DisplayMode, Loader, Logger, Timer, TimerOptions,vec, Sound, ImageSource, Label, Font, FontUnit} from "excalibur"
import { Resources } from "./resources";
import { Player } from "./actors/player/player";
import { Enemy } from "./actors/enemy/enemy";
import { Tile } from "./actors/background/Tile";

export class Game extends Engine {


    private player: Player;
    private _enemy: Enemy;
    private _enemies: Enemy[] = [];
    private _tiles: Tile[] = [];
    private _numOfEnemies = 100;
    private xpLabel = new Label({
        text: 'Some text',
        pos: vec(100, 100),
        font: new Font({
            family: 'impact',
            size: 24,
            unit: FontUnit.Px
        })
    });
    constructor() {
    super({displayMode: DisplayMode.FillScreen, suppressHiDPIScaling: true, maxFps: 60});

    }

    public start() {

        this.createBackground()
        this.add(this.xpLabel)
        const loader = new Loader(Object.values(Resources))
        return super.start(loader)
    }

    public createPlayer() {
        this.player = new Player(this.halfCanvasWidth,this.halfCanvasHeight)
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
        let enemy = new Enemy(this.determineSpawnSide(this.canvasWidth),this.determineSpawnSide(this.canvasHeight),this.player);
        this._enemies.push(enemy) 
        this.add(enemy)   
    }

    public createEnemies() {
        for (let i = 0; i < this.numOfEnemies; i++) {
            this.createEnemy()             
        }

        // Logger.getInstance().info(this.player.projectiles)
           
    }

    public onPreUpdate(_engine: Engine, _delta: number): void {
        
        this._enemies.forEach((enemy,index) => {
            if (enemy.isKilled()) {
                this.player.xp = 10
                this.xpLabel.text = this.player.xp.toString()
                this._enemies.splice(index,1)
                this.createEnemy()            

            }
        });

        //Logger.getInstance().info(this._enemies)



        this.player.projectiles.forEach((projectile,index) => {
            if (projectile.isKilled() || projectile.isOffScreen) {
                this.player.projectiles.splice(index,1)
            }
        });

        this._tiles.forEach((tile,ind) => {
            if ((tile.pos.x < -512 || tile.pos.x > this.canvasWidth + 512) || (tile.pos.y < -512 || tile.pos.y > this.canvasHeight + 512)) {
                Logger.getInstance().info("deleting tile", tile.pos)
                tile.kill()
                this._tiles.splice(ind,1)           
            }
        })

    // Logger.getInstance().info(this.player.projectiles)
    }


    public get numOfEnemies() {
        return this._numOfEnemies
    }

    public determineSpawnSide(dimension) {
        if (Math.random() > 0.5) {
            return Math.floor(Math.random() * (dimension + 1000 - dimension + 1)) + dimension;
    } else {
        return Math.floor(Math.random() * (dimension - dimension-1000 + 1)) + dimension-1000;
    }

   

}
    public createBackground() {
        let x:number = 0
        let y: number = -512
        for (let i = 0; i < Math.ceil((this.canvasHeight+512)/512); i++) {
            x = -512
            for (let j = 0; j < Math.ceil((this.canvasWidth+512)/512); j++) {
                let tile = new Tile(x,y)
                Logger.getInstance().info(x,y)
                this._tiles.push(tile)
                this.add(tile)
                x+=512
            }   
            y+=512         
        }
        
    }
}