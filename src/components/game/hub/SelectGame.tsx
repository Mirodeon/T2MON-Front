import React, { useState } from "react";
import { GameList } from "..";
import useHealthCheck from "../../../utils/useHealthCheck";
import useTimeOut from "../../../utils/useTimeOut";
import { Status } from "../../profile";

type SavedGamesProps = {
  data: any;
  setSelectedGame: React.Dispatch<React.SetStateAction<boolean>>;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
};

const SelectGames = ({
  data,
  setSelectedGame,
  setNewGame,
  setReload,
  reload,
}: SavedGamesProps) => {
  const [connect, setConnect] = useState(false);
  const status = useHealthCheck();

  useTimeOut(
    () => {
      setConnect(true);
    },
    status === "success" ? 2100 : null
  );

  const classNameStatus =
    status === "pending"
      ? " wait_check"
      : status === "failed"
      ? " fail_check"
      : connect
      ? ""
      : " success_check";

  const handleUnselectedGame = () => {
    setSelectedGame(false);
    setNewGame(false);
  };

  return (
    <div className="container_content_game">
      <div className="container_select_game">
        <div className="title_select_game">Select saved games</div>
        {connect ? (
          <GameList
            data={data}
            available={true}
            setReload={setReload}
            reload={reload}
          />
        ) : (
          <Status status={status} classNameStatus={classNameStatus} />
        )}
        <div className="container_btn_play_game">
          <div className="btn_play_game nav_btn" onClick={handleUnselectedGame}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            return
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectGames;
