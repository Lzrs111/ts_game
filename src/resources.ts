import { ImageSource, Sound } from 'excalibur';
import giljoR from './images/giljo-resize.png';
import giljoL from "./images/giljo-resize-L.png"
import segment from "./images/BOOBE.png"
import segment1 from "./images/booba1.png"
import segment2 from "./images/booba2.png"
import segment3 from "./images/booba3.png"
import segment4 from "./images/booba4.png"
import sengula from "./images/sengula.png";
import main from "./sounds/main.mp3";
import giljo from "./images/giljo.png"
import background1 from "./images/Small 512x512/Blue Nebula/Blue Nebula 1 - 512x512.png"
import background2 from "./images/Small 512x512/Blue Nebula/Blue Nebula 2 - 512x512.png"
import background3 from "./images/Small 512x512/Blue Nebula/Blue Nebula 3 - 512x512.png"
import background4 from "./images/Small 512x512/Blue Nebula/Blue Nebula 4 - 512x512.png"
import background5 from "./images/Small 512x512/Blue Nebula/Blue Nebula 5 - 512x512.png"
import background6 from "./images/Small 512x512/Blue Nebula/Blue Nebula 6 - 512x512.png"
import background7 from "./images/Small 512x512/Blue Nebula/Blue Nebula 7 - 512x512.png"
import background8 from "./images/Small 512x512/Blue Nebula/Blue Nebula 8 - 512x512.png"
import speed from "./images/das.png"


/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    giljoR: new ImageSource(giljoR), //6
    giljoL: new ImageSource(giljoL),
    sengula: new ImageSource(sengula),
    enemy: new ImageSource(segment),
    enemy1: new ImageSource(segment1),
    enemy2: new ImageSource(segment2),
    enemy3: new ImageSource(segment3),
    enemy4: new ImageSource(segment4),
    main: new Sound(main),
    giljo: new ImageSource(giljo),
    bg1: new ImageSource(background1),
    bg2: new ImageSource(background2),
    bg3: new ImageSource(background3),
    bg4: new ImageSource(background4),
    bg5: new ImageSource(background5),
    bg6: new ImageSource(background6),
    bg7: new ImageSource(background7),
    bg8: new ImageSource(background8),
    powerUp_speed: new ImageSource(speed)


}

const Sounds = {

}

export { Resources }