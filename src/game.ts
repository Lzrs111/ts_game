import {Engine, Actor, DisplayMode, Loader, Logger, Timer, TimerOptions,vec, Sound, ImageSource, Label, Font, FontUnit} from "excalibur"
import { Resources } from "./resources";
import { Player } from "./actors/player/player";
import { Enemy } from "./actors/enemy/enemy";
import { Tile } from "./actors/background/Tile";
import { PowerUp } from "./actors/powerup/powerup";

export class Game extends Engine {


    private player: Player;
    private _enemy: Enemy;
    private _enemies: Enemy[] = [];
    private _tiles: Tile[] = [];
    private _numOfEnemies = 200;
    private xpLabel = new Label({
        text: 'Some text',
        pos: vec(100, 100),
        font: new Font({
            family: 'impact',
            size: 24,
            unit: FontUnit.Px
        })
    });
    private edgeX =  Math.ceil((this.canvasWidth+2048)/512)              
    private edgeY =  Math.ceil((this.canvasHeight+2048)/512)
    private powerUp
    private shotTimer: Timer
    constructor() {
    super({displayMode: DisplayMode.FillScreen, suppressHiDPIScaling: true, maxFps: 60});

    }

    public start() {

        this.createBackground()
        this.add(this.xpLabel)
        const loader = new Loader(Object.values(Resources))

    // 
    //     this.input.pointers.on("move",(evt)=> {
    //         if (evt.screenPos.x > this.halfCanvasWidth) {
    //             this._enemies.forEach(enemy => {
    //                 enemy.pos.x-=enemy.speed
    //             })
    //         }  else if (evt.screenPos.x < this.halfCanvasWidth) {
    //             this._enemies.forEach(enemy => {
    //                 enemy.pos.x+=enemy.speed
    //             })
    //     }

    //     if (evt.screenPos.y > this.halfCanvasHeight) {
    //         this._enemies.forEach(enemy => {
    //             enemy.pos.y-=enemy.speed
    //         })
    //     }  else if (evt.screenPos.y < this.halfCanvasWidth) {
    //         this._enemies.forEach(enemy => {
    //             enemy.pos.y+=enemy.speed
    //         })
    // }

        
    //     })

        return super.start(loader)
    }

    public createPlayer() {
        this.player = new Player(this.halfCanvasWidth,this.halfCanvasHeight)
        this.add(this.player)
    }

    
    //we want the player to automatically shoot projectiles in a certain interval
    public createShotTimer() {
        if (this.shotTimer) {
            this.shotTimer.stop()
            this.shotTimer.interval = this.player._shotspeed
            this.shotTimer.start()
            Logger.getInstance().info(this.shotTimer)

        } else {
        this.shotTimer = new Timer({repeats:true,fcn: ()=> {
            this.player.shoot(1)
            this.player.projectiles.forEach(projectile => {
                this.add(projectile)
            })
        },interval:this.player._shotspeed})
        this.add(this.shotTimer)
        this.shotTimer.start()
        
    
    }
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


        this.player.on("collisionstart",(evt)=> {
            if (evt.other.name == "power") {
                evt.other.kill()
                this.player._shotspeed = 100;
                this.createShotTimer()
            }
        })

     
      
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
        let y: number = -1024
        for (let i = 0; i < this.edgeY; i++) {
            x = -2048
            for (let j = 0; j < this.edgeX ; j++) {
                let tile = new Tile(x,y, this.edgeX,this.edgeY)
                Logger.getInstance().info(x,y)
                this._tiles.push(tile)
                this.add(tile)
                x+=512
            }   
            y+=512         
        }
        
    }

    public createPower() {
        this.powerUp = new PowerUp(this.halfCanvasWidth+200,this.halfCanvasHeight+200)
        this.add(this.powerUp)
    }
}