import {Engine, Actor, DisplayMode, Loader, Logger, Timer, TimerOptions,vec, Sound, ImageSource, Label, Font, FontUnit, Color,Scene, Input, SceneActivationContext, RotationType, ExcaliburGraphicsContext, Particle, CollisionGroup, CollisionGroupManager, Repeat, SystemType, Vector} from "excalibur"
import { Resources } from "../../resources";
import { Player, Direction } from "../../actors/player/player";
import { Enemy } from "../../actors/enemy/enemy";
import { Tile } from "../../actors/background/Tile";
import { PowerUp, powerUpType } from "../../actors/powerup/powerup";
import { Pause } from "./pause";
import { Ante } from "../../actors/projectile/ante";
import { Shuriken } from "../../actors/projectile/shuriken";
//import { Magnet } from "../../actors/projectile/magnet";
import { Weapons, Bar } from "./ui";
import { BigBlaster } from "../../actors/projectile/bigblaster";
import { Bouncy } from "../../actors/projectile/bouncy";
import { enemies,waves } from "../../actors/enemy/enemydata";
import { Armor } from "../../actors/projectile/armor";
import { HpRegen } from "../../actors/projectile/healthRegen";
import { Boss } from "../../actors/enemy/boss";
import { Projectile } from "../../actors/projectile/projectile";



interface LevelUp {
    choice: string,
    equipped: boolean
}

export class MainScene extends Scene {

    public xpBar: Bar
    public hpBar: Bar
    public weaponBar: Weapons
    public player: Player;
    private _enemy: Enemy;
    public enemies: Enemy[] = [];
    private _tiles: Tile[] = [];
    public numOfEnemies = 1
    private edgeX;          
    private edgeY;
    public vortex
    public wave: number = 1
    public powerUps: PowerUp[] = []
    public mobile: boolean = false
    public scale: Vector = vec(1,1)
    public pointerDown: boolean = false
    public waveTimer: Timer
    public enemyTimer: Timer
    public pointerCoords: Vector
    public angle: number
    constructor() {
        super()
    }

    public onInitialize() {

        if (window.innerWidth < 480) {
            this.mobile = true
            this.scale = vec(0.5,0.5)
        }

        // this.edgeX =  Math.ceil((this.engine.canvasWidth+2048)/512)              
        // this.edgeY =  Math.ceil((this.engine.canvasHeight+2048)/512)
        

       
       this.begin()
        
       


        this.engine.input.pointers.on("down",(evt)=> {
            this.pointerDown = true
            this.pointerCoords = evt.coordinates.screenPos
            let coords = evt.coordinates
            this.angle = vec(this.engine.canvasWidth/2 - coords.screenPos.x, this.engine.canvasHeight/2 -coords.screenPos.y).toAngle()
            this.player.angle = vec(this.player.pos.x - coords.screenPos.x, this.player.pos.y -coords.screenPos.y).toAngle()
            this.player.updateSprite() 
            })
    


    this.engine.input.pointers.on("move",(evt)=> {
        let coords = evt.coordinates
         if (this.pointerDown) {
            this.player.angle = vec(this.pointerCoords.x - coords.screenPos.x,this.pointerCoords.y - coords.screenPos.y).toAngle()
            Logger.getInstance().info(vec(this.pointerCoords.x - coords.screenPos.x,this.pointerCoords.y - coords.screenPos.y).toAngle(), "POINTER - SCREEN")
            this.player.updateSprite()
            this.angle = vec(this.pointerCoords.x - coords.screenPos.x,this.pointerCoords.y - coords.screenPos.y).toAngle()
           
        }
})

    this.engine.input.pointers.on("up",(evt)=> {
        this.pointerDown = false
        // this.actors.forEach(actor => {
        //     if (actor instanceof Enemy || actor instanceof Tile || actor instanceof PowerUp) {
        //       actor.moving = false
        //     }})
        })
        }
      

    public createPlayer() {
        this.player = new Player(this.engine.halfCanvasWidth,this.engine.halfCanvasHeight)
        this.add(this.player)
    }


    public createEnemy(pos,data) {
        let enemy = new Enemy(pos,this.player,data);
        this.enemies.push(enemy)
        this.add(enemy)   
    }

    public createEnemies() {

        //let random = Math.random()

        this.spawnRandom()
        
        
    }

