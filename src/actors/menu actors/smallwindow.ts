import { Engine, Label, ScreenElement,vec } from 'excalibur'
import { Resources } from '../../resources'
import { Choice } from './choice'

export class SmallWindow extends ScreenElement {
  public choice: string;
  public equipped: boolean = false;
  constructor(x,y) {
    super({z:11,pos: vec(x,y),width: Resources.small.width,height: Resources.small.height})
  }


  public onInitialize(_engine: Engine): void {
    this.graphics.use(Resources.small.toSprite()) 

    this.on("pointerdown", (evt)=> {
      _engine.goToScene("mainscene", {choice: this.choice, equipped: this.equipped})

  })  
  }

  


}