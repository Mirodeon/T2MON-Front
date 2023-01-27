import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import { slideNext, slidePrev, slideReset } from "../../../utils/slideList";
import useGameControll from "../utils/useGameControll";

type GameMenuProps = {
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
  setSubPanel: React.Dispatch<React.SetStateAction<string>>;
  menuActive: boolean;
  subPanel: string;
};

const GameMenu = ({
  setPanel,
  panel,
  setSubPanel,
  menuActive,
  subPanel,
}: GameMenuProps) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const controll = useGameControll();

  useEffect(() => {
    if (panel === "menu") {
      setCount(slideReset(count, `.item_game_menu`));
    } // eslint-disable-next-line
  }, [panel, subPanel]);

  useEffect(() => {
    if (panel === "menu" && subPanel === "none") {
      if (controll.onlyZ) {
        setCount(slidePrev(count, `.item_game_menu`));
      }
      if (controll.onlyS) {
        setCount(slideNext(count, `.item_game_menu`));
      }
    } // eslint-disable-next-line
  }, [controll.onlyZ, controll.onlyS]);

  useEffect(() => {
    if (panel === "menu" && subPanel === "none") {
      if (controll.a) {
        if (count === 0) {
          monHandler();
        } //team
        if (count === 1) {
          bagHandler();
        } //bag
        if (count === 2) {
          saveHandler();
        } //save
        if (count === 3) {
          handleQuit();
        } //quit
        if (count === 4) {
          handleReturn();
        }
      }
      if (controll.e) {
        handleReturn();
      }
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  const monHandler = () => {
    setSubPanel("t2mon");
  };
  const bagHandler = () => {
    setSubPanel("bag");
  };
  const saveHandler = () => {
    setPanel("save");
  };
  const handleQuit = () => {
    setSubPanel("none");
    setPanel("game");
    dispatch(gameSlice.actions.setActivityOff());
  };
  const handleReturn = () => {
    setSubPanel("none");
    setPanel("game");
  };
  const handleError = () => {
    console.log("Menu is actually not accessible.");
  };

  return (
    <div
      className={"container_game_menu" + (panel === "menu" ? " active" : "")}
    >
      <div
        className="item_game_menu teetoomon_menu"
        onClick={menuActive && subPanel === "none" ? monHandler : handleError}
      >
        Team
      </div>
      <div
        className="item_game_menu bag_menu"
        onClick={menuActive && subPanel === "none" ? bagHandler : handleError}
      >
        Bag
      </div>
      <div
        className="item_game_menu save_menu"
        onClick={menuActive && subPanel === "none" ? saveHandler : handleError}
      >
        Save
      </div>
      <div
        className="item_game_menu quit_menu"
        onClick={menuActive && subPanel === "none" ? handleQuit : handleError}
      >
        Quit
      </div>
      <div
        className="item_game_menu return_menu"
        onClick={menuActive && subPanel === "none" ? handleReturn : handleError}
      >
        Return
      </div>
    </div>
  );
};

export default GameMenu;
