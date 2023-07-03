import { Engine, Label, Logger, ScreenElement,vec, Font, FontOptions, FontUnit, Color } from 'excalibur'
import { Resources } from '../../resources'
import { SmallWindow } from './smallwindow'
import { Choice } from './choice'
import { weapons } from '../projectile/weaponLevelinfo'





export class BigScreen extends ScreenElement {
  public equippedWeapons: any[] = []
  public windows: SmallWindow[] = []
  public labels: Label[] = []
  constructor() {
    super({z:11,width: Resources.big.width,height: Resources.big.height})
  }


  public onInitialize(_engine: Engine): void {
    this.graphics.use(Resources.big.toSprite())
    this.anchor = vec(0.5,0.5)
    this.pos = _engine.screen.center
    this.createWindows()

  }
  
  public getRandomProperty(obj) {
    let keys = Object.keys(obj); 
  
    this.equippedWeapons.forEach(weapon => {
      if (weapon.level >=5) {
        keys.splice(keys.indexOf(weapon.name),1)
      }
    })
  
  
    let key = keys[Math.floor(Math.random() * keys.length)];
    return key
  
}


  public createChoice(window,index) :void {
    
    let key = this.getRandomProperty(weapons)
    let choice = new Choice(Resources.small.width*0.05,Resources.small.height*0.25,weapons[key].image)
    window.choice = key
    window.addChild(choice)
    this.scene.add(choice)

    this.labels[index].text = weapons[key].levels[1].text
    window.equipped = false
    
    this.equippedWeapons.forEach(weapon => {
      if (weapon.name == key && weapon.level <5) {
        Logger.getInstance().info("Weapon name matches key", weapon.name, key)
        window.equipped = true
        this.labels[index].text = weapons[key].levels[weapon.level+1].text
      }
    })

  }


  public createWindows(): void {
    
    let childWidth = Resources.small.width
    let childHeight= Resources.small.height
    let x = -this.width/2 + this.width/2*0.1
    let y = -this.height/2 + this.height/2*0.1
    
  for (let i = 0; i < 3; i++) {
      let window = new SmallWindow(x,y)
      let label = new Label({
        text: "",
        pos: vec(Resources.small.width*0.2, Resources.small.height/2),
        font: new Font({
            family: 'impact',
            size: 24,
            unit: FontUnit.Px,
            color: Color.Red
        }),
        z:15
      })
      this.addChild(window)
      window.addChild(label)
      this.scene.add(window)
      this.scene.add(label)
      this.windows.push(window)
      this.labels.push(label)
      y+=2*childHeight
  }
   


  }
}