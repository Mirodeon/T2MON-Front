import createMon from "../createMon"
import { slender as img } from "../../../img/mons";

const slender = createMon(
    "Slender",
    { init: 20, markup: 9 }, //pv
    { init: 20, markup: 9 }, //mana
    { init: 20, markup: 5 }, //atk
    { init: 20, markup: 7 }, //def
    { init: 15, markup: 7 }, //speed
    { init: 10, markup: 8 }, //dodge
    ["Darkness", "Earth"], //type
    img
);

export default slender;