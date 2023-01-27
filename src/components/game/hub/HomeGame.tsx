import React from "react";

type HomeGameProps = {
  data: any;
  username?: string;
  setSelectedGame: React.Dispatch<React.SetStateAction<boolean>>;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeGame = ({
  data,
  username,
  setSelectedGame,
  setNewGame,
}: HomeGameProps) => {
  const handleNewGame = () => {
    setSelectedGame(true);
    setNewGame(true);
  };
  const handleSavedGame = () => {
    setSelectedGame(true);
    setNewGame(false);
  };
  return (
    <div className="container_content_game">
      <div className="container_home_game">
        <div className="welcome_game">
          Welcome
          <br />
          {username}
        </div>
        <div className="container_btn_play_game">
          {data.length >= 2 ? (
            <div className="btn_play_game nav_btn" onClick={handleSavedGame}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Unavailable
            </div>
          ) : (
            <div className="btn_play_game nav_btn" onClick={handleNewGame}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              New Game
            </div>
          )}
          <div className="btn_play_game nav_btn" onClick={handleSavedGame}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Saved Games
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGame;
