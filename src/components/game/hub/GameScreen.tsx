import React, { useEffect, useState } from "react";
import { GameState } from "../../../utils/types";
import {
  GameBoard,
  Character,
  GameMenu,
  GameParam,
  GameTeam,
  GameFight,
  GameBag,
  StartHub,
  GameHut,
  GameSave,
} from "..";
import isActive from "../../../utils/isActive";
import createFight from "../utils/createFight";
import { DataMon } from "../../../utils/types";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";

type GameScreenProps = {
  data: GameState;
  direction: string;
  moving: boolean;
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
  user_id?: number;
  setSubPanel: React.Dispatch<React.SetStateAction<string>>;
  subPanel: string;
};

const GameScreen = ({
  data,
  direction,
  moving,
  setPanel,
  panel,
  user_id,
  setSubPanel,
  subPanel,
}: GameScreenProps) => {
  const [menuActive, setMenuActive] = useState(
    isActive(".container_game_menu")
  );
  const [isFight, setIsFight] = useState<DataMon | null>(null);

  useEffect(() => {
    setMenuActive(isActive(".container_game_menu"));
  }, [panel]);

  useNonInitialEffect(() => {
    if (data.position && data.team) {
      let fight = createFight(data.position, data.team, 10);
      setIsFight(fight);
    } // eslint-disable-next-line
  }, [data.position]);

  useEffect(() => {
    if (isFight) {
      setPanel("fight");
    } // eslint-disable-next-line
  }, [isFight]);

  return (
    <div className="container_content_game">
      {data.position ? (
        <GameBoard
          position={data.position === "start" ? "3-2-6-13" : data.position}
        />
      ) : null}
      <GameMenu
        setPanel={setPanel}
        panel={panel}
        setSubPanel={setSubPanel}
        menuActive={menuActive}
        subPanel={subPanel}
      />
      <GameParam
        setPanel={setPanel}
        panel={panel}
        setSubPanel={setSubPanel}
        menuActive={menuActive}
        subPanel={subPanel}
      />
      {subPanel === "t2mon" && panel !== "fight" && data.team ? (
        <GameTeam team={data.team} setSubPanel={setSubPanel} panel={panel} />
      ) : null}
      {subPanel === "bag" &&
      panel !== "fight" &&
      data.bag &&
      data.gold &&
      data.team &&
      data.petStore ? (
        <GameBag
          bag={data.bag}
          setSubPanel={setSubPanel}
          panel={panel}
          gold={data.gold}
          team={data.team}
          petStore={data.petStore}
        />
      ) : null}
      {panel === "fight" &&
      isFight &&
      data.team &&
      data.pseudo &&
      data.petStore &&
      data.bag &&
      data.gold ? (
        <GameFight
          team={data.team}
          perso={data.pseudo}
          setPanel={setPanel}
          panel={panel}
          setSubPanel={setSubPanel}
          subPanel={subPanel}
          fightData={isFight}
          petStore={data.petStore}
          bag={data.bag}
          gold={data.gold}
        />
      ) : null}
      <Character direction={direction} moving={moving} />
      {data.position === "start" && data.pseudo ? (
        <StartHub setPanel={setPanel} panel={panel} perso={data.pseudo} />
      ) : null}
      {panel === "hut" &&
      data.pseudo &&
      data.team &&
      data.petStore &&
      data.bag &&
      data.gold ? (
        <GameHut
          setPanel={setPanel}
          perso={data.pseudo}
          team={data.team}
          petStore={data.petStore}
          bag={data.bag}
          gold={data.gold}
        />
      ) : null}
      {panel === "save" ? (
        <GameSave user_id={user_id} game={data} setPanel={setPanel} />
      ) : null}
    </div>
  );
};

export default GameScreen;
