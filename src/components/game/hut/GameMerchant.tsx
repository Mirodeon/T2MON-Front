import React, { useEffect, useState } from "react";
import { BagState, ControllActivity, HutText } from "../../../utils/types";
import { addClassName, removeClasseName } from "../../../utils/addClassName";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";
import getDataBag from "../../../utils/bag/getDataBag";
import isActive from "../../../utils/isActive";
import { gold as goldImg } from "../../../img/item";

type GameMerchantProps = {
  bag: Array<BagState>;
  gold: number;
  setTextId: React.Dispatch<React.SetStateAction<HutText>>;
  interactHut: string;
  setInteractHut: React.Dispatch<React.SetStateAction<string>>;
  controll: ControllActivity;
};

const GameMerchant = ({
  bag,
  gold,
  setTextId,
  interactHut,
  setInteractHut,
  controll,
}: GameMerchantProps) => {
  const [countBag, setCountBag] = useState(0);
  const dispatch = useDispatch();
  const data = getDataBag(
    interactHut === "sell" ? bag[countBag].model_id : countBag + 1
  );
  const indexInBag = () => {
    return bag.findIndex((item) => item.model_id === countBag + 1);
  };

  const prev = () => {
    if (countBag > 0) {
      setCountBag(countBag - 1);
    } else {
      setCountBag(interactHut === "sell" ? bag.length - 1 : 3);
    }
  };
  const next = () => {
    if (countBag < (interactHut === "sell" ? bag.length - 1 : 3)) {
      setCountBag(countBag + 1);
    } else {
      setCountBag(0);
    }
  };

  useEffect(() => {
    if (controll.onlyQ) {
      prev();
      addClassName("active", ".container_arrow_merchant.prev", 0);
    }
    if (controll.onlyD) {
      next();
      addClassName("active", ".container_arrow_merchant.next", 0);
    }
    if (isActive(".container_arrow_merchant.prev") && !controll.onlyQ) {
      removeClasseName("active", ".container_arrow_merchant.prev", 0);
    }
    if (isActive(".container_arrow_merchant.next") && !controll.onlyD) {
      removeClasseName("active", ".container_arrow_merchant.next", 0);
    } // eslint-disable-next-line
  }, [controll.onlyQ, controll.onlyD]);

  useNonInitialEffect(() => {
    if (controll.a) {
      addClassName("active", ".confirm_merchant", 0);
      confirmTransaction();
    }
    if (controll.e) {
      setTextId({ id: 1 });
      setInteractHut("menu");
    }
    if (isActive(".confirm_merchant") && !controll.a) {
      removeClasseName("active", ".confirm_merchant", 0);
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  const confirmTransaction = () => {
    if (interactHut === "sell") {
      dispatch(gameSlice.actions.setGainGold(Math.round(data.cost / 2)));
      if (bag[countBag].amount - 1 <= 0) {
        dispatch(
          gameSlice.actions.setDeleteItemBag({
            index: countBag,
            order: bag[countBag].order,
          })
        );
        if (bag.length - 1 <= 0) {
          //Sell last item from bag
          setTextId({ id: 13, bag: data });
          setInteractHut("menu");
        } else {
          //Sell last copy from an item
          setCountBag(countBag === 0 ? 0 : countBag - 1);
          setTextId({ id: 12, bag: data });
        }
      } else {
        //Sell an item
        dispatch(
          gameSlice.actions.setAmountBag({
            index: countBag,
            amount: bag[countBag].amount - 1,
          })
        );
        setTextId({ id: 11, bag: data });
      }
    } else {
      if (gold >= data.cost) {
        if (indexInBag() === -1 ? true : bag[indexInBag()].amount < 99) {
          dispatch(gameSlice.actions.setGainGold(-data.cost));
          if (indexInBag() === -1) {
            dispatch(
              gameSlice.actions.setAddItemBag({
                game_id: 0,
                model_id: countBag + 1,
                order: 0,
                amount: 1,
              })
            );
          } else {
            dispatch(
              gameSlice.actions.setAmountBag({
                index: indexInBag(),
                amount: bag[indexInBag()].amount + 1,
              })
            );
          }
          if (gold === data.cost) {
            //Buy an item but will have 0gold
            setTextId({ id: 15, bag: data });
          } else {
            //Buy an item
            setTextId({ id: 14, bag: data });
          }
        } else {
          //Already 99 copy of item
          setTextId({ id: 17, bag: data });
        }
      } else {
        //Not enough gold
        setTextId({ id: 16, bag: data });
      }
    }
  };

  return (
    <div className="container_merchant">
      <div className="container_arrow_merchant prev" onClick={prev}>
        <div className="arrow_merchant prev"></div>
      </div>
      <div className="container_arrow_merchant next" onClick={next}>
        <div className="arrow_merchant next"></div>
      </div>
      <div className="container_details_merchant">
        <div className="header_merchant">
          <div className="container_img_merchant">
            <img
              className="img_merchant"
              src={data.img}
              alt="item from bag or merchant"
            />
            {interactHut === "sell" ? (
              <div className="amount_sell_merchant">
                x{bag[countBag].amount}
              </div>
            ) : null}
          </div>
          <div className="name_merchant">{data.name}</div>
        </div>
        <div className="container_info_merchant">
          <div className="description_merchant">{data.description}</div>
          <div className="container_cost_merchant">
            <div className="container_img_gold_merchant">
              <img
                className="img_gold_merchant"
                src={goldImg}
                alt="gold coin"
              />
            </div>
            <div className="cost_merchant">
              {interactHut === "sell" ? Math.round(data.cost / 2) : data.cost}
            </div>
          </div>
        </div>
      </div>
      <div className="container_confirm_merchant">
        <div className="confirm_merchant" onClick={confirmTransaction}>
          {interactHut === "sell" ? "Sell" : "Buy"}
        </div>
        <div
          className="confirm_merchant"
          onClick={() => {
            setTextId({ id: 1 });
            setInteractHut("menu");
          }}
        >
          Return
        </div>
      </div>
    </div>
  );
};

export default GameMerchant;
