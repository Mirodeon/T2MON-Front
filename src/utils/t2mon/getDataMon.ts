import { Stats, DataMon } from "../types";
import * as data from "./dataMon";

interface Mons {
  [key: number]: {
    name: string;
    pv: Stats;
    mana: Stats;
    atk: Stats;
    def: Stats;
    speed: Stats;
    dodge: Stats;
    exp: Stats;
    type: Array<string>;
    gold: Stats;
    img: any;
  };
}

const dataMon: Mons = {};
dataMon[1] = data.devil;
dataMon[2] = data.unicorn;
dataMon[3] = data.slender;
dataMon[4] = data.slime;
dataMon[5] = data.pig;
dataMon[6] = data.tree;
dataMon[7] = data.ghost;
dataMon[8] = data.skull;
dataMon[9] = data.evil;
dataMon[10] = data.beholder;
dataMon[11] = data.quetzacoalt;
dataMon[12] = data.drake;

const getDataMon = (model_id: number, lvl: number): DataMon => {
  const mon = dataMon[model_id];
  const stat = (stat: Stats) => {
    return stat.init + stat.markup * (lvl - 1);
  };
  const result = {
    model_id: model_id,
    name: mon.name,
    lvl: lvl,
    pv: stat(mon.pv),
    mana: stat(mon.mana),
    atk: stat(mon.atk),
    def: stat(mon.def),
    speed: stat(mon.speed),
    dodge: stat(mon.dodge),
    exp: stat({ init: stat(mon.exp), markup: stat(mon.exp) }),
    type: mon.type,
    givenExp: Math.round(stat(mon.exp) / 5),
    givenGold: stat(mon.gold),
    img: mon.img,
  };
  return result;
};

export const getGrowRate = (model_id: number) => {
  const mon = dataMon[model_id];
  return {
    pv: mon.pv.markup,
    mana: mon.mana.markup,
    atk: mon.atk.markup,
    def: mon.def.markup,
    speed: mon.speed.markup,
    dodge: mon.dodge.markup
  }
};

export default getDataMon;
