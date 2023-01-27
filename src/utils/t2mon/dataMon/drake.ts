import createMon from "../createMon"
import { drake as img } from "../../../img/mons";

const drake = createMon(
    "Drake",
    { init: 15, markup: 8 }, //pv
    { init: 15, markup: 8 }, //mana
    { init: 15, markup: 8 }, //atk
    { init: 15, markup: 8 }, //def
    { init: 20, markup: 3 }, //speed
    { init: 10, markup: 9 }, //dodge
    ["Fire", "Wind"], //type
    img
);

export default drake;