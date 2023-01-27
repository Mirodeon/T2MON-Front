import React from "react";
import { GameList } from "..";

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
  const handleUnselectedGame = () => {
    setSelectedGame(false);
    setNewGame(false);
  };

  return (
    <div className="container_content_game">
      <div className="container_select_game">
        <div className="title_select_game">Select saved games</div>
        <GameList
          data={data}
          available={true}
          setReload={setReload}
          reload={reload}
        />
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
