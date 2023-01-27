import { mapEnvironment } from "./plainMap";
import dataMap from "./map";

const dispoSquare = (mapId: string, r: number, c: number): boolean => {
    let mapEnv = mapEnvironment[dataMap[mapId][r][c]];
    return (mapEnv !== "water" &&
        mapEnv !== "tree" &&
        mapEnv !== "building" &&
        mapEnv !== "roof" &&
        mapEnv !== "door");
};

export const isAHut = (mapId: string, r: number, c: number): boolean => {
    let mapEnv = mapEnvironment[dataMap[mapId][r][c]];
    return mapEnv === "door";
};

export default dispoSquare;