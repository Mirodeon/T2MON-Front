import React, { useEffect, useState } from "react";
import { slideNext, slidePrev, slideReset } from "../../../utils/slideList";
import {
  BagState,
  ControllActivity,
  HutText,
  TeeTooMonState,
} from "../../../utils/types";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";
import { gold as goldImg } from "../../../img/item";
import { GamePetStore, GameMerchant } from "..";

type MenuHutProps = {
  team: Array<TeeTooMonState>;
  petStore: Array<TeeTooMonState>;
  bag: Array<BagState>;
  gold: number;
  setTextId: React.Dispatch<React.SetStateAction<HutText>>;
  merchant: boolean;
  setMerchant: React.Dispatch<React.SetStateAction<boolean>>;
  setStorage: React.Dispatch<React.SetStateAction<boolean>>;
  controll: ControllActivity;
};

const MenuHut = ({
  team,
  petStore,
  bag,
  gold,
  setTextId,
  merchant,
  setMerchant,
  setStorage,
  controll,
}: MenuHutProps) => {
  const [countMenu, setCountMenu] = useState(0);
  const [interactHut, setInteractHut] = useState("menu");

  useEffect(() => {
    if (interactHut === "menu") {
      setCountMenu(slideReset(countMenu, `.item_select_hut.menu`));
    } // eslint-disable-next-line
  }, [interactHut]);

  const checkState = () => {
    let result = { BorD: { txt: 0, panel: "" }, SorT: { txt: 0, panel: "" } };
    if (merchant) {
      result.BorD.txt = 3;
      result.BorD.panel = "buy";
      if (bag.length > 0) {
        result.SorT.txt = 4;
        result.SorT.panel = "sell";
      } else {
        result.SorT.txt = 7;
        result.SorT.panel = "menu";
      }
    } else {
      if (team.length < 6) {
        if (petStore.length > 0) {
          result.SorT.txt = 6;
          result.SorT.panel = "take";
        } else {
          result.SorT.txt = 10;
          result.SorT.panel = "menu";
        }
      } else {
        result.SorT.txt = 8;
        result.SorT.panel = "menu";
      }
      if (team.length <= 1) {
        result.BorD.txt = 9;
        result.BorD.panel = "menu";
      } else {
        result.BorD.txt = 5;
        result.BorD.panel = "drop";
      }
    }
    return result;
  };
  useEffect(() => {
    if (interactHut === "menu") {
      if (controll.onlyQ) {
        setCountMenu(slidePrev(countMenu, ".item_select_hut.menu"));
      }
      if (controll.onlyD) {
        setCountMenu(slideNext(countMenu, ".item_select_hut.menu"));
      }
    } // eslint-disable-next-line
  }, [controll.onlyQ, controll.onlyD]);

  useNonInitialEffect(() => {
    if (interactHut === "menu") {
      if (controll.e || (controll.a && countMenu === 2)) {
        setTextId({ id: 0 });
        setMerchant(false);
        setStorage(false);
      }
      if (controll.a) {
        if (countMenu === 0) {
          setTextId({ id: checkState().BorD.txt });
          setInteractHut(checkState().BorD.panel);
        }
        if (countMenu === 1) {
          setTextId({ id: checkState().SorT.txt });
          setInteractHut(checkState().SorT.panel);
        }
      }
    } // eslint-disable-next-line
  }, [controll.e, controll.a]);

  return (
    <>
      {interactHut === "menu" ? (
        <div className="container_select_hut menu">
          <div
            className="item_select_hut menu"
            onClick={() => {
              setTextId({ id: checkState().BorD.txt });
              setInteractHut(checkState().BorD.panel);
            }}
          >
            {merchant ? "Buy" : "Drop"}
          </div>
          <div
            className="item_select_hut menu"
            onClick={() => {
              setTextId({ id: checkState().SorT.txt });
              setInteractHut(checkState().SorT.panel);
            }}
          >
            {merchant ? "Sell" : "Take"}
          </div>
          <div
            className="item_select_hut menu"
            onClick={() => {
              setTextId({ id: 0 });
              setMerchant(false);
              setStorage(false);
            }}
          >
            Hut
          </div>
        </div>
      ) : null}
      {interactHut === "buy" || interactHut === "sell" ? (
        <>
          <GameMerchant
            bag={bag}
            gold={gold}
            setTextId={setTextId}
            interactHut={interactHut}
            setInteractHut={setInteractHut}
            controll={controll}
          />
          <div className="container_gold_merchant">
            <div className="container_img_gold_merchant">
              <img
                className="img_gold_merchant"
                src={goldImg}
                alt="gold coin"
              />
            </div>
            <div className="numeric_gold_merchant">
              {gold >= 10000 ? Math.round(gold / 1000) + "K" : gold}
            </div>
          </div>
        </>
      ) : null}
      {interactHut === "drop" || interactHut === "take" ? (
        <GamePetStore
          team={team}
          petStore={petStore}
          setTextId={setTextId}
          interactHut={interactHut}
          setInteractHut={setInteractHut}
          controll={controll}
        />
      ) : null}
    </>
  );
};

export default MenuHut;
