import { Engine, Loader, DisplayMode } from 'excalibur';
import { Player } from './actors/player/player';
import { Resources} from './resources';
import { Game } from './game';



const game = new Game();

game.start().then( ()=> {
    Resources.main.play(0.3)
    game.createPlayer()
    game.createEnemies()
    game.createShotTimer()
    game.createEnemyTimer()
    game.createBackground() 
})
