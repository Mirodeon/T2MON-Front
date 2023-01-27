import createSpell from "../createSpell"
import { ice as img } from "../../../img/spell";

const iceSpell = () => {

    const supernCold = createSpell(
        "Super'N'Cold",
        5,//mana consumption
        8,//impact
        "damage",//effect
        "Ice",//type
        img
    );

    const instantFreeze = createSpell(
        "InstantFreeze",
        0,//mana consumption
        10,//impact
        "damage",//effect
        "Ice",//type
        img
    );

    const hibernate = createSpell(
        "Hibernate",
        0,//mana consumption
        20,//impact
        "recoverMana",//effect
        "Ice",//type
        img
    );

    return {
        supernCold: supernCold,
        instantFreeze: instantFreeze,
        hibernate: hibernate
    }
};

export default iceSpell;