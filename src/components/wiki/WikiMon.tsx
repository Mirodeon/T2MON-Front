import React, { useState } from "react";
import getDataMon, { getGrowRate } from "../../utils/t2mon/getDataMon";
import { SpellPetStore } from "../game";

const WikiMon = () => {
  const [countTeam, setCountTeam] = useState(0);
  const [statInfo, setStatInfo] = useState(true);

  const monData = () => {
    let data = [];
    for (let i = 1; i <= 12; i++) {
      data[i - 1] = getDataMon(i, 1);
    }
    data.sort((a, b) => {
      return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
    });
    return data;
  };
  const dataMon = monData();
  const mon = dataMon[countTeam];

  const growRate = getGrowRate(mon.model_id);
  const grow = (rate: number) => {
    return 1 <= rate && rate <= 3
      ? "☆☆★"
      : 4 <= rate && rate <= 7
      ? "☆★★"
      : "★★★";
  };

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
        <div className="nav_btn" onClick={() => setStatInfo(!statInfo)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {statInfo ? "Spell" : "Stat"}
        </div>
      </div>
    </div>
  );
};

export default WikiMon;
