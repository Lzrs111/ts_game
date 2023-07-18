import { Engine, Loader, DisplayMode } from 'excalibur';
import { Player } from './actors/player/player';
import { Resources} from './resources';
import { Game } from './game';
import { MainScene } from './scenes/level-one/mainscene';
import { Pause } from './scenes/level-one/pause';

// let fullscreen = document.createElement("button");
// fullscreen.innerHTML = "Fullscreen"
// fullscreen.style.backgroundColor = "#007FFF"
// fullscreen.style.zIndex = "100"
// fullscreen.style.position = "fixed"
// fullscreen.style.top = "30px"

// fullscreen.onclick = () => {
//     let canv = document.querySelector("canvas")
//     document.body.requestFullscreen().then( () => {
        
//     })
// }

// document.body.prepend(fullscreen)

const game = new Game();

        game.start().then( ()=> {
        
            game.add("mainscene", new MainScene())
            game.add("pause",new Pause())
            game.goToScene("mainscene")
            Resources.main.play(0.2)
        })

