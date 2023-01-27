import createMon from "../createMon"
import { unicorn as img } from "../../../img/mons";

const unicorn = createMon(
    "Unicorn",
    { init: 20, markup: 5 }, //pv
    { init: 20, markup: 8 }, //mana
    { init: 18, markup: 9 }, //atk
    { init: 14, markup: 5 }, //def
    { init: 20, markup: 9 }, //speed
    { init: 10, markup: 9 }, //dodge
    ["Light", "Earth"], //type
    img
);

export default unicorn;