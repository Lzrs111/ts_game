import {Engine, Actor, DisplayMode, Loader, Logger, Timer, TimerOptions,vec, Sound, ImageSource, Canvas, Label, Font, FontUnit, Color,Scene, Input, ExcaliburGraphicsContext, ScreenElement, SceneActivationContext, Vector} from "excalibur"
import { BigScreen } from "../../actors/menu actors/big"
import { MainScene } from "./mainscene"
import { Resources } from "../../resources"
import { SmallWindow } from "../../actors/menu actors/smallwindow"
import { vector } from "excalibur/build/dist/Util/DrawUtil"


 
export class Pause extends Scene {
    public mainScene: MainScene
    public uiBg: BigScreen
    constructor() {
        super()
    }

    public onInitialize(_engine: Engine): void {
       
    }

    public onPreUpdate(_engine: Engine, _delta: number): void {
        if (this.engine.input.keyboard.wasPressed(Input.Keys.P)) {
            this.engine.goToScene("mainscene")

        }
    }

    public onPreDraw(_ctx: ExcaliburGraphicsContext, _delta: number): void {  
        this.mainScene.draw(_ctx,0)
    }

    public onActivate(_context: SceneActivationContext<unknown>): void {
        this.uiBg = new BigScreen()
        this.add(this.uiBg)
        this.uiBg.equippedWeapons = this.mainScene.player.weapons
    }

    public onDeactivate(_context: SceneActivationContext<undefined>): void {
        this.actors.forEach(actor => {
            actor.kill()
        })
    }


          

}

    