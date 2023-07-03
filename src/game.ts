import {Engine, Actor, DisplayMode, Loader, Logger, Timer, TimerOptions,vec, Sound, ImageSource, Label, Font, FontUnit, Color} from "excalibur"
import { Resources } from "./resources";
import { Player } from "./actors/player/player";
import { Enemy } from "./actors/enemy/enemy";
import { Tile } from "./actors/background/Tile";
import { PowerUp } from "./actors/powerup/powerup";
import { Direction } from "./actors/player/direction";
import { MainScene } from "./scenes/level-one/mainscene";
import { LoadScreen } from "./loader";

export class Game extends Engine {


  
    constructor() {
    super({displayMode: DisplayMode.FillScreen, suppressHiDPIScaling: true});

    }

    public start() {

    const loader = new LoadScreen(Object.values(Resources)) 
    return super.start(loader)
      
    }
}