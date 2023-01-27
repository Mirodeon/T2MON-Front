import createSpell from "../createSpell"
import { light as img } from "../../../img/spell";

const lightSpell = () => {

    const holySanity = createSpell(
        "HolySanity",
        10,//mana consumption
        10,//impact
        "stealPV",//effect
        "Light",//type
        img
    );

    const lovePower = createSpell(
        "LovePower",
        20,//mana consumption
        30,//impact
        "damage",//effect
        "Light",//type
        img
    );

    const imShining = createSpell(
        "ImShining",
        0,//mana consumption
        10,//impact
        "damage",//effect
        "Light",//type
        img
    );

    return {
        holySanity: holySanity,
        lovePower: lovePower,
        imShining: imShining
    }
};

export default lightSpell;