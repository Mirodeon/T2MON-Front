import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import { slideNext, slidePrev } from "../../../utils/slideList";
import { GameState } from "../../../utils/types";
import useMouseClick from "../../../utils/useMouseClick";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";
import saveGame from "../utils/saveGame";
import useGameControll from "../utils/useGameControll";

type GameSaveProps = {
  user_id?: number;
  game: GameState;
  setPanel: React.Dispatch<React.SetStateAction<string>>;
};

const GameSave = ({ user_id, game, setPanel }: GameSaveProps) => {
  const [countInteract, setCountInteract] = useState(0);
  const [phase, setPhase] = useState("init");
  const controll = useGameControll();
  const boxClick = useMouseClick(".container_save");
  const nextControll = controll.a || controll.e || boxClick;
  const dispatch = useDispatch();

  const saveHandler = async () => {
    setPhase("saving");
    if (user_id) {
      try {
        let save = await saveGame(game, user_id);
        dispatch(gameSlice.actions.setActivityOn(save));
        if (save) {
          setPhase("done");
        }
      } catch (e) {
        console.log(e);
        setPhase("fail");
      }
    } else {
      setPhase("user");
    }
  };

  useEffect(() => {
    if (phase === "init") {
      if (controll.onlyZ) {
        setCountInteract(slidePrev(countInteract, ".item_interact_save"));
      }
      if (controll.onlyS) {
        setCountInteract(slideNext(countInteract, ".item_interact_save"));
      }
    } // eslint-disable-next-line
  }, [controll.onlyZ, controll.onlyS]);

  useNonInitialEffect(() => {
    if (phase === "init") {
      if (controll.e || (controll.a && countInteract === 1)) {
        setPanel("menu");
      }
      if (controll.a && countInteract === 0) {
        saveHandler();
      }
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);
  useNonInitialEffect(() => {
    if (phase !== "init" && phase !== "saving" && nextControll) {
      setPanel("menu");
    } // eslint-disable-next-line
  }, [nextControll]);

  return (
    <div className="container_save">
      <div className="txt_save">
        {phase === "init"
          ? "Do you want to save?"
          : phase === "saving"
          ? "Saving..."
          : phase === "done"
          ? "Done!"
          : phase === "user"
          ? "The user id could not be found."
          : "Save could not be completed."}
        <span className="blink"> &#x25BC;</span>
      </div>
      {phase === "init" ? (
        <div className="container_interact_save">
          <div className="item_interact_save" onClick={saveHandler}>
            YES
          </div>
          <div
            className="item_interact_save"
            onClick={() => {
              setPanel("menu");
            }}
          >
            NO
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GameSave;
