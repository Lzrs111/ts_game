import { Engine, Label, Logger, ScreenElement,vec, Font, FontOptions, FontUnit, Color,Canvas, Vector,Text } from 'excalibur'
import { Resources } from '../../resources'
import { SmallWindow } from './smallwindow'
import { weapons } from '../projectile/weaponLevelinfo'





export class BigScreen extends ScreenElement {
  public equippedWeapons: any[] = []
  public windows: SmallWindow[] = []
  public labels: Text[] = []
  public mobile: boolean
  public choices = []
  constructor() {
    let width
    let height
    let mobile: boolean = window.visualViewport.width <= 480 ? true : false

    if (mobile) {
      width = window.visualViewport.width
      height = window.visualViewport.height
    } else {
      width = window.visualViewport.width*0.5
      height = window.visualViewport.height*0.5
    }


    super({z:30,width: width,height: height,color: Color.Azure})
    this.mobile = mobile
  }


  public onInitialize(_engine: Engine): void {

    let keys = Object.keys(weapons)
    this.equippedWeapons.forEach((weapon,index)=> {
      if (weapon.level == 5) {
        keys.splice(keys.indexOf(weapon.name),1)
      }
    })

    

    

    
    
    let levelLabelText = new Text({
      text: "Izaberi oružje itd",
      font: new Font({
          family: 'impact',
          size: 24,
          unit: FontUnit.Px,
          color: Color.fromHex("#FF8000")
      }),
    })
    
    let levelLabel = new ScreenElement({z:31})
    levelLabel.graphics.use(levelLabelText)


    let canv = new Canvas({
      height: this.height,
      width: this.width,
      cache: true,
      draw(ctx) {
        let gradient = ctx.createLinearGradient(this.width/2,this.height, this.width/2, 0);
        gradient.addColorStop(0, "#007FFF");
        gradient.addColorStop(0.5, "#00ffFF");
        gradient.addColorStop(1, "#007FFF");  
        ctx.fillStyle = "#007FFF"
        ctx.fillRect(0,0,this.width,this.height)
        ctx.lineWidth = 10
        ctx.strokeStyle = "#FF8000"
        ctx.stroke
        ctx.strokeRect(0,0,this.width,this.height)
      },
    })
    
  

    
    this.addChild(levelLabel)
    levelLabel.anchor = Vector.Half
    levelLabel.pos = vec(0,-this.height/2+this.height*0.15)
    
    this.graphics.use(canv)
    this.anchor = vec(0.5,0.5)
    this.pos = _engine.screen.center
    this.createWindows(keys)

  }
  




  // public update(engine: Engine, delta: number): void {
  //   engine.browser.window.on("resize", ()=> {
  //     this.labels.forEach(label => {
  //       this.logger.info("old,new,w to s, s to w", label.oldPos,label.pos,engine.worldToScreenCoordinates(label.oldPospos),engine.screenToWorldCoordinates(label.pos))
  //     })
  //   })
  // }


  public createWindows(keys): void {
    
    let windowWidth = this.mobile ? this.width : this.width*0.8
    let windowHeight= Resources.anteSmall.height + 10
    let x = this.mobile ? -this.width/2 :-this.width/2 + this.width*0.1
    let y = -this.height/2 + this.height*0.2
    let choices = keys
    let numberOfWindows: number
    
  
  if (choices.length > 3) {
    numberOfWindows = 3
  } else {
    numberOfWindows = choices.length
  }
    
  for (let i = 0; i < numberOfWindows; i++) {

      let key = choices[Math.floor(Math.random() * choices.length)]
      choices.splice(choices.indexOf(key),1)
      let sWindow = new SmallWindow(x,y, windowWidth, windowHeight)
      let label = new ScreenElement({pos:vec(sWindow.width*0.25,sWindow.height/2),width: sWindow.width,height: sWindow.height,z:31,color: Color.Red})
      let text = new Text({
        text: "",
        font: new Font({
          family: 'impact',
          size: window.visualViewport.width <= 480 ? 18 : 24,
          unit: FontUnit.Px,
          color: Color.fromHex("#FF8000")
      }),
      })

      let choice = new ScreenElement({
        pos: vec(5,5),
        anchor: Vector.Half,
        color: Color.Red,
        z:32
      })
     
      choice.graphics.use(weapons[key].smallImage.toSprite())
      sWindow.choice = key
      sWindow.addChild(choice)
      this.scene.add(choice)

      text.text = weapons[key].levels[1].text
      sWindow.equipped = false

      
    this.equippedWeapons.forEach(weapon => {
      this.logger.info(weapon.name, key)
      if (weapon.name == key && weapon.level <5) {
        sWindow.equipped = true
        text.text = weapons[key].levels[weapon.level+1].text
      }
    })



     
      label.graphics.use(text)
      this.addChild(sWindow)
      sWindow.addChild(label)
      this.scene.add(sWindow)
      this.scene.add(label)
      this.windows.push(sWindow)
      this.labels.push(text)
      y+=2*sWindow.height
  }
   


  }
}