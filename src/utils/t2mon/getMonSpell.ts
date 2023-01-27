import getDataSpell from "../spellMon/getDataSpell";
import { Spell } from "../types";

interface ModelSpell {
    [key: number]: Array<number>
}

export const getMonSpellId = (model_id: number) => {
    const modelSpell: ModelSpell = {};

    modelSpell[1] = [1, 2, 3, 4];//devil
    modelSpell[2] = [1, 5, 6, 7];//unicorn
    modelSpell[3] = [8, 9, 10, 4];//slender
    modelSpell[4] = [11, 12, 13, 9];//slime
    modelSpell[5] = [14, 15, 16, 17];//pig
    modelSpell[6] = [11, 9, 7, 18];//tree
    modelSpell[7] = [8, 4, 2, 19];//ghost
    modelSpell[8] = [8, 26, 2, 27];//skull
    modelSpell[9] = [22, 5, 6, 16];//evil
    modelSpell[10] = [23, 2, 24, 25];//beholder
    modelSpell[11] = [28, 12, 13, 29];//quetzacoalt
    modelSpell[12] = [20, 21, 15, 18];//drake

    return modelSpell[model_id];
}

export const getMonSpellAll = (model_id: number) => {
    const spellOfMon = getMonSpellId(model_id);
    const result: Array<Spell> = [];
    spellOfMon.forEach(spellId => result.push(getDataSpell(spellId)));
    return result;
}