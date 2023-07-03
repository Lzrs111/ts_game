// import {ScreenElement} from 'excalibur'
// import { Resources } from '../../resources'

// export class StartButton extends ScreenElement {
//   constructor() {
//     super({
//       x: 100,
//       y: 100,
//       width: 100,
//       height: 100
//     })
//   }

//   onInitialize() {
//     this.graphics.add('idle', Resources.Sword.toSprite())
//     this.graphics.add('hover', Resources.giljo.toSprite())
//     this.graphics.add(Resources.Sword.toSprite())

//     this.on('pointerup', () => {
//       alert("I've been clicked")
//     })

//     this.on('pointerenter', () => {
//       this.graphics.show('hover')
//     })

//     this.on('pointerleave', () => {
//       this.graphics.show('idle')
//     })

//     //this.graphics.use(Resources.Sword.toSprite())
//   }
// }

