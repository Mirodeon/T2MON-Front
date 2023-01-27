import React from "react";
import { GameMap } from "..";

type GameBoardProps = {
  position: string;
};
const GameBoard = ({ position }: GameBoardProps) => {
  let r = parseInt(position.split("-")[0]);
  let c = parseInt(position.split("-")[1]);

  return (
    <div className="container_board_game">
      <GameMap
        mapPos={"left_up_map"}
        mapId={String(r + 1) + "-" + String(c - 1)}
      />
      <GameMap mapPos={"up_map"} mapId={String(r + 1) + "-" + c} />
      <GameMap
        mapPos={"right_up_map"}
        mapId={String(r + 1) + "-" + String(c + 1)}
      />
      <GameMap mapPos={"left_map"} mapId={r + "-" + String(c - 1)} />
      <GameMap mapPos={"center_map"} mapId={r + "-" + c} />
      <GameMap mapPos={"right_map"} mapId={r + "-" + String(c + 1)} />
      <GameMap
        mapPos={"left_down_map"}
        mapId={String(r - 1) + "-" + String(c - 1)}
      />
      <GameMap mapPos={"down_map"} mapId={String(r - 1) + "-" + c} />
      <GameMap
        mapPos={"right_down_map"}
        mapId={String(r - 1) + "-" + String(c + 1)}
      />
    </div>
  );
};

export default GameBoard;
