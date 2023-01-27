import createSpell from "../createSpell"
import { darkness as img } from "../../../img/spell";

const darknessSpell = () => {

    const necroHeal = createSpell(
        "NecroHeal",
        10,//mana consumption
        15,//impact
        "recoverPV",//effect
        "Darkness",//type
        img
    );

    const possession = createSpell(
        "Possession",
        10,//mana consumption
        15,//impact
        "stealMana",//effect
        "Darkness",//type
        img
    );

    const spiritFear = createSpell(
        "SpiritFear",
        0,//mana consumption
        10,//impact
        "damage",//effect
        "Darkness",//type
        img
    );

    const hawaiianPizza = createSpell(
        "HawaiianPizza",
        30,//mana consumption
        40,//impact
        "damage",//effect
        "Darkness",//type
        img
    );

    return {
        necroHeal: necroHeal,
        possession: possession,
        spiritFear: spiritFear,
        hawaiianPizza: hawaiianPizza
    }
};

export default darknessSpell;