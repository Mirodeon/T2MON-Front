import createSpell from "../createSpell"
import { fire as img } from "../../../img/spell";

const fireSpell = () => {

    const fireBall = createSpell(
        "FireBall",
        15,//mana consumption
        20,//impact
        "damage",//effect
        "Fire",//type
        img
    );

    const setOnFire = createSpell(
        "SetOnFire",
        0,//mana consumption
        10,//impact
        "damage",//effect
        "Fire",//type
        img
    );

    const overCooked = createSpell(
        "OverCooked",
        20,//mana consumption
        30,//impact
        "damage",//effect
        "Fire",//type
        img
    );

    return {
        fireBall: fireBall,
        setOnFire: setOnFire,
        overCooked: overCooked
    }
};

export default fireSpell;