import createSpell from "../createSpell"
import { wind as img } from "../../../img/spell";

const windSpell = () => {

    const airShedding = createSpell(
        "AirShedding",
        10,//mana consumption
        15,//impact
        "damage",//effect
        "Wind",//type
        img
    );

    const annoyRust = createSpell(
        "AnnoyRust",
        10,//mana consumption
        25,//impact
        "damageMana",//effect
        "Wind",//type
        img
    );

    const flyDiving = createSpell(
        "FlyDiving",
        15,//mana consumption
        30,//impact
        "damage",//effect
        "Wind",//type
        img
    );

    return {
        airShedding: airShedding,
        annoyRust: annoyRust,
        flyDiving: flyDiving
    }
};

export default windSpell;