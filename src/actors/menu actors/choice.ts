import { Engine, ImageSource, ScreenElement,Vector,vec } from 'excalibur'
import { Resources } from '../../resources'

export class Choice extends ScreenElement {
    public image: ImageSource
  constructor(x,y,image) {
    super({z:12,pos: vec(x,y),anchor: Vector.Half})
    this.image = image
  }


  public onInitialize(_engine: Engine): void {
    this.graphics.use(this.image.toSprite())
  }
}