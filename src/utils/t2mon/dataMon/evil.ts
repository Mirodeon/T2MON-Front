import createMon from "../createMon"
import { evil as img } from "../../../img/mons";

const evil = createMon(
    "Evil",
    { init: 15, markup: 3 }, //pv
    { init: 12, markup: 8 }, //mana
    { init: 20, markup: 5 }, //atk
    { init: 10, markup: 3 }, //def
    { init: 10, markup: 10 }, //speed
    { init: 10, markup: 5 }, //dodge
    ["Light", "Wind"],//type
    img
);

export default evil;