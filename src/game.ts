import {Engine, Actor, DisplayMode, Loader, Logger, Timer, TimerOptions,vec, Sound, ImageSource, Label, Font, FontUnit, Color} from "excalibur"
import { Resources } from "./resources";
import { LoadScreen } from "./loader";

export class Game extends Engine {
 
    constructor() {
    super({displayMode: DisplayMode.FillScreen, suppressHiDPIScaling: true });

    }

    public start() {
    const loader = new LoadScreen(Object.values(Resources)) 
    return super.start(loader)
      
    }
}