import createMon from "../createMon"
import { pig as img } from "../../../img/mons";

const pig = createMon(
    "Pig",
    { init: 20, markup: 9 }, //pv
    { init: 15, markup: 4 }, //mana
    { init: 15, markup: 5 }, //atk
    { init: 17, markup: 9 }, //def
    { init: 15, markup: 4 }, //speed
    { init: 10, markup: 5 }, //dodge
    ["Neutral", "Wind"], //type
    img
);

export default pig;