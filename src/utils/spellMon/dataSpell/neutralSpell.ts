import createSpell from "../createSpell"
import { neutral as img } from "../../../img/spell";

const neutralSpell = () => {

    const goodSpank = createSpell(
        "GoodSpank",
        0,//mana consumption
        10,//impact
        "damage",//effect
        "Neutral",//type
        img
    );

    const lazyRest = createSpell(
        "LazyRest",
        5,//mana consumption
        20,//impact
        "recoverPV",//effect
        "Neutral",//type
        img
    );

    const throwMe = createSpell(
        "ThrowMe",
        5,//mana consumption
        15,//impact
        "damage",//effect
        "Neutral",//type
        img
    );

    const thatGlance = createSpell(
        "ThatGlance",
        5,//mana consumption
        20,//impact
        "damageMana",//effect
        "Neutral",//type
        img
    );

    return {
        goodSpank: goodSpank,
        lazyRest: lazyRest,
        throwMe: throwMe,
        thatGlance: thatGlance
    }
};

export default neutralSpell;