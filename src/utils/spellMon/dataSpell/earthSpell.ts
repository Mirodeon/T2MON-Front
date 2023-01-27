import createSpell from "../createSpell"
import { earth as img } from "../../../img/spell";

const earthSpell = () => {

    const happyBloom = createSpell(
        "HappyBloom",
        5,//mana consumption
        8,//impact
        "recoverPV",//effect
        "Earth",//type
        img
    );

    const thirstyRoot = createSpell(
        "ThirstyRoot",
        20,//mana consumption
        20,//impact
        "stealPV",//effect
        "Earth",//type
        img
    );

    const lastBurial = createSpell(
        "LastBurial",
        15,//mana consumption
        25,//impact
        "damage",//effect
        "Earth",//type
        img
    );

    const mildToxicity = createSpell(
        "MildToxicity",
        0,//mana consumption
        10,//impact
        "damage",//effect
        "Earth",//type
        img
    );

    return {
        happyBloom: happyBloom,
        thirstyRoot: thirstyRoot,
        lastBurial: lastBurial,
        mildToxicity: mildToxicity
    }
};

export default earthSpell;