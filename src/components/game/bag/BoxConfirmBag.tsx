import React, { useEffect, useState } from "react";
import { slideNext, slidePrev } from "../../../utils/slideList";
import { BagState, ControllActivity } from "../../../utils/types";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import getDataBag from "../../../utils/bag/getDataBag";

type BoxConfirmBagProps = {
  controll: ControllActivity;
  panel: string;
  changeOrder: boolean;
  itemUse: boolean;
  resetInteract: () => void;
  bag: Array<BagState>;
  targetMon: number;
  idInteract: number;
  idSecondInteract: number;
  usingInFight?: (model_id: number) => void;
  closeBag: () => void;
};

const BoxConfirmBag = ({
  controll,
  panel,
  changeOrder,
  itemUse,
  resetInteract,
  bag,
  targetMon,
  idInteract,
  idSecondInteract,
  usingInFight,
  closeBag,
}: BoxConfirmBagProps) => {
  const [countConfirm, setCountConfirm] = useState(0);
  const dispatch = useDispatch();
  const itemInUse = getDataBag(bag[idInteract].model_id);

  const changeOrderBag = () => {
    dispatch(
      gameSlice.actions.setOrderBag([
        {
          index: idInteract,
          order: idSecondInteract + 1,
        },
        {
          index: idSecondInteract,
          order: idInteract + 1,
        },
      ])
    );
  };

  const confirmAction = () => {
    if (changeOrder) {
      changeOrderBag();
    }
    if (itemUse) {
      dispatch(
        gameSlice.actions.setUseItem({
          effect: itemInUse.effect,
          mon: targetMon,
        })
      );
      if (bag[idInteract].amount - 1 > 0) {
        dispatch(
          gameSlice.actions.setAmountBag({
            index: idInteract,
            amount: bag[idInteract].amount - 1,
          })
        );
      } else {
        dispatch(
          gameSlice.actions.setDeleteItemBag({
            index: idInteract,
            order: idInteract + 1,
          })
        );
      }
      if (panel === "fight" && usingInFight) {
        usingInFight(bag[idInteract].model_id);
        closeBag();
      }
    }
    resetInteract();
  };
  // slide interact
  useEffect(() => {
    if (controll.onlyZ) {
      setCountConfirm(slidePrev(countConfirm, ".item_confirm_bag"));
    }
    if (controll.onlyS) {
      setCountConfirm(slideNext(countConfirm, ".item_confirm_bag"));
    } // eslint-disable-next-line
  }, [controll.onlyZ, controll.onlyS]);

  useNonInitialEffect(() => {
    if (controll.e) {
      resetInteract();
    }
    if (controll.a) {
      if (countConfirm === 0) {
        confirmAction();
      } else {
        resetInteract();
      }
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);
  return (
    <div className="container_confirm_bag">
      <div className="item_confirm_bag" onClick={confirmAction}>
        Confirm {changeOrder ? "change" : "use"}
      </div>
      <div className="item_confirm_bag" onClick={resetInteract}>
        Cancel
      </div>
    </div>
  );
};

export default BoxConfirmBag;
