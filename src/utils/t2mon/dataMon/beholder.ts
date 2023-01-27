import createMon from "../createMon"
import { beholder as img } from "../../../img/mons";

const beholder = createMon(
    "Beholder",
    { init: 10, markup: 7 }, //pv
    { init: 20, markup: 10 }, //mana
    { init: 15, markup: 3 }, //atk
    { init: 15, markup: 7 }, //def
    { init: 10, markup: 5 }, //speed
    { init: 10, markup: 8 }, //dodge
    ["Darkness", "Ice"], //type
    img
);

export default beholder;