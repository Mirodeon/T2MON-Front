import React, { useEffect, useState } from "react";
import { addClassName, removeClasseName } from "../../../utils/addClassName";
import isActive from "../../../utils/isActive";
import getDataMon from "../../../utils/t2mon/getDataMon";
import { ControllActivity, TeeTooMonState } from "../../../utils/types";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";

type PortraitTeamSlideProps = {
  team: Array<TeeTooMonState>;
  controll: ControllActivity;
  setItemUse: React.Dispatch<React.SetStateAction<boolean>>;
  confirmUse: boolean;
  setConfirmUse: React.Dispatch<React.SetStateAction<boolean>>;
  setTargetMon: React.Dispatch<React.SetStateAction<number>>;
};

const PortraitTeamSlide = ({
  team,
  controll,
  setItemUse,
  confirmUse,
  setConfirmUse,
  setTargetMon,
}: PortraitTeamSlideProps) => {
  const [countTeam, setCountTeam] = useState(0);
  const current = team[countTeam];
  const data = getDataMon(current.model_id, current.lvl);

  const prev = () => {
    if (countTeam > 0) {
      setCountTeam(countTeam - 1);
    } else {
      setCountTeam(team.length - 1);
    }
  };
  const next = () => {
    if (countTeam < team.length - 1) {
      setCountTeam(countTeam + 1);
    } else {
      setCountTeam(0);
    }
  };

  useEffect(() => {
    if (!confirmUse) {
      if (controll.onlyQ) {
        prev();
        addClassName("active", ".container_arrow_portrait.prev", 0);
      }
      if (controll.onlyD) {
        next();
        addClassName("active", ".container_arrow_portrait.next", 0);
      }
    }
    if (isActive(".container_arrow_portrait.prev") && !controll.onlyQ) {
      removeClasseName("active", ".container_arrow_portrait.prev", 0);
    }
    if (isActive(".container_arrow_portrait.next") && !controll.onlyD) {
      removeClasseName("active", ".container_arrow_portrait.next", 0);
    } // eslint-disable-next-line
  }, [controll.onlyQ, controll.onlyD]);

  useNonInitialEffect(() => {
    if (!confirmUse) {
      if (controll.e) {
        setItemUse(false);
      }
      if (controll.a) {
        addClassName("active", ".confirm_portrait", 0);
        setTargetMon(countTeam);
        setConfirmUse(true);
      }
    }
    if (isActive(".confirm_portrait") && !controll.a) {
      removeClasseName("active", ".confirm_portrait", 0);
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  return (
    <div className="container_portrait_team">
      <div
        className="container_arrow_portrait prev"
        {...(!confirmUse && { onClick: prev })}
      >
        <div className="arrow_portrait prev"></div>
      </div>
      <div
        className="container_arrow_portrait next"
        {...(!confirmUse && { onClick: next })}
      >
        <div className="arrow_portrait next"></div>
      </div>
      <div className="container_img_portrait">
        <img className="img_portrait" src={data.img} alt="T2Mon" />
      </div>
      <div className="container_info_portrait">
        {data.name} Lvl.{data.lvl}
      </div>
      <div className="container_ressource_portrait">
        <div className="ressource_bar_portrait">
          <div
            className="pv_bar_portrait"
            style={{ width: `${(current.pv / data.pv) * 100}%` }}
          ></div>
          <div className="numeric_ressource_portrait">
            {current.pv} / {data.pv}
          </div>
        </div>
        <div className="ressource_bar_portrait">
          <div
            className="mana_bar_portrait"
            style={{
              width: `${(current.mana / data.mana) * 100}%`,
            }}
          ></div>
          <div className="numeric_ressource_portrait">
            {current.mana} / {data.mana}
          </div>
        </div>
        <div className="ressource_bar_portrait">
          <div
            className="exp_bar_portrait"
            style={{ width: `${(current.exp / data.exp) * 100}%` }}
          ></div>
          <div className="numeric_ressource_portrait">
            {current.exp >= 10000
              ? Math.round(current.exp / 1000) + "K"
              : current.exp}{" "}
            / {data.exp >= 10000 ? Math.round(data.exp / 1000) + "K" : data.exp}
          </div>
        </div>
      </div>
      <div
        className="confirm_portrait"
        {...(!confirmUse && {
          onClick: () => {
            setTargetMon(countTeam);
            setConfirmUse(true);
          },
        })}
      >
        Use
      </div>
    </div>
  );
};

export default PortraitTeamSlide;
