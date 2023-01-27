import { MapEnv } from "../../../../utils/types";

export const rowWater = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1 };

export const rowTree = { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2 };

export const waterMap = {
    1: rowWater,
    2: rowWater,
    3: rowWater,
    4: rowWater,
    5: rowWater,
    6: rowWater,
    7: rowWater
};

export const treeMap = {
    1: rowTree,
    2: rowTree,
    3: rowTree,
    4: rowTree,
    5: rowTree,
    6: rowTree,
    7: rowTree
};

export const mapEnvironment: MapEnv = {
    1: "water",
    2: "tree",
    3: "sand",
    4: "path",
    5: "grass",
    6: "tallGrass",
    7: "building",
    8: "door",
    9: "roof"
};

