import { Actor, Engine,Timer,TimerOptions} from "excalibur";
import { weapons } from "./weaponLevelinfo";
import { MainScene } from "../../scenes/level-one/mainscene";
import { Player } from "../player/player";



export class HpRegen extends Actor {
    public level: number = 1
    public hps: number
    constructor() {
        super({name: "HpRegen"})
        this.hps = weapons.HpRegen.levels[1].hps
    }

    public onInitialize(_engine: Engine): void {
        this.scene.addTimer(new Timer({repeats: true, fcn: ()=> {
            let scene = this.scene as MainScene
            if (scene.player.hp < 100) {
                scene.player.hp += this.hps
                if (scene.player.hp > 100) {
                    scene.player.hp = 100
                }
            }
        },interval: 1000})).start()
    }

    

    public levelUp() {
        this.level+=1
        this.hps = weapons.HpRegen.levels[this.level].hps
    }

}
