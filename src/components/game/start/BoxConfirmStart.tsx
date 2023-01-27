import React, { useEffect, useState } from "react";
import { slideNext, slidePrev } from "../../../utils/slideList";
import { BagState, ControllActivity, DataMon } from "../../../utils/types";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";

type BoxConfirmStartProps = {
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  controll: ControllActivity;
  closeStart: () => void;
  chosenMon: DataMon;
  chosenBag: BagState;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoxConfirmStart = ({
  setConfirm,
  controll,
  closeStart,
  chosenMon,
  chosenBag,
  setDone,
}: BoxConfirmStartProps) => {
  const [countConfirm, setCountConfirm] = useState(0);
  const dispatch = useDispatch();
  const confirmStart = () => {
    dispatch(gameSlice.actions.setAddMonTeam(chosenMon));
    dispatch(gameSlice.actions.setAddItemBag(chosenBag));
    dispatch(gameSlice.actions.setGainGold(100));
    closeStart();
    setDone(true);
    setConfirm(false);
  };
  useEffect(() => {
    if (controll.onlyZ) {
      setCountConfirm(slidePrev(countConfirm, ".item_confirm_start"));
    }
    if (controll.onlyS) {
      setCountConfirm(slideNext(countConfirm, ".item_confirm_start"));
    } // eslint-disable-next-line
  }, [controll.onlyZ, controll.onlyS]);

  useNonInitialEffect(() => {
    if (controll.e || (controll.a && countConfirm === 1)) {
      setConfirm(false);
    }
    if (controll.a && countConfirm === 0) {
      confirmStart();
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  return (
    <div className="container_confirm_start">
      <div className="item_confirm_start" onClick={confirmStart}>
        Start
      </div>
      <div className="item_confirm_start" onClick={() => setConfirm(false)}>
        Cancel
      </div>
    </div>
  );
};

export default BoxConfirmStart;
