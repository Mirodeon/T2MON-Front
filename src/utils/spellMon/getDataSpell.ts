import * as data from "./dataSpell";
import { Spell } from "../types";

interface DataSpell {
    [key: number]: Spell;
}

const getDataSpell = (model_id: number) => {
    const dataSpell: DataSpell = {};
    const physic = data.physicSpell();
    const darkness = data.darknessSpell();
    const fire = data.fireSpell();
    const light = data.lightSpell();
    const earth = data.earthSpell();
    const water = data.waterSpell();
    const neutral = data.neutralSpell();
    const wind = data.windSpell();
    const ice = data.iceSpell();

    dataSpell[1] = physic.heavyStab;
    dataSpell[2] = darkness.necroHeal;
    dataSpell[3] = fire.fireBall;
    dataSpell[4] = darkness.possession;
    dataSpell[5] = light.holySanity;
    dataSpell[6] = light.lovePower;
    dataSpell[7] = earth.happyBloom;
    dataSpell[8] = darkness.spiritFear;
    dataSpell[9] = earth.thirstyRoot;
    dataSpell[10] = earth.lastBurial;
    dataSpell[11] = earth.mildToxicity;
    dataSpell[12] = water.liquidGrip;
    dataSpell[13] = water.wetSucking;
    dataSpell[14] = neutral.goodSpank;
    dataSpell[15] = wind.airShedding;
    dataSpell[16] = wind.annoyRust;
    dataSpell[17] = neutral.lazyRest;
    dataSpell[18] = physic.crushFace;
    dataSpell[19] = ice.supernCold;
    dataSpell[20] = fire.setOnFire;
    dataSpell[21] = fire.overCooked;
    dataSpell[22] = light.imShining;
    dataSpell[23] = ice.instantFreeze;
    dataSpell[24] = darkness.hawaiianPizza;
    dataSpell[25] = ice.hibernate;
    dataSpell[26] = neutral.throwMe;
    dataSpell[27] = neutral.thatGlance;
    dataSpell[28] = water.faceSpit;
    dataSpell[29] = wind.flyDiving;

    const spell = dataSpell[model_id];

    return spell;
};
export default getDataSpell