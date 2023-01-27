import createMon from "../createMon"
import { tree as img } from "../../../img/mons";

const tree = createMon(
    "Tree",
    { init: 20, markup: 8 }, //pv
    { init: 15, markup: 2 }, //mana
    { init: 15, markup: 5 }, //atk
    { init: 20, markup: 8 }, //def
    { init: 10, markup: 2 }, //speed
    { init: 10, markup: 3 }, //dodge
    ["Earth", "Physic"], //type
    img
);

export default tree;