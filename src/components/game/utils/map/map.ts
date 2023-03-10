import { waterMap, treeMap } from "./plainMap";
import { DataMap } from "../../../../utils/types";
import * as map from "./dataMap";

const dataMap: DataMap = {
    //row1
    "1-1": waterMap,
    "1-2": waterMap,
    "1-3": waterMap,
    "1-4": waterMap,
    "1-5": waterMap,
    "1-6": waterMap,
    "1-7": waterMap,
    "1-8": waterMap,
    "1-9": waterMap,
    //row2
    "2-1": map.row2.map21,
    "2-2": map.row2.map22,
    "2-3": map.row2.map23,
    "2-4": map.row2.map24,
    "2-5": treeMap,
    "2-6": treeMap,
    "2-7": treeMap,
    "2-8": treeMap,
    "2-9": treeMap,
    //row3
    "3-1": treeMap,
    "3-2": map.row3.map32,
    "3-3": map.row3.map33,
    "3-4": map.row3.map34,
    "3-5": treeMap,
    "3-6": treeMap,
    "3-7": treeMap,
    "3-8": treeMap,
    "3-9": treeMap,
    //row4
    "4-1": treeMap,
    "4-2": map.row4.map42,
    "4-3": map.row4.map43,
    "4-4": map.row4.map44,
    "4-5": treeMap,
    "4-6": treeMap,
    "4-7": treeMap,
    "4-8": treeMap,
    "4-9": treeMap,
    //row5
    "5-1": treeMap,
    "5-2": map.row5.map52,
    "5-3": map.row5.map53,
    "5-4": map.row5.map54,
    "5-5": treeMap,
    "5-6": treeMap,
    "5-7": treeMap,
    "5-8": treeMap,
    "5-9": treeMap,
    //row6
    "6-1": treeMap,
    "6-2": map.row6.map62,
    "6-3": map.row6.map63,
    "6-4": map.row6.map64,
    "6-5": treeMap,
    "6-6": treeMap,
    "6-7": treeMap,
    "6-8": treeMap,
    "6-9": treeMap,
    //row7
    "7-1": treeMap,
    "7-2": map.row7.map72,
    "7-3": treeMap,
    "7-4": treeMap,
    "7-5": treeMap,
    "7-6": treeMap,
    "7-7": treeMap,
    "7-8": treeMap,
    "7-9": treeMap,
    //row8
    "8-1": treeMap,
    "8-2": map.row8.map82,
    "8-3": treeMap,
    "8-4": treeMap,
    "8-5": treeMap,
    "8-6": treeMap,
    "8-7": treeMap,
    "8-8": treeMap,
    "8-9": treeMap,
    //row9
    "9-1": treeMap,
    "9-2": treeMap,
    "9-3": treeMap,
    "9-4": treeMap,
    "9-5": treeMap,
    "9-6": treeMap,
    "9-7": treeMap,
    "9-8": treeMap,
    "9-9": treeMap
};

export default dataMap;