    public spawnSingle() {
     
            let numberOfEnemies = 1
            let enemyTypes = Object.keys(waves[this.wave]["enemies"]).length
            let x      
            let y
          
    
            for (let i = 0; i < numberOfEnemies; i++) {
                for (let j = 1; j <= enemyTypes; j++) {
                    if (1 - waves[this.wave]["enemies"][j] < Math.random()) {
                        this.createEnemy(this.determineSpawnSide(),enemies[j])
                    }                
                }
            }
            
            
        }

    

    public spawnSmall() {
            let numberOfEnemies
            let enemyTypes = Object.keys(waves[this.wave]["enemies"]).length
            let x
            let xOffset
            let y
            let yOffset
    
            switch (this.player.direction) {
                case Direction.Up:
                    x = 0
                    y = 0
                    xOffset = Resources.enemy.width+10
                    yOffset = 0
                    numberOfEnemies = this.engine.canvasWidth/xOffset
                    break;
                case Direction.Down:
                    x = 0
                    y = this.engine.canvasHeight
                    xOffset = Resources.enemy.width+10
                    yOffset = 0
                    numberOfEnemies = this.engine.canvasWidth/xOffset
                    break;
                case Direction.Left:
                    x = 0
                    y = 0
                    xOffset = 0
                    yOffset = Resources.enemy.height+10
                    numberOfEnemies =  this.engine.canvasHeight/yOffset
                    break;
                case Direction.Right:
                    x = this.engine.canvasWidth
                    y = 0
                    xOffset = 0
                    yOffset = Resources.enemy.height+10
                    numberOfEnemies =  this.engine.canvasHeight/yOffset
                    break;
            }
          
    
            for (let i = 0; i <= numberOfEnemies; i++) {
                for (let j = 1; j <= enemyTypes; j++) {
                    if (1 - waves[this.wave]["enemies"][j] < Math.random()) {
                        this.createEnemy(vec(x,y),enemies[j])
                        x+=xOffset
                        y+=yOffset
                    }                
                }
            }
    }

    private spawnRandom() {
        let numberOfEnemies = waves[this.wave].numberOfEnemies - this.enemies.length
        if (this.mobile) {
            numberOfEnemies = numberOfEnemies/2
        }
        let enemyTypes = Object.keys(waves[this.wave]["enemies"]).length
        let x      
        let y
      

        for (let i = 0; i <= numberOfEnemies; i++) {
            for (let j = 1; j <= enemyTypes; j++) {
                if (1 - waves[this.wave]["enemies"][j] < Math.random()) {
                    this.createEnemy(this.determineSpawnSide(),enemies[j])
                }                
            }
        }
        
        
    }

    private spawnOnAllSides() {
        let numberOfEnemies = waves[this.wave].numberOfEnemies     
        let enemyCount = 0;
        let sideCount = 0;
        let x = 0;
        let y = 0;
        let xOffset = Resources.enemy.width + 10;
        let yOffset = Resources.enemy.height + 10;
        let enemiesInRow = this.engine.canvasWidth / xOffset;
        let enemiesInColumn = this.engine.canvasHeight / yOffset;

        for (let i = 1; i <= numberOfEnemies; i++) {
            for (let j = 0; j < waves[this.wave]["enemies"][i]; j++) {
                this.createEnemy(this.engine.screenToWorldCoordinates(vec(x,y)),enemies[i]);
                enemyCount++;
                if (sideCount == 0) {
                    if (enemyCount <= enemiesInRow) {
                        x += xOffset;
                    } else {
                        sideCount++;
                        enemyCount = 0;
                    }
                } else if (sideCount == 1) {
                    if (enemyCount <= enemiesInColumn) {
                        y += yOffset;
                    } else {
                        sideCount++;
                        enemyCount = 0;
                    }
                } else if (sideCount == 2) {
                    if (enemyCount <= enemiesInRow) {
                        x -= xOffset;
                    } else {
                        sideCount++;
                        enemyCount = 0;
                    }
                } else if (sideCount == 3) {
                    if (enemyCount <= enemiesInColumn) {
                        y -= yOffset;
                    } else {
                        sideCount++;
                        enemyCount = 0;
                    }
                }
            }
        }
    }

