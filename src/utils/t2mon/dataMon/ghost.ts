import createMon from "../createMon"
import { ghost as img } from "../../../img/mons";

const ghost = createMon(
    "Ghost",
    { init: 15, markup: 2 }, //pv
    { init: 17, markup: 7 }, //mana
    { init: 20, markup: 6 }, //atk
    { init: 15, markup: 7 }, //def
    { init: 17, markup: 9 }, //speed
    { init: 10, markup: 7 }, //dodge
    ["Darkness", "Wind"], //type
    img
);

export default ghost;