import { Engine, Label, ScreenElement,vec,Canvas } from 'excalibur'
import { Resources } from '../../resources'

export class SmallWindow extends ScreenElement {
  public choice: string;
  public equipped: boolean = false;
  constructor(x,y,width,height) {
    super({z:31,pos: vec(x,y),width: width,height:height})
  }


  public onInitialize(_engine: Engine): void {
    this.on("pointerdown", (evt)=> {
      _engine.goToScene("mainscene", {choice: this.choice, equipped: this.equipped})

    })
  
    let canv = new Canvas({
      height: this.height,
      width: this.width,
      cache: true,
      draw(ctx) {
        let gradient = ctx.createLinearGradient(0,this.height/2, this.width, this.height/2);
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

    this.graphics.use(canv)
    }

}