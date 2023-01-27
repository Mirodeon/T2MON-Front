import React from "react";
import axiosService from "../../../utils/axios";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import { useHistory } from "react-router-dom";

type GameListProps = {
  data: any;
  available: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
};

const GameList = ({ data, available, setReload, reload }: GameListProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePlayGame = (game: any) => {
    dispatch(
      gameSlice.actions.setActivityOn({
        id: game.id,
        is_active: true,
        name: game.name,
        pseudo: game.pseudo,
        position: game.position,
        gold: game.gold,
        team: game.team,
        petStore: game.petStore,
        bag: game.bag,
      })
    );
    if (!available) {
      history.push("/game");
    }
  };
  const handleDeleteGame = (id: any) => {
    axiosService
      .delete(`/game/${id}/`)
      .then(() => {
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (data?.length > 0) {
    return data.map((game: any, index: any) => {
      let update = new Date(game.updated);
      return (
        <div key={index} className="container_item_gameList">
          <div className="container_text_item_gameList">
            <p className="text_item_gameList">Game: {game.name}</p>
            <p className="text_item_gameList">Character: {game.pseudo}</p>
            <p className="text_item_gameList">
              Update: {update.toDateString()}
            </p>
          </div>
          <div className="container_btn_item_gameList">
            <div
              className="btn_item_gameList nav_btn"
              onClick={() => handlePlayGame(game)}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Play
            </div>
            <div
              className="btn_item_gameList nav_btn"
              onClick={() => handleDeleteGame(game.id)}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Delete
            </div>
          </div>
        </div>
      );
    });
  } else {
    return (
      <div className="container_item_gameList">
        <div className="container_no_item_gameList">
          <p className="no_item_gameList">No saved games.</p>
        </div>
      </div>
    );
  }
};

export default GameList;
