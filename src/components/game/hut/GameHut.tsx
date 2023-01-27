import React, { useEffect, useState } from "react";
import useGameControll from "../utils/useGameControll";
import { slideNext, slidePrev, slideReset } from "../../../utils/slideList";
import { BagState, HutText, TeeTooMonState } from "../../../utils/types";
import useTimeOut from "../../../utils/useTimeOut";
import { addClassName } from "../../../utils/addClassName";
import { crossReturn as returnImg } from "../../../img/others";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import { TextHut, MenuHut } from "..";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";

type GameHutProps = {
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  perso: string;
  team: Array<TeeTooMonState>;
  petStore: Array<TeeTooMonState>;
  bag: Array<BagState>;
  gold: number;
};

const GameHut = ({
  setPanel,
  perso,
  team,
  petStore,
  bag,
  gold,
}: GameHutProps) => {
  const dispatch = useDispatch();
  const controll = useGameControll();
  const [textId, setTextId] = useState<HutText>({ id: 0 });
  const [merchant, setMerchant] = useState(false);
  const [storage, setStorage] = useState(false);
  const [countHut, setCountHut] = useState(0);

  //Heal whole team when enter hut
  useEffect(() => {
    dispatch(gameSlice.actions.setFullRecovery()); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!merchant && !storage) {
      setCountHut(slideReset(countHut, `.item_select_hut`));
    } // eslint-disable-next-line
  }, [merchant, storage]);

  //Close hut
  const [fadeOut, setFadeOut] = useState(false);
  const closeHut = () => {
    addClassName("fade_out", ".container_game_hut", 0);
    setFadeOut(true);
  };
  useTimeOut(
    () => {
      setPanel("game");
    },
    fadeOut ? 700 : null
  );

  useEffect(() => {
    if (!merchant && !storage) {
      if (controll.onlyQ) {
        setCountHut(slidePrev(countHut, ".item_select_hut"));
      }
      if (controll.onlyD) {
        setCountHut(slideNext(countHut, ".item_select_hut"));
      }
    } // eslint-disable-next-line
  }, [controll.onlyQ, controll.onlyD]);

  useNonInitialEffect(() => {
    if (!merchant && !storage) {
      if (controll.e) {
        closeHut();
      }
      if (controll.a) {
        if (countHut === 0) {
          setMerchant(true);
          setTextId({ id: 1 });
        }
        if (countHut === 1) {
          setStorage(true);
          setTextId({ id: 2 });
        }
      }
    } // eslint-disable-next-line
  }, [controll.e, controll.a]);

  return (
    <div className="container_game_hut">
      <img
        className="return_game_hut"
        src={returnImg}
        alt="return button"
        onClick={closeHut}
      />
      <TextHut perso={perso} data={textId} />
      {!merchant && !storage ? (
        <div className="container_select_hut">
          <div
            className="item_select_hut"
            onClick={() => {
              setMerchant(true);
              setTextId({ id: 1 });
            }}
          >
            Merchant
          </div>
          <div
            className="item_select_hut"
            onClick={() => {
              setStorage(true);
              setTextId({ id: 2 });
            }}
          >
            Storage
          </div>
        </div>
      ) : null}
      {merchant || storage ? (
        <MenuHut
          team={team}
          petStore={petStore}
          bag={bag}
          gold={gold}
          setTextId={setTextId}
          merchant={merchant}
          setMerchant={setMerchant}
          setStorage={setStorage}
          controll={controll}
        />
      ) : null}
    </div>
  );
};

export default GameHut;
