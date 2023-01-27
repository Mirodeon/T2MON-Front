import React, { useEffect, useState } from "react";
import { addClassName, removeClasseName } from "../../../utils/addClassName";
import getDataBag from "../../../utils/bag/getDataBag";
import isActive from "../../../utils/isActive";
import { ControllActivity, BagState } from "../../../utils/types";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";

type SelectBagStartProps = {
  setIdBag: React.Dispatch<React.SetStateAction<number>>;
  setSelectMon: React.Dispatch<React.SetStateAction<boolean>>;
  dataBag: Array<BagState>;
  controll: ControllActivity;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  confirm: boolean;
  setSelectBag: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectBagStart = ({
  setIdBag,
  setSelectMon,
  dataBag,
  controll,
  setConfirm,
  confirm,
  setSelectBag,
}: SelectBagStartProps) => {
  const [countBag, setCountBag] = useState(0);
  const bag = dataBag[countBag];
  const data = getDataBag(bag.model_id);

  const prev = () => {
    if (countBag > 0) {
      setCountBag(countBag - 1);
    } else {
      setCountBag(dataBag.length - 1);
    }
  };
  const next = () => {
    if (countBag < dataBag.length - 1) {
      setCountBag(countBag + 1);
    } else {
      setCountBag(0);
    }
  };

  const confirmSelect = () => {
    setIdBag(countBag);
    setConfirm(true);
    setSelectBag(false);
  };

  useEffect(() => {
    if (controll.onlyQ) {
      prev();
      addClassName("active", ".container_arrow_bag_start.prev", 0);
    }
    if (controll.onlyD) {
      next();
      addClassName("active", ".container_arrow_bag_start.next", 0);
    }
    if (isActive(".container_arrow_bag_start.prev") && !controll.onlyQ) {
      removeClasseName("active", ".container_arrow_bag_start.prev", 0);
    }
    if (isActive(".container_arrow_bag_start.next") && !controll.onlyD) {
      removeClasseName("active", ".container_arrow_bag_start.next", 0);
    } // eslint-disable-next-line
  }, [controll.onlyQ, controll.onlyD]);

  useNonInitialEffect(() => {
    if (!confirm) {
      if (controll.a) {
        addClassName("active", ".confirm_start_bag", 0);
        confirmSelect();
      }
      if (controll.e) {
        setSelectMon(true);
        setSelectBag(false);
      }
    }
    if (isActive(".confirm_start_bag") && !controll.a) {
      removeClasseName("active", ".confirm_start_bag", 0);
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  return (
    <div className="container_bag_start">
      <div className="container_arrow_bag_start prev" onClick={prev}>
        <div className="arrow_bag_start prev"></div>
      </div>
      <div className="container_arrow_bag_start next" onClick={next}>
        <div className="arrow_bag_start next"></div>
      </div>
      <div className="container_details_bag_start">
        <div className="header_bag_start">
          <div className="container_img_bag_start">
            <img className="img_bag_start" src={data.img} alt="item from bag" />
            <div className="amount_bag_start">x{bag.amount}</div>
          </div>
          <div className="name_bag_start">{data.name}</div>
        </div>
        <div className="description_bag_start">{data.description}</div>
      </div>
      <div className="container_confirm_bag_start">
        <div className="confirm_start_bag" onClick={confirmSelect}>
          Select
        </div>
        <div
          className="confirm_start_bag"
          onClick={() => {
            setSelectMon(true);
            setSelectBag(false);
          }}
        >
          Return
        </div>
      </div>
    </div>
  );
};

export default SelectBagStart;
