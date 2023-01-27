import React, { useEffect, useState } from "react";
import { addClassName, removeClasseName } from "../../../utils/addClassName";
import isActive from "../../../utils/isActive";
import { ControllActivity, DataMon } from "../../../utils/types";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";
import { getGrowRate } from "../../../utils/t2mon/getDataMon";
import { SpellPetStore } from "..";

type SelectMonStartProps = {
  setIdMon: React.Dispatch<React.SetStateAction<number>>;
  setSelectMon: React.Dispatch<React.SetStateAction<boolean>>;
  dataMon: Array<DataMon>;
  controll: ControllActivity;
  setSelectBag: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectMonStart = ({
  setIdMon,
  setSelectMon,
  dataMon,
  controll,
  setSelectBag,
}: SelectMonStartProps) => {
  const [countTeam, setCountTeam] = useState(0);
  const [statInfo, setStatInfo] = useState(true);
  const mon = dataMon[countTeam];
  const growRate = getGrowRate(mon.model_id);

  const prev = () => {
    if (countTeam > 0) {
      setCountTeam(countTeam - 1);
    } else {
      setCountTeam(dataMon.length - 1);
    }
  };
  const next = () => {
    if (countTeam < dataMon.length - 1) {
      setCountTeam(countTeam + 1);
    } else {
      setCountTeam(0);
    }
  };

  const confirmSelect = () => {
    setIdMon(countTeam);
    setSelectBag(true);
    setSelectMon(false);
  };

  useEffect(() => {
    if (controll.onlyQ) {
      prev();
      addClassName("active", ".container_arrow_mon_start.prev", 0);
    }
    if (controll.onlyD) {
      next();
      addClassName("active", ".container_arrow_mon_start.next", 0);
    }
    if (isActive(".container_arrow_mon_start.prev") && !controll.onlyQ) {
      removeClasseName("active", ".container_arrow_mon_start.prev", 0);
    }
    if (isActive(".container_arrow_mon_start.next") && !controll.onlyD) {
      removeClasseName("active", ".container_arrow_mon_start.next", 0);
    } // eslint-disable-next-line
  }, [controll.onlyQ, controll.onlyD]);

  useNonInitialEffect(() => {
    if (controll.e) {
      setSelectMon(false);
    }
    if (controll.a) {
      addClassName("active", ".confirm_start_mon", 0);
      confirmSelect();
    }
    if (controll.s || controll.z) {
      addClassName("active", ".confirm_start_mon", 1);
      setStatInfo(!statInfo);
    }
    if (isActive(".confirm_start_mon") && !controll.a) {
      removeClasseName("active", ".confirm_start_mon", 0);
    }
    if (isActive(".confirm_start_mon") && !controll.s && controll.z) {
      removeClasseName("active", ".confirm_start_mon", 1);
    } // eslint-disable-next-line
  }, [controll.a, controll.e, controll.s, controll.z]);

  const grow = (rate: number) => {
    return 1 <= rate && rate <= 3
      ? "☆☆★"
      : 4 <= rate && rate <= 7
      ? "☆★★"
      : "★★★";
  };
  return (
    <div className="container_mon_start">
      <div className="container_arrow_mon_start prev" onClick={prev}>
        <div className="arrow_mon_start prev"></div>
      </div>
      <div className="container_arrow_mon_start next" onClick={next}>
        <div className="arrow_mon_start next"></div>
      </div>
      <div className="container_info_mon_start">
        <div className="container_pres_mon_start">
          <div className="container_img_mon_start">
            <img className="img_mon_start" src={mon.img} alt="T2Mon" />
          </div>
          <div className="name_mon_start">{mon.name}</div>
          <div className="container_type_mon_start">
            <div className={"type_mon_start " + mon.type[0]}></div>
            <div className={"type_mon_start " + mon.type[1]}></div>
          </div>
        </div>
        {statInfo ? (
          <div className="container_txt_mon_start">
            <div className="container_stat_mon">
              <div className="stat_mon">HP</div>
              <div className="stat_mon">
                <span>{grow(growRate.pv)}</span>
                <span>{mon.pv}</span>
              </div>
            </div>
            <div className="container_stat_mon">
              <div className="stat_mon">MANA</div>
              <div className="stat_mon">
                <span>{grow(growRate.mana)}</span>
                <span>{mon.mana}</span>
              </div>
            </div>
            <div className="container_stat_mon">
              <div className="stat_mon">ATK</div>
              <div className="stat_mon">
                <span>{grow(growRate.atk)}</span>
                <span>{mon.atk}</span>
              </div>
            </div>
            <div className="container_stat_mon">
              <div className="stat_mon">DEF</div>
              <div className="stat_mon">
                <span>{grow(growRate.def)}</span>
                <span>{mon.def}</span>
              </div>
            </div>
            <div className="container_stat_mon">
              <div className="stat_mon">SPEED</div>
              <div className="stat_mon">
                <span>{grow(growRate.speed)}</span>
                <span>{mon.speed}</span>
              </div>
            </div>
          </div>
        ) : (
          <SpellPetStore model_id={mon.model_id} />
        )}
      </div>
      <div className="container_confirm_start_mon">
        <div className="confirm_start_mon" onClick={confirmSelect}>
          Select
        </div>
        <div
          className="confirm_start_mon"
          onClick={() => setStatInfo(!statInfo)}
        >
          {statInfo ? "Spell" : "Stat"}
        </div>
        <div className="confirm_start_mon" onClick={() => setSelectMon(false)}>
          Return
        </div>
      </div>
    </div>
  );
};

export default SelectMonStart;
