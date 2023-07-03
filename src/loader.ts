import { Color, Loader, Logger,Vector,vec, Util } from "excalibur";
import splash from "./images/boobe splash.png"
import background from "./images/loadbackground.png"

export class LoadScreen extends Loader {
    public splashImage = new Image()
    public backgroundImage = new Image()
    public runOnce = true
    public stars
    constructor(loadables) {
        super(loadables)
        this.splashImage.src = splash
        this.backgroundImage.src = background
        this.playButtonText = "Klik za boobe"
        this.loadingBarPosition = vec(window.innerWidth*0.125, window.innerHeight*0.85)
        this.loadingBarColor = Color.Azure
        this.playButtonPosition = vec(window.innerWidth*0.4, window.innerHeight*0.90)
        this.backgroundColor = "000000"
        this.stars = this.generateCoords(window.innerWidth,window.innerHeight)
    }
    
    draw(ctx: CanvasRenderingContext2D): void {

       if (this._playButton) {
         this.playButtonElement.style.backgroundColor = "#007FFF"
       }


        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        // ctx.drawImage(this.backgroundImage,0,0)

     
        this.stars.forEach(element => {
            ctx.beginPath();
            ctx.arc(element[0],element[1], 1, 0, 2*Math.PI)
            ctx.fillStyle = "white"
            ctx.fill()
            ctx.strokeStyle = "white";
            ctx.stroke()
            
        });
         
      
        ctx.drawImage(this.splashImage,this.canvas.width/2 - this.splashImage.width/2,this.canvas.height/2 - this.splashImage.height/2)

        let loadingX
        let loadingY
        if (this.loadingBarPosition) {
            loadingX = this.loadingBarPosition.x;
            loadingY = this.loadingBarPosition.y;
        }
    
        ctx.lineWidth = 2;
        Util.DrawUtil.roundRect(ctx, loadingX, loadingY, this.canvas.width*0.75, 20, 10, this.loadingBarColor);
        const progress = this.canvas.width*0.75 * this.progress;
        const margin = 5;
        const progressWidth = progress - margin * 2;
        const height = 20 - margin * 2;
        Util.DrawUtil.roundRect(
          ctx,
          loadingX + margin,
          loadingY + margin,
          progressWidth > 10 ? progressWidth : 10,
          height,
          5,
          null,
          this.loadingBarColor
        );
    }

    public generateCoords(width,height) {
        let container = []
        for (let i = 0; i < 1000; i++) {
            let x = Math.random()*width
            let y = Math.random()*height
            container.push([x,y])
        }
        return container
    }
}