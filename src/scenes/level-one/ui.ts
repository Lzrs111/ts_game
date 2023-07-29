import { Engine, Label, Logger, ScreenElement,vec, Font, FontOptions, FontUnit, Color, Canvas, Actor, Line, Vector, CollisionType, Text } from 'excalibur'
import { Resources } from '../../resources'
import { MainScene } from './mainscene'
import { Ante } from '../../actors/projectile/ante'
import { weapons } from '../../actors/projectile/weaponLevelinfo'





export class Weapons extends ScreenElement {
    public xOffset: number
    public yOffset: number
    public slots: any[] = []
    public slotXOffset: number =Resources.slot1.width + 10
    public levelCount: ScreenElement
    public killCount: ScreenElement
    public levelText: Text
    public killText: Text
    constructor() {
        super({x:0,y:0,z:10,width:Resources.slotEmpty.width*10+100,height: Resources.slot1.height,collisionType:CollisionType.PreventCollision})
    }

    public onInitialize(_engine: Engine): void {
        this.xOffset = _engine.canvasWidth*0.05
        this.yOffset = _engine.canvasHeight*0.075
        this.pos= vec(this.xOffset,this.yOffset)
        let scene = this.scene as MainScene
        this.slotXOffset = scene.mobile ? this.slotXOffset*0.5 : this.slotXOffset


        let x = 0
    
        for (let i = 0; i < 10; i++) {
        
            let sl = new ScreenElement({
                pos: vec(x,0),
                z: 22,
                width: Resources.slotEmpty.width,
                height: Resources.slot1.height,
                anchor: Vector.Zero,
                color: Color.Black
            })
            x += this.slotXOffset
            sl.graphics.use(Resources.slotEmpty.toSprite())
            sl.scale = scene.scale
            this.addChild(sl)
            this.scene.add(sl)
            this.slots.push(sl)
        }

        let textSize = window.visualViewport.width <= 480 ? 18 : 24
        

        let container = new ScreenElement({
            pos: vec(0, this.slots[0].height+5),z:30, anchor: Vector.Zero, width:this.scene.engine.canvasWidth*0.05,height:this.scene.engine.canvasHeight*0.05
        })

        this.addChild(container)
        this.scene.add(container)

        let skullIcon = new ScreenElement({
            pos: vec(container.width*0.1, 0),z: 30, anchor: Vector.Zero
        })

        let levelLabel = new ScreenElement({
            pos: vec(0, container.height*0.8),z: 30, anchor: Vector.Zero
        })

        let text =  new Text({
            text: "Lvl",
            font: new Font({
              family: 'impact',
              size: textSize,
              unit: FontUnit.Px,
              color: Color.fromHex("#FF007F"),
          })
        })


    
        skullIcon.graphics.use(Resources.lubanja.toSprite())
        levelLabel.graphics.use(text)

        this.killCount = new ScreenElement({
            pos: vec(scene.mobile ?container.width*1.25 : container.width*0.5, container.height*0.35),z: 30, anchor: Vector.Zero
        })
        this.levelCount = new ScreenElement({
            pos: vec(scene.mobile ?container.width*1.25 : container.width*0.5, container.height*0.8), z:30, anchor: Vector.Zero
        })
        this.levelText = new Text({
            text: "1",
            font: new Font({
              family: 'impact',
              size: textSize,
              unit: FontUnit.Px,
              color: Color.fromHex("#FF007F")
          })
        })

        this.killText = new Text({
            text: "0",
            font: new Font({
              family: 'impact',
              size: textSize,
              unit: FontUnit.Px,
              color: Color.fromHex("#FF007F")
          })
        })



        this.killCount.graphics.use(this.killText)
        this.levelCount.graphics.use(this.levelText)
        container.addChild(this.killCount)
        container.addChild(this.levelCount)
        container.addChild(skullIcon)
        container.addChild(levelLabel)
        this.scene.add(levelLabel)
        this.scene.add(skullIcon)
        this.scene.add(this.levelCount)
        this.scene.add(this.killCount)
        
        this.updateSlots(scene.player.weapons)

        
    }

    updateSlots(weaponArray: any[]): void {
         weaponArray.forEach((weapon,index) => {
        let graphic
        switch (weapon.level) {
            case 1:          
                graphic = Resources.slot1
                break;
            case 2:
                graphic = Resources.slot2
                break;
            case 3:
                graphic = Resources.slot3
                break;
            case 4:
                graphic = Resources.slot4
                break;
            case 5:
                graphic = Resources.slot5
                break;
        
            default:
                break;
        }

        
        this.slots[index].graphics.use(graphic.toSprite())
        let inner = new ScreenElement({
            pos: vec(0,0),
            width: weapons[weapon.name].smallImage.width,
            height: weapons[weapon.name].smallImage.height,
            z:23,
            anchor: Vector.Half,
            name: "LOL",
            collisionType:CollisionType.PreventCollision
        })

        inner.graphics.use(weapons[weapon.name].smallImage.toSprite())
        this.slots[index].addChild(inner)

      }
    )}

}


export class Bar extends ScreenElement {
    public border: Canvas
    public xOffset: number
    public yOffset: number
    public mainPortion: Actor
    public currentNumber: number = 0
    public tracked: string 
    constructor(xOffset,yOffset, tracked,width,height) {
        super({x:0,y:0,z:20,collisionType:CollisionType.PreventCollision, width: width,height: height})
        this.xOffset = xOffset
        this.yOffset = yOffset
        this.tracked = tracked
    }


    public onInitialize(_engine: Engine): void {
        
        //this.xOffset = _engine.canvasWidth*0.05
        //this.yOffset = _engine.canvasHeight*0.03
        this.pos= vec(this.xOffset,this.yOffset)
        this.border = new Canvas({
            width: _engine.canvasWidth,
            height: this.yOffset,
            cache: true, 
            draw: this.tracked == "xp" ?  (ctx) => {
                ctx.strokeStyle =  "#007FFF"
                ctx.strokeRect(0,0,_engine.canvasWidth*0.9,9)
            } 
            
            : 
            
            (ctx) => {
                    ctx.strokeStyle =  "#FF0000";
                    ctx.strokeRect(0,0,_engine.canvasWidth*0.9,15)}

    })
    this.graphics.use(this.border)

    this.mainPortion = new ScreenElement({
        // width: this.width,
        // height: this.height, 
        z:21,
        anchor: Vector.Zero,
        collisionType: CollisionType.PreventCollision
    })

    this.mainPortion.pos = this.tracked == "xp" ? vec(1,2) : vec(1,4)
    this.addChild(this.mainPortion)
    this.scene.add(this.mainPortion)

    }

    update(engine: Engine, delta: number): void {
        if (this.mainPortion) {
            this.mainPortion.graphics.use(this.createLine())    
        }
       
    }


    public createLine() {
        let start 
        let end

        if (this.tracked == "xp") {
            if (this.currentNumber > 0) {
                if (this.currentNumber > 100) {
                    this.currentNumber = 100
                }
                end = vec((this._engine.canvas.width-2*this.xOffset)*this.currentNumber/100, this.mainPortion.pos.y)
            } else {
                end = Vector.Zero
            }
            return new Line({
                start: vec(this.mainPortion.pos.x,this.mainPortion.pos.y),
                end: end,
                thickness: 4.5,
                color: Color.Azure
            })
        } else {
            
            return new Line({
                start: vec(this.mainPortion.pos.x,this.mainPortion.pos.y),
                end: vec(this.width*this.currentNumber/100,this.mainPortion.pos.y),
                thickness: 7.5,
                color: Color.Red
            })      
        }
    }
}