import React from "react";

type MapSquareProps = {
  env: string;
  mapId: string;
  row: number;
  column: number;
};

const MapSquare = ({ env, mapId, row, column }: MapSquareProps) => {
  let squareId = `${mapId}-${row}-${column}`;
  return <div className={env + " mapSquare"} id={squareId}></div>;
};

export default MapSquare;
