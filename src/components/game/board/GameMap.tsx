import React from "react";
import dataMap from "../utils/map/map";
import { mapEnvironment } from "../utils/map/plainMap";
import { MapSquare } from "..";

type GameMapProps = {
  mapPos: string;
  mapId: string;
};

const GameMap = ({ mapPos, mapId }: GameMapProps) => {
  const mapSquare = [];
  let i = 1;
  for (let r = 1; r <= 7; r++) {
    for (let c = 1; c <= 15; c++) {
      let keyEnv = dataMap[mapId][r][c];
      let env = mapEnvironment[keyEnv];
      mapSquare.push(
        <MapSquare key={i} env={env} mapId={mapId} row={r} column={c} />
      );
      i++;
    }
  }
  return (
    <div className={mapPos + " container_map_game"} id={mapId}>
      {mapSquare}
    </div>
  );
};
export default GameMap;
