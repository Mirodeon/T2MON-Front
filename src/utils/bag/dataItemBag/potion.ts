import createItemBag from "../createItemBag";
import { potion as img } from "../../../img/item";

const potion = createItemBag(
    "Potion",
    100,
    "recoverPV",
    `Unknown composition (rum) but allows you to recover HP.`,
    img
);

export default potion;