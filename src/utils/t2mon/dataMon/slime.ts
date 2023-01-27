import createMon from "../createMon"
import { slime as img } from "../../../img/mons";

const slime = createMon(
    "Slime",
    { init: 20, markup: 8 }, //pv
    { init: 15, markup: 7 }, //mana
    { init: 15, markup: 5 }, //atk
    { init: 17, markup: 8 }, //def
    { init: 14, markup: 5 }, //speed
    { init: 10, markup: 5 }, //dodge
    ["Earth", "Water"], //type
    img
);

export default slime;