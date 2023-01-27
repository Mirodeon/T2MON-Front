import createItemBag from "../createItemBag";
import { crystal as img } from "../../../img/item";

const crystal = createItemBag(
    "Crystal",
    100,
    "recoverMana",
    `A nice crystal filled with magic that recovers mana.`,
    img
);

export default crystal;