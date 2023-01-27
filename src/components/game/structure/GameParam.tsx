import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { slideNext, slidePrev, slideReset } from "../../../utils/slideList";
import useGameControll from "../utils/useGameControll";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import keyboardSettingsSlice from "../../../store/slices/keyboardSettings";

type GameMenuProps = {
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
  setSubPanel: React.Dispatch<React.SetStateAction<string>>;
  menuActive: boolean;
  subPanel: string;
};

const GameParam = ({
  setPanel,
  panel,
  setSubPanel,
  menuActive,
  subPanel,
}: GameMenuProps) => {
  const [count, setCount] = useState(0);
  const keyboard = useSelector((state: RootState) => state.keyboard);
  const controll = useGameControll();
  const dispatch = useDispatch();

  useEffect(() => {
    if (panel === "param") {
      setCount(slideReset(count, `.item_game_param`));
    } // eslint-disable-next-line
  }, [panel, subPanel]);

  useEffect(() => {
    if (panel === "param" && subPanel === "none") {
      if (controll.onlyZ) {
        setCount(slidePrev(count, `.item_game_param`));
      }
      if (controll.onlyS) {
        setCount(slideNext(count, `.item_game_param`));
      }
    } // eslint-disable-next-line
  }, [controll.onlyZ, controll.onlyS]);

  useEffect(() => {
    if (panel === "param" && subPanel === "none") {
      if (controll.a) {
        if (count === 0) {
          handleKeyboard();
        }
        if (count === 1) {
          handleReturn();
        }
      }
      if (controll.e) {
        handleReturn();
      }
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  const handleKeyboard = () => {
    dispatch(keyboardSettingsSlice.actions.setSettings());
    window.location.reload();
  };
  const handleReturn = () => {
    setSubPanel("none");
    setPanel("game");
  };
  const handleError = () => {
    console.log("Settings are actually not accessible.");
  };

  return (
    <div
      className={"container_game_menu" + (panel === "param" ? " active" : "")}
    >
      <div
        className="item_game_param not_param"
        onClick={menuActive ? handleKeyboard : handleError}
      >
        {keyboard.aKey === "a" ? "AZERTY" : "QWERTY"}
      </div>
      <div
        className="item_game_param return_param"
        onClick={menuActive ? handleReturn : handleError}
      >
        Return
      </div>
    </div>
  );
};

export default GameParam;
