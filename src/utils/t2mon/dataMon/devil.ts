import createMon from "../createMon"
import { devil as img } from "../../../img/mons";

const devil = createMon(
    "Devil",
    { init: 20, markup: 6 }, //pv
    { init: 20, markup: 6 }, //mana
    { init: 10, markup: 10 }, //atk
    { init: 20, markup: 4 }, //def
    { init: 20, markup: 7 }, //speed
    { init: 10, markup: 8 }, //dodge
    ["Darkness", "Fire"], //type
    img
);

export default devil;