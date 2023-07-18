// import { Engine, Label, Logger, ScreenElement,vec, Font, FontOptions, FontUnit, Color, Canvas, Actor, Line, Vector,ColliderComponent } from 'excalibur'
// import { Resources } from '../../resources'



// export class HpBar extends ScreenElement {
//     public border: Canvas
//     public xOffset: number
//     public yOffset: number
//     public mainPortion: Actor
//     public currentHp: number = 100
//     constructor() {
//         super({x:0,y:0,z:10,width:200,height:200,color: Color.Chartreuse})
//     }


//     public onInitialize(_engine: Engine): void {
//         this.xOffset = -Resources.giljo.width/2
//         this.yOffset = -Resources.giljo.height*0.75
//         this.pos= vec(_engine.canvasWidth/2+this.xOffset,_engine.canvasHeight/2 + this.yOffset)
//         this.border = new Canvas({
//             width: _engine.canvasWidth,
//             height: this.yOffset,
//             cache: true, 
//             draw: (ctx) => {
//                 ctx.fillStyle =  "#FF0000";
//                 ctx.fillRect(0,0, Resources.giljo.width,9)
//             }
//     })
//     this.graphics.use(this.border)

//     this.mainPortion = new Actor({
//         x: (Resources.giljo.width/2)-1,
//         y: 2.5,
//         // width: this.width,
//         // height: this.height, 
//         z:10,
//         anchor: Vector.Zero
//     })


//     this.addChild(this.mainPortion)
//     //this.scene.add(this.mainPortion)
//     }

//     update(engine: Engine, delta: number): void {


//         if (this.currentHp < 100) {
//             this.mainPortion.graphics.use(this.createLine()) 
//         }
//     }


//     public createLine() {

//         let end = (100 -  this.currentHp)/100

//         return new Line({
//             start: vec(this.mainPortion.pos.x,this.mainPortion.pos.y),
//             end: vec(this.mainPortion.pos.x-(Resources.giljo.width*end),this.mainPortion.pos.y),
//             thickness: 5,
//             color: Color.Black
//         })      
//     }


   
// }
