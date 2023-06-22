import {Engine, Actor, DisplayMode, Loader, Logger, Timer, TimerOptions,vec, Sound, ImageSource, Label, Font, FontUnit, Color,Scene, Input} from "excalibur"
import { Resources } from "../../resources";
import { Player } from "../../actors/player/player";
import { Enemy } from "../../actors/enemy/enemy";
import { Tile } from "../../actors/background/Tile";
import { PowerUp } from "../../actors/powerup/powerup";
import { Direction } from "../../actors/player/direction";

export class MainScene extends Scene {


    private player: Player;
    private _enemy: Enemy;
    private _enemies: Enemy[] = [];
    private _tiles: Tile[] = [];
    private _numOfEnemies = 20
    private xpLabel = new Label({
        text: 'Some text',
        pos: vec(100, 100),
        font: new Font({
            family: 'impact',
            size: 24,
            unit: FontUnit.Px
        })
    });

    private levelLabel = new Label({
        text: 'Some text',
        pos: vec(300, 300),
        font: new Font({
            family: 'impact',
            size: 24,
            unit: FontUnit.Px,
            color: Color.Black
        })
    });
    private edgeX;          
    private edgeY;
    private powerUp
    private shotTimer: Timer
    constructor() {
        super()
    }

    public onInitialize() {

        this.edgeX =  Math.ceil((this.engine.canvasWidth+2048)/512)              
        this.edgeY =  Math.ceil((this.engine.canvasHeight+2048)/512)

        this.add(this.xpLabel)
        this.add(this.levelLabel)
        this.createBackground()
        this.createPlayer()
        this.createShotTimer()
        this.createEnemies()
        this.createEnemyTimer()
        

    

        
    }

    public createPlayer() {
        this.player = new Player(this.engine.halfCanvasWidth,this.engine.halfCanvasHeight)
        this.add(this.player)
    }

    
    //we want the player to automatically shoot projectiles in a certain interval
    public createShotTimer() {
        if (this.shotTimer) {
            this.shotTimer.stop()
            this.shotTimer.interval = this.player._shotspeed
            this.shotTimer.start()

        } else {
        this.shotTimer = new Timer({repeats:true,fcn: ()=> {
            this.player.shoot(this)
           
        },interval:this.player._shotspeed})
        this.add(this.shotTimer)
        this.shotTimer.start()
        
    
    }

    }

    public createEnemy() {
        let enemy = new Enemy(this.determineSpawnSide(this.engine.canvasWidth),this.determineSpawnSide(this.engine.canvasHeight),this.player);
        this._enemies.push(enemy) 
        this.add(enemy)   
    }

    public createEnemies() {
        for (let i = 0; i < this.numOfEnemies; i++) {
            this.createEnemy()             
        }
           
    }

    public createEnemyTimer() {
        let timer = new Timer({repeats: true, fcn:()=> {
            this.createEnemy()
        },interval: 10000})
        this.add(timer)
    }

    public onPreUpdate(_engine: Engine, _delta: number): void {
        
        this._enemies.forEach((enemy,index) => {
            if (enemy.isKilled()) {
                this.player.xp = 10
                this.xpLabel.text = this.player.xp.toString()
                this._enemies.splice(index,1)
                this.createEnemy()
                if ((Math.random()*1000 > 100)) {
                    this.createPower(enemy.pos.x, enemy.pos.y)
                }
                if (this.player.checkIflevel()) {
                    this.levelLabel.text = this.player._level.toString()
                }
                
        


            }
        });

        //Logger.getInstance().info(this._enemies)



        this.player.projectiles.forEach((projectile) => {
            projectile._projectiles.forEach((element, index)=> {
                if (element.isKilled() || element.isOffScreen) {
                    projectile._projectiles.splice(index,1)
                }
            })
        });


       this.player.once("timer", (evt)=> {
            Logger.getInstance().info("timer")
            this.createShotTimer()
       })

        
       if (this.engine.input.keyboard.isHeld(Input.Keys.P)) {
        this.engine.goToScene("pause")
       }
     
      
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
                this._tiles.push(tile)
                this.add(tile)
                x+=512
            }   
            y+=512         
        }
        
    }

    public createPower(x,y) {
        // let powerUp = new PowerUp(this.halfCanvasWidth+200,this.halfCanvasHeight+200)
        this.add(new PowerUp(x,y))
    }
}