    private spawnDirection() {

        let x
        let xOffset
        let y
        let yOffset
        let numberOfEnemies

        switch (this.player.direction) {
            case Direction.Up:
                x = 0
                y = 0
                xOffset = Resources.enemy.width+10
                yOffset = 0
                numberOfEnemies = this.engine.canvasWidth/xOffset
                break;
            case Direction.Down:
                x = 0
                y = this.engine.canvasHeight
                xOffset = Resources.enemy.width+10
                yOffset = 0
                numberOfEnemies = this.engine.canvasWidth/xOffset
                break;
            case Direction.Left:
                x = 0
                y = 0
                xOffset = 0
                yOffset = Resources.enemy.height+10
                numberOfEnemies =  this.engine.canvasHeight/yOffset
                break;
            case Direction.Right:
                x = this.engine.canvasWidth
                y = 0
                xOffset = 0
                yOffset = Resources.enemy.height+10
                numberOfEnemies =  this.engine.canvasHeight/yOffset
                break;
        }

        for (let i = 0; i < numberOfEnemies; i++) {
            this.createEnemy(this.engine.screenToWorldCoordinates(vec(x,y)),enemies[1])    
            x+=xOffset
            y+=yOffset        
        }
    }

  

    public onActivate(_context: SceneActivationContext<LevelUp>): void {
        if (_context.data) {    
         if (_context.data.equipped) {
            this.player.weapons.forEach(weapon => {
                    if (weapon.name == _context.data.choice) {
                        weapon.levelUp()
                        if (weapon instanceof Armor) {
                            this.player.damageResist = weapon.damageResist
                        }
                    } 
                })
         } else {
           switch (_context.data.choice) {
            case "Ante":
                this.player.addWeapon(new Ante(this.player.pos.x,this.player.pos.y,"Ante"))
                Logger.getInstance().info("Adding Ante")
                break;
            case "Shuriken":
                this.player.addWeapon(new Shuriken(this.player.pos.x,this.player.pos.y))
                Logger.getInstance().info("Adding Shuriken")
                break;
            // case "Magnet":
            //     this.player.addWeapon(new Magnet(this.player.pos.x,this.player.pos.y,"Magnet"))
            //     Logger.getInstance().info("Adding Magnet")
            //     break;
            case "BigBlaster":
                this.player.addWeapon(new BigBlaster(this.player.pos.x,this.player.pos.y))
                Logger.getInstance().info("Adding BigBlast")
                break;
            case "Bouncy":
                this.player.addWeapon(new Bouncy(this.player.pos.x,this.player.pos.y))
                Logger.getInstance().info("Adding Bouncy")
                break;
            case "Armor":
                this.player.addWeapon(new Armor());
                break;
            case "HpRegen":
                this.player.addWeapon(new HpRegen())
                break;
            default:
                break;
           }
         }

        this.weaponBar.updateSlots(this.player.weapons)
        }
    }

    
    public onPreUpdate(_engine: Engine, _delta: number): void {

        let count = 0

        this.actors.forEach(actor => {
            if (actor instanceof Enemy) {
                count++
            }
        })
        
        Logger.getInstance().info(count)

        if (this.player._level == 35) {
            this.actors.forEach(actor => {
                if (actor instanceof Enemy || actor instanceof PowerUp) {
                    actor.kill()
                }
            })

            this.waveTimer.stop()
           // this.enemyTimer.stop()

            
            if (this.enemies.length == 0) {
                this.player._level +=1
                this._tiles.forEach(tile => {
                    tile.offset = 0
                })
                this.player.altControl()

                let playerActions = this.player.actions.easeTo(vec(_engine.canvasWidth*0.9,_engine.halfCanvasHeight),2000).toPromise()
                playerActions.then(() => {
                    Resources.main.stop()
                    Resources.whatis.play(0.5)
                    let boss = new Boss(vec(_engine.halfCanvasWidth,_engine.halfCanvasHeight),this.player)
                    this.enemies = []
                    this.enemies.push(boss)
                    this.add(boss)
                    boss.actions.delay(2000)
                
                }
                )
            }
        }

       if (this.player._level <35 && this.numOfEnemies > this.enemies.length && this.wave < 10) {
            Logger.getInstance().info("calling")
             this.spawnSingle()
       }

        if (_engine.input.keyboard.wasReleased(Input.Keys.B)) {
            _engine.screen.goFullScreen()
        }



        this.xpBar.currentNumber = this.player.xpPercentage()
        this.hpBar.currentNumber = this.player.hp



     
        
        // this.enemies.forEach((enemy,index) => {
   
        //     if (enemy.isKilled()) {
        //         this.weaponBar.killText.text = (parseInt(this.weaponBar.killText.text) + 1).toString()
        //         this.enemies.splice(index,1)
        //         if (this.player._level < 35) {
        //             this.player.xp +=4
        //             this.spawnSingle() 

        //         }
              
        //        // this.createPower(enemy.pos.x, enemy.pos.y)    
        //     } 
        // })



        
        if (_engine.input.keyboard.wasPressed(Input.Keys.P)) {
            let pause = _engine.scenes["pause"] as Pause      
            pause.mainScene = this
            this.engine.goToScene('pause');
          }

        

        // if (this.powerUps.length > 200) {
        //     let x = Math.floor(Math.random()*this.engine.canvas.width)
        //     let y = Math.floor(Math.random()*this.engine.canvas.height)
        //     this.powerUps.forEach((power,index) => {
        //         power.moving = true
        //         power.actions.die()
        //         this.powerUps.splice(index,1)
        //     })
        //     this.add(new PowerUp(x,y,powerUpType.SpeedBig))       
        // }
        
        // Logger.getInstance().info(this.powerUps.length,this.enemies.length)

        if (this.player.hp <= 0) {
            this.gameOver()
        }
      
    }





