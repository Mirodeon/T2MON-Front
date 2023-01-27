import React, { useEffect, useState } from "react";
import { slideNext, slidePrev } from "../../../utils/slideList";
import { BagState, ControllActivity } from "../../../utils/types";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";

type BoxInteractBagProps = {
  controll: ControllActivity;
  panel: string;
  bag: Array<BagState>;
  setInteract: React.Dispatch<React.SetStateAction<boolean>>;
  canOutFight: (index: number) => boolean;
  canInFight: (index: number) => boolean;
  setChangeOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setItemUse: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmUse: React.Dispatch<React.SetStateAction<boolean>>;
  monInFight?: number;
  setTargetMon: React.Dispatch<React.SetStateAction<number>>;
  idInteract: number;
};

const BoxInteractBag = ({
  controll,
  panel,
  bag,
  setInteract,
  canOutFight,
  canInFight,
  setChangeOrder,
  setItemUse,
  setConfirmUse,
  monInFight,
  setTargetMon,
  idInteract,
}: BoxInteractBagProps) => {
  const [countInteract, setCountInteract] = useState(0);

  const handleItemUse = () => {
    /*use an item in fight*/
    if (
      panel === "fight" &&
      canInFight(idInteract) &&
      countInteract === 0 &&
      (monInFight || monInFight === 0)
    ) {
      setTargetMon(monInFight);
      setItemUse(true);
      setConfirmUse(true);
      setInteract(false);
    }
    /*use an item out fight, acces to portrait team*/
    if (panel !== "fight" && canOutFight(idInteract) && countInteract === 0) {
      setItemUse(true);
      setInteract(false);
    }
  };

  // slide interact
  useEffect(() => {
    if (controll.onlyZ) {
      setCountInteract(slidePrev(countInteract, ".item_interact_bag"));
    }
    if (controll.onlyS) {
      setCountInteract(slideNext(countInteract, ".item_interact_bag"));
    } // eslint-disable-next-line
  }, [controll.onlyZ, controll.onlyS]);

  useNonInitialEffect(() => {
    if (controll.e) {
      setInteract(false);
    }
    if (controll.a) {
      handleItemUse();
      /*changer ordre*/
      if (
        (panel !== "fight" &&
          !canOutFight(idInteract) &&
          countInteract === 0) ||
        (panel !== "fight" &&
          canOutFight(idInteract) &&
          countInteract === 1 &&
          bag.length > 1)
      ) {
        setChangeOrder(true);
        setInteract(false);
      }
      /*Cancel interact*/
      if (
        (panel === "fight" && canInFight(idInteract) && countInteract === 1) ||
        (panel !== "fight" &&
          canOutFight(idInteract) &&
          countInteract === 1 &&
          bag.length <= 1) ||
        (panel !== "fight" &&
          canOutFight(idInteract) &&
          countInteract === 2 &&
          bag.length > 1) ||
        (panel !== "fight" && !canOutFight(idInteract) && countInteract === 1)
      ) {
        setInteract(false);
      }
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  return (
    <div className="container_interact_bag">
      {(panel === "fight" && canInFight(idInteract)) ||
      (panel !== "fight" && canOutFight(idInteract)) ? (
        <div className="item_interact_bag" onClick={handleItemUse}>
          Use
        </div>
      ) : null}
      {panel !== "fight" && bag.length > 1 ? (
        <div
          className="item_interact_bag"
          onClick={() => {
            setChangeOrder(true);
            setInteract(false);
          }}
        >
          Change order
        </div>
      ) : null}
      <div className="item_interact_bag" onClick={() => setInteract(false)}>
        Cancel
      </div>
    </div>
  );
};

export default BoxInteractBag;
