import React, { useEffect, useState } from "react";
import useGameControll from "../utils/useGameControll";
import { slideNext, slidePrev } from "../../../utils/slideList";
import { BagState, TeeTooMonState } from "../../../utils/types";
import useTimeOut from "../../../utils/useTimeOut";
import { addClassName } from "../../../utils/addClassName";
import { crossReturn as returnImg } from "../../../img/others";
import { gold as goldImg } from "../../../img/item";
import getDataBag from "../../../utils/bag/getDataBag";
import { PortraitTeamSlide, BoxInteractBag, BoxConfirmBag } from "..";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";

type GameBagProps = {
  bag: Array<BagState>;
  setSubPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
  gold: number;
  team: Array<TeeTooMonState>;
  monInFight?: number;
  usingInFight?: (model_id: number) => void;
  petStore: Array<TeeTooMonState>;
};

const GameBag = ({
  bag,
  setSubPanel,
  panel,
  gold,
  team,
  monInFight,
  usingInFight,
  petStore,
}: GameBagProps) => {
  const controll = useGameControll();
  const [interact, setInteract] = useState(false);
  const [changeOrder, setChangeOrder] = useState(false);
  const [itemUse, setItemUse] = useState(false);
  const [confirmUse, setConfirmUse] = useState(false);
  const [targetMon, setTargetMon] = useState(0);
  const [idInteract, setIdInteract] = useState(0);
  const [idSecondInteract, setIdSecondInteract] = useState(0);
  const [countBag, setCountBag] = useState(0);

  const canOutFight = (index: number) => {
    let effect = getDataBag(bag[index].model_id).effect;
    return (
      effect === "recoverMana" || effect === "recoverPV" || effect === "lvlUp"
    );
  };
  const canInFight = (index: number) => {
    let effect = getDataBag(bag[index].model_id).effect;
    let gatchaPossible = () => {
      return effect === "gatcha" && (team.length < 6 || petStore.length < 30);
    };
    let possible = gatchaPossible();
    return effect === "recoverMana" || effect === "recoverPV" || possible;
  };

  const resetInteract = () => {
    setInteract(false);
    setChangeOrder(false);
    setItemUse(false);
    setConfirmUse(false);
  };

  //close bag
  const [fadeOut, setFadeOut] = useState(false);
  const closeBag = () => {
    addClassName("fade_out", ".container_game_bag", 0);
    setFadeOut(true);
  };
  useTimeOut(() => setSubPanel("none"), fadeOut ? 700 : null);

  // slide item bag
  useEffect(() => {
    if (!interact && !itemUse && !confirmUse && bag.length > 0) {
      if (controll.onlyQ) {
        setCountBag(slidePrev(countBag, ".item_game_bag"));
      }
      if (controll.onlyD) {
        setCountBag(slideNext(countBag, ".item_game_bag"));
      }
    } // eslint-disable-next-line
  }, [controll.onlyQ, controll.onlyD]);

  //interact item bag
  useNonInitialEffect(() => {
    if (!interact && !itemUse && !confirmUse) {
      if (controll.e) {
        if (!changeOrder) {
          closeBag();
        } else {
          setChangeOrder(false);
        }
      }
      if (controll.a && bag.length > 0) {
        if (
          (panel === "fight" && canInFight(countBag)) ||
          (panel !== "fight" && !(bag.length <= 1 && !canOutFight(countBag)))
        ) {
          if (!changeOrder) {
            setIdInteract(countBag);
            setIdSecondInteract(countBag);
            setInteract(true);
          } else {
            setIdSecondInteract(countBag);
            setConfirmUse(true);
          }
        }
      }
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  const handleInteract = (index: number) => {
    if (!interact && !itemUse && !confirmUse) {
      if (
        (panel === "fight" && canInFight(index)) ||
        (panel !== "fight" && !(bag.length <= 1 && !canOutFight(index)))
      ) {
        if (!changeOrder) {
          setIdInteract(index);
          setIdSecondInteract(index);
          setInteract(true);
        } else {
          setIdSecondInteract(index);
          setConfirmUse(true);
        }
      }
    } else {
      resetInteract();
    }
  };

  return (
    <div className="container_game_bag">
      <img
        className="return_game_bag"
        src={returnImg}
        alt="return button"
        onClick={closeBag}
      />
      {bag.map((bag: BagState, index: number) => {
        let data = getDataBag(bag.model_id);
        return (
          <div
            key={index}
            className="container_item_game_bag"
            onClick={() => handleInteract(index)}
          >
            <div
              className={
                "item_game_bag" +
                (((interact || itemUse || changeOrder) &&
                  idInteract === index) ||
                (changeOrder && idSecondInteract === index)
                  ? " select"
                  : "")
              }
            >
              <div className="header_item_bag">
                <div className="container_img_game_bag">
                  <img
                    className="img_game_bag"
                    src={data.img}
                    alt="item from bag"
                  />
                </div>
                <div className="name_item_bag">{data.name}</div>
                <div className="amount_item_bag">x{bag.amount}</div>
              </div>
              <div className="description_item_bag">{data.description}</div>
            </div>
          </div>
        );
      })}
      {itemUse && panel !== "fight" ? (
        <PortraitTeamSlide
          team={team}
          controll={controll}
          setItemUse={setItemUse}
          confirmUse={confirmUse}
          setConfirmUse={setConfirmUse}
          setTargetMon={setTargetMon}
        />
      ) : null}
      {interact ? (
        <BoxInteractBag
          controll={controll}
          panel={panel}
          bag={bag}
          setInteract={setInteract}
          canOutFight={canOutFight}
          canInFight={canInFight}
          setChangeOrder={setChangeOrder}
          setItemUse={setItemUse}
          setConfirmUse={setConfirmUse}
          monInFight={monInFight}
          setTargetMon={setTargetMon}
          idInteract={idInteract}
        />
      ) : null}
      {confirmUse ? (
        <BoxConfirmBag
          controll={controll}
          panel={panel}
          changeOrder={changeOrder}
          itemUse={itemUse}
          resetInteract={resetInteract}
          bag={bag}
          targetMon={targetMon}
          idInteract={idInteract}
          idSecondInteract={idSecondInteract}
          usingInFight={usingInFight}
          closeBag={closeBag}
        />
      ) : null}
      <div className="container_gold_bag">
        <div className="container_img_gold_bag">
          <img className="img_gold_bag" src={goldImg} alt="gold coin" />
        </div>
        <div className="numeric_gold_bag">
          {gold >= 10000 ? Math.round(gold / 1000) + "K" : gold}
        </div>
      </div>
    </div>
  );
};

export default GameBag;
