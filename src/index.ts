import { Engine, Loader, DisplayMode } from 'excalibur';
import { Player } from './actors/player/player';
import { Resources} from './resources';
import { Game } from './game';
import { MainScene } from './scenes/level-one/mainscene';
import { Pause } from './scenes/level-one/pause';



const game = new Game();

game.start().then( ()=> {

    game.add("mainscene", new MainScene())
    game.add("pause",new Pause())
    game.goToScene("mainscene")
})
