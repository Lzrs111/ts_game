import {Engine, Actor, DisplayMode, Loader, Logger, Timer, TimerOptions,vec, Sound, ImageSource, Label, Font, FontUnit, Color,Scene, Input} from "excalibur"


export class Pause extends Scene {
    constructor() {
        super()
    }

    onPreUpdate(_engine: Engine, _delta: number): void {
        if (this.engine.input.keyboard.isHeld(Input.Keys.P)) {
            this.engine.goToScene("mainscene")
        }
    }
}