    public determineSpawnSide(): Vector {

        let x
        let y
        let spawnOffset = this.mobile ? 20 : 50
        if (Math.random() > 0.5) {
            if (Math.random() > 0.5) {
                x = Math.floor(Math.random()* (this.engine.canvasWidth + spawnOffset - this.engine.canvasWidth+1 )+ this.engine.canvasWidth)
            } else {
               x =  Math.floor(Math.random() * (-spawnOffset + 1)) -spawnOffset;
            }
            y = Math.floor(Math.random() * this.engine.canvasHeight )
        } else {
            if (Math.random() > 0.5) {
                y = Math.floor(Math.random()* (this.engine.canvasHeight + spawnOffset - this.engine.canvasHeight+1 )+ this.engine.canvasHeight)
            } else {
                y =  Math.floor(Math.random() * -spawnOffset + 1) -spawnOffset;
            }
            x = Math.floor(Math.random() * this.engine.canvasWidth )

        }

        return vec(x,y)

        // if (Math.random() > 0.5) {
        //     return Math.floor(Math.random() * (dimension + 50 - dimension + 1)) + dimension;
        // } else {
        //     return Math.floor(Math.random() * (dimension - dimension-50 + 1)) + dimension-50;
        // }
    }

   
    public createBackground() {
        
        let x:number = 0
        let y: number = -4096
        for (let i = 0; i < 24; i++) {
            x = -4096
            for (let j = 0; j < 24 ; j++) {
                let tile = new Tile(x,y)
                this._tiles.push(tile)
                this.add(tile)
                x+=512
            }   
            y+=512         
        }
        
    }

    // public createPower(x,y) {
    //     let random = Math.random()*1000
    //     let type = random > 998 ? powerUpType.SpeedBig : powerUpType.Speed
    //     let powerUp = new PowerUp(x,y, type)
    //     this.add(powerUp)
    //     this.powerUps.push(powerUp)
    // }


    public gameOver() {
        this.wave = 1
        this._tiles = []
        this.enemies = []
        this.actors.forEach(actor => {
            actor.kill()
        })
        this.timers.forEach(timer => {
            timer.stop()
        })
        this.begin()
    }

    public begin() {

        Resources.whatis.stop()
        Resources.main.stop()
        Resources.main.play(0.5)
        this.createBackground()
        this.createPlayer()

           
        this.xpBar = new Bar(this.engine.canvas.width*0.05,this.engine.canvas.height*0.03,"xp",this.engine.canvasWidth*0.9, 10)
        this.hpBar= new Bar(this.engine.canvas.width*0.05,this.engine.canvas.height*0.03 + 15,"hp",this.engine.canvasWidth*0.9, 10)
        this.weaponBar = new Weapons()


        this.numOfEnemies = this.mobile? waves[this.wave].numberOfEnemies/2 : waves[this.wave].numberOfEnemies
        this.createEnemies()     

        this.add(this.xpBar)
        this.add(this.weaponBar)
        this.add(this.hpBar)
        this.hpBar.currentNumber = this.player.hp

        // this.enemyTimer = new Timer({repeats:true, fcn: ()=> {
        //     this.spawnSingle()
        // },interval: 10000})
        //   this.add(this.enemyTimer)
        //  this.enemyTimer.start()

        this.waveTimer = new Timer({repeats:true, fcn: ()=> {
            if (this.wave <10) {
                this.wave+=1  
            }
            this.numOfEnemies = this.mobile? waves[this.wave].numberOfEnemies/2 : waves[this.wave].numberOfEnemies
            
          //  this.createEnemies()
            Logger.getInstance().info(this.numOfEnemies)
        },interval: 30000})

      
        this.add(this.waveTimer)
        this.waveTimer.start()

    }

   

 
}