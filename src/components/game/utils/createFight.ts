import { mapEnvironment } from "./map/plainMap";
import dataMap from "./map/map";
import getDataMon from "../../../utils/t2mon/getDataMon";
import { TeeTooMonState, DataMon } from "../../../utils/types";

const avgLvl = (team: Array<TeeTooMonState>) => {
    let avglvl = 0;
    team.forEach(e => avglvl = avglvl + e.lvl);
    return Math.round(avglvl / team.length);
};

const createFight = (position: string, team: Array<TeeTooMonState>, spawnRate:number): DataMon | null => {
    let idPosition = position.split("-");
    let mapId = idPosition[0] + "-" + idPosition[1];
    let r = parseInt(idPosition[2]);
    let c = parseInt(idPosition[3]);
    let mapEnv = mapEnvironment[dataMap[mapId][r][c]];
    let randomFight = Math.floor(Math.random() * spawnRate);
    if (mapEnv === "tallGrass" && randomFight === 0) {
        let randomMon = Math.floor(Math.random() * 12) + 1;
        let randomLvl = avgLvl(team) + (Math.floor(Math.random() * 7) - 3);
        if (randomLvl <= 0) {
            randomLvl = 1;
        }
        if (randomLvl > 100) {
            randomLvl = 100;
        }
        return getDataMon(randomMon, randomLvl);
    } else {
        return null;
    }
}
export default createFight;