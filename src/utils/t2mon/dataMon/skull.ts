import createMon from "../createMon"
import { skull as img } from "../../../img/mons";

const skull = createMon(
    "Skull",
    { init: 20, markup: 5 }, //pv
    { init: 17, markup: 5 }, //mana
    { init: 17, markup: 7 }, //atk
    { init: 17, markup: 7 }, //def
    { init: 15, markup: 4 }, //speed
    { init: 10, markup: 5 }, //dodge
    ["Darkness", "Physic"], //type
    img
);

export default skull;