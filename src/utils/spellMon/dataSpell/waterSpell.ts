import createSpell from "../createSpell"
import { water as img } from "../../../img/spell";

const waterSpell = () => {

    const liquidGrip = createSpell(
        "LiquidGrip",
        5,//mana consumption
        12,//impact
        "damage",//effect
        "Water",//type
        img
    );

    const wetSucking = createSpell(
        "WetSucking",
        15,//mana consumption
        15,//impact
        "stealPVandMana",//effect
        "Water",//type
        img
    );

    const faceSpit = createSpell(
        "FaceSpit",
        0,//mana consumption
        10,//impact
        "damage",//effect
        "Water",//type
        img
    );

    return {
        liquidGrip: liquidGrip,
        wetSucking: wetSucking,
        faceSpit: faceSpit
    }
};

export default waterSpell;