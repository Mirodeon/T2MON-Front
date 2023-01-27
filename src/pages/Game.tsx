import React, { useState, useEffect } from "react";
import {
  HomeGame,
  NewGame,
  SelectGame,
  DirectionalPad,
  GameScreen,
  MenuPad,
} from "../components/game";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { fetcher } from "../utils/axios";

const Game = () => {
  const game = useSelector((state: RootState) => state.game);
  const gameActivity = game.is_active;
  const account = useSelector((state: RootState) => state.auth.account);
  const username = account?.username;
  const user_id = account?.id;
  const [selectedGame, setSelectedGame] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [fetchSave, setFetchSave] = useState([]);
  const [reload, setReload] = useState(true);
  const [direction, setDirection] = useState("down");
  const [moving, setMoving] = useState(false);
  const [panel, setPanel] = useState("game");
  const [subPanel, setSubPanel] = useState("none");

  document.title = `TeeTooMon - Game${username ? `: ${username}` : ""}`;

  useEffect(() => {
    const fetchData = () => {
      fetcher(`/game/`)
        .then((data) => {
          const dataArray = data.map((i: any) => i);
          setFetchSave(dataArray);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [reload, gameActivity]);

  return (
    <div className="container_page_game">
      <main className="container_game">
        {gameActivity ? (
          <GameScreen
            data={game}
            direction={direction}
            moving={moving}
            setPanel={setPanel}
            panel={panel}
            user_id={user_id}
            setSubPanel={setSubPanel}
            subPanel={subPanel}
          />
        ) : !selectedGame && fetchSave ? (
          <HomeGame
            data={fetchSave}
            username={username}
            setSelectedGame={setSelectedGame}
            setNewGame={setNewGame}
          />
        ) : newGame && fetchSave ? (
          <NewGame
            setSelectedGame={setSelectedGame}
            setNewGame={setNewGame}
            setReload={setReload}
            reload={reload}
          />
        ) : fetchSave ? (
          <SelectGame
            data={fetchSave}
            setSelectedGame={setSelectedGame}
            setNewGame={setNewGame}
            setReload={setReload}
            reload={reload}
          />
        ) : (
          <div
            style={{ textAlign: "center" }}
            className="container_content_game"
          >
            <p className="">Loading ...</p>
          </div>
        )}
        {gameActivity && game.position ? (
          <DirectionalPad
            position={game.position === "start" ? "3-2-6-13" : game.position}
            setDirection={setDirection}
            setMoving={setMoving}
            moving={moving}
            setPanel={setPanel}
            panel={panel}
            subPanel={subPanel}
          />
        ) : null}
      </main>
      {gameActivity && game.position !== "start" ? (
        <MenuPad
          setPanel={setPanel}
          panel={panel}
          setMoving={setMoving}
          setSubPanel={setSubPanel}
        />
      ) : null}
    </div>
  );
};

export default Game;
