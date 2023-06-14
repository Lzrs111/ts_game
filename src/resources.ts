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
    giljo: new ImageSource(giljo)

}

const Sounds = {

}

export { Resources }