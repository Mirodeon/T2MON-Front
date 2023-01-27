import createItemBag from "../createItemBag";
import { pizza as img } from "../../../img/item";

const pizza = createItemBag(
    "Pizza",
    10000,
    "lvlUp",
    `Pizza is the main food. Level-up guaranteed.`,
    img
);

export default pizza;