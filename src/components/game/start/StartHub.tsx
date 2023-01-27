import React, { useEffect, useState } from "react";
import { addClassName } from "../../../utils/addClassName";
import getDataMon from "../../../utils/t2mon/getDataMon";
import useGameControll from "../utils/useGameControll";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import { crossReturn as returnImg } from "../../../img/others";
import useTimeOut from "../../../utils/useTimeOut";
import { BagState } from "../../../utils/types";
import { BoxConfirmStart, SelectMonStart, SelectBagStart } from "..";

type StartHubProps = {
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
  perso: string;
};

const StartHub = ({ setPanel, panel, perso }: StartHubProps) => {
  useEffect(() => {
    setPanel("start"); // eslint-disable-next-line
  }, []);
  const controll = useGameControll();
  const [selectMon, setSelectMon] = useState(false);
  const [selectBag, setSelectBag] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [idMon, setIdMon] = useState(0);
  const [idBag, setIdBag] = useState(0);
  const dispatch = useDispatch();
  const mon = () => {
    let data = [];
    for (let i = 1; i <= 12; i++) {
      data[i - 1] = getDataMon(i, 3);
    }
    return data;
  };
  const bag = () => {
    let data: BagState[] = [];
    for (let i = 1; i <= 4; i++) {
      data[i - 1] = {
        game_id: 0,
        model_id: i,
        order: 0,
        amount: i === 1 || i === 4 ? 10 : i === 2 ? 5 : 2,
      };
    }
    return data;
  };
  const dataMon = mon();
  const dataBag = bag();

  //Close StartHub
  const [fadeOut, setFadeOut] = useState(false);
  const closeStart = () => {
    addClassName("fade_out", ".container_start_hub", 0);
    setFadeOut(true);
  };
  useTimeOut(
    () => {
      setPanel("game");
      dispatch(gameSlice.actions.setPosition({ position: "3-2-6-13" }));
    },
    fadeOut ? 4800 : null
  );

  useNonInitialEffect(() => {
    if (panel === "start" && !selectMon && !selectBag && !confirm && !done) {
      if (controll.e) {
        setPanel("game");
        dispatch(gameSlice.actions.setActivityOff());
      }
      if (controll.a) {
        setSelectMon(true);
      }
    } // eslint-disable-next-line
  }, [controll.e, controll.a]);

  return (
    <div className="container_start_hub">
      {!done ? (
        <img
          className="return_game_start"
          src={returnImg}
          alt="return button"
          onClick={() => {
            setPanel("game");
            dispatch(gameSlice.actions.setActivityOff());
          }}
        />
      ) : null}
      <div className="header_start_hub">
        {selectMon ? (
          <>
            Choose your first slave!
            <br />
            Ahem... first friend.
          </>
        ) : selectBag ? (
          <>
            Now {perso}, I give you this.
            <br />
            Choose wisely.
          </>
        ) : confirm ? (
          <>
            Are you done?
            <br />
            Press start.
          </>
        ) : done ? (
          <>
            Congratulations {perso}.<br /> Have fun!
          </>
        ) : (
          <>
            Welcome adventurer!
            <br />
            Start your new journey {perso}!
          </>
        )}
        <span className="blink"> &#x25BC;</span>
      </div>
      {!selectMon && !selectBag && !confirm && !done ? (
        <div className="confirm_start_hub" onClick={() => setSelectMon(true)}>
          Start
        </div>
      ) : null}
      {selectMon && !done ? (
        <SelectMonStart
          setIdMon={setIdMon}
          setSelectMon={setSelectMon}
          dataMon={dataMon}
          controll={controll}
          setSelectBag={setSelectBag}
        />
      ) : null}
      {selectBag && !done ? (
        <SelectBagStart
          setIdBag={setIdBag}
          setSelectMon={setSelectMon}
          dataBag={dataBag}
          controll={controll}
          setConfirm={setConfirm}
          confirm={confirm}
          setSelectBag={setSelectBag}
        />
      ) : null}
      {confirm && !done ? (
        <BoxConfirmStart
          setConfirm={setConfirm}
          controll={controll}
          closeStart={closeStart}
          chosenMon={dataMon[idMon]}
          chosenBag={dataBag[idBag]}
          setDone={setDone}
        />
      ) : null}
    </div>
  );
};

export default StartHub;
