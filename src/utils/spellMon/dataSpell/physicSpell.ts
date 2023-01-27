import createSpell from "../createSpell"
import { physic as img } from "../../../img/spell";

const physicSpell = () => {

    const heavyStab = createSpell(
        "HeavyStab",
        0,//mana consumption
        10,//impact
        "damage",//effect
        "Physic",//type
        img
    );

    const crushFace = createSpell(
        "CrushFace",
        5,//mana consumption
        20,//impact
        "damage",//effect
        "Physic",//type
        img
    );

    return {
        heavyStab: heavyStab,
        crushFace: crushFace
    }
};

export default physicSpell;