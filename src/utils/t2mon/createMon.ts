import { Stats } from "../types";

const createMon = (
    name: string,
    { init: pvI, markup: pvM }: Stats,
    { init: manaI, markup: manaM }: Stats,
    { init: atkI, markup: atkM }: Stats,
    { init: defI, markup: defM }: Stats,
    { init: speedI, markup: speedM }: Stats,
    { init: dodgeI, markup: dodgeM }: Stats,
    type: Array<string>,
    img: any
) => {
    let totalI = pvI + manaI + atkI + defI + speedI + dodgeI;
    let totalM = pvM + manaM + atkM + defM + speedM + dodgeM;
    return {
        name: name,
        pv: { init: pvI, markup: pvM },
        mana: { init: manaI, markup: manaM },
        atk: { init: atkI, markup: atkM },
        def: { init: defI, markup: defM },
        speed: { init: speedI, markup: speedM },
        dodge: { init: dodgeI, markup: dodgeM },
        exp: { init: totalI, markup: totalM },
        type: type,
        gold: {
            init: Math.round(totalI / 2),
            markup: Math.round(totalM / 2),
        },
        img: img,
    };
};

export default createMon;