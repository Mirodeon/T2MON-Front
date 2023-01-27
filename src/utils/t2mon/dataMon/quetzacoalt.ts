import createMon from "../createMon"
import { quetzacoalt as img } from "../../../img/mons";

const quetzacoalt = createMon(
    "Quetzacoalt",
    { init: 20, markup: 5 }, //pv
    { init: 18, markup: 7 }, //mana
    { init: 17, markup: 8 }, //atk
    { init: 20, markup: 7 }, //def
    { init: 17, markup: 9 }, //speed
    { init: 10, markup: 9 }, //dodge
    ["Wind", "Water"], //type
    img
);

export default quetzacoalt;