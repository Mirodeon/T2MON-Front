import React, { useEffect, useState } from "react";
import {
  ControllActivity,
  HutText,
  TeeTooMonState,
} from "../../../utils/types";
import { addClassName, removeClasseName } from "../../../utils/addClassName";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";
import isActive from "../../../utils/isActive";
import getDataMon, { getGrowRate } from "../../../utils/t2mon/getDataMon";
import { SpellPetStore } from "..";

type GamePetStoreProps = {
  team: Array<TeeTooMonState>;
  petStore: Array<TeeTooMonState>;
  setTextId: React.Dispatch<React.SetStateAction<HutText>>;
  interactHut: string;
  setInteractHut: React.Dispatch<React.SetStateAction<string>>;
  controll: ControllActivity;
};

const GamePetStore = ({
  team,
  petStore,
  setTextId,
  interactHut,
  setInteractHut,
  controll,
}: GamePetStoreProps) => {
  const [countTeam, setCountTeam] = useState(0);
  const [statInfo, setStatInfo] = useState(true);
  const dispatch = useDispatch();
  const data = getDataMon(
    interactHut === "drop"
      ? team[countTeam].model_id
      : petStore[countTeam].model_id,
    interactHut === "drop" ? team[countTeam].lvl : petStore[countTeam].lvl
  );
  const growRate = getGrowRate(data.model_id);
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
      setCountTeam(
        interactHut === "drop" ? team.length - 1 : petStore.length - 1
      );
    }
  };
  const next = () => {
    if (
      countTeam <
      (interactHut === "drop" ? team.length - 1 : petStore.length - 1)
    ) {
      setCountTeam(countTeam + 1);
    } else {
      setCountTeam(0);
    }
  };

  useEffect(() => {
    if (controll.onlyQ) {
      prev();
      addClassName("active", ".container_arrow_pet_store.prev", 0);
    }
    if (controll.onlyD) {
      next();
      addClassName("active", ".container_arrow_pet_store.next", 0);
    }
    if (isActive(".container_arrow_pet_store.prev") && !controll.onlyQ) {
      removeClasseName("active", ".container_arrow_pet_store.prev", 0);
    }
    if (isActive(".container_arrow_pet_store.next") && !controll.onlyD) {
      removeClasseName("active", ".container_arrow_pet_store.next", 0);
    } // eslint-disable-next-line
  }, [controll.onlyQ, controll.onlyD]);

  useNonInitialEffect(() => {
    if (controll.e) {
      setTextId({ id: 1 });
      setInteractHut("menu");
    }
    if (controll.a) {
      addClassName("active", ".confirm_pet_store", 0);
      confirmSelect();
    }
    if (controll.s || controll.z) {
      addClassName("active", ".confirm_pet_store", 1);
      setStatInfo(!statInfo);
    }
    if (isActive(".confirm_pet_store") && !controll.a) {
      removeClasseName("active", ".confirm_pet_store", 0);
    }
    if (isActive(".confirm_pet_store") && !controll.s && !controll.z) {
      removeClasseName("active", ".confirm_pet_store", 1);
    } // eslint-disable-next-line
  }, [controll.a, controll.e, controll.s, controll.z]);

  const confirmSelect = () => {
    if (interactHut === "drop") {
      dispatch(
        gameSlice.actions.setDeleteByOrder({
          index: countTeam,
          order: team[countTeam].order,
        })
      );
      dispatch(gameSlice.actions.setAddMonPetStore(data));
      setCountTeam(countTeam === 0 ? 0 : countTeam - 1);
      if (team.length - 1 <= 1) {
        //one mon left in team
        setTextId({ id: 19, mon: data });
        setInteractHut("menu");
      } else if (petStore.length + 1 >= 30) {
        //store mon full
        setTextId({ id: 20, mon: data });
        setInteractHut("menu");
      } else {
        //simple drop
        setTextId({ id: 18, mon: data });
      }
    } else {
      dispatch(
        gameSlice.actions.setDeleteInPetStore({
          index: countTeam,
          order: petStore[countTeam].order,
        })
      );
      dispatch(gameSlice.actions.setAddMonTeam(data));
      setCountTeam(countTeam === 0 ? 0 : countTeam - 1);
      if (petStore.length - 1 <= 0) {
        //no more mon in store
        setTextId({ id: 22, mon: data });
        setInteractHut("menu");
      } else if (team.length + 1 >= 6) {
        //team is full
        setTextId({ id: 23, mon: data });
        setInteractHut("menu");
      } else {
        //simple take
        setTextId({ id: 21, mon: data });
      }
    }
  };

  return (
    <div className="container_pet_store">
      <div className="container_arrow_pet_store prev" onClick={prev}>
        <div className="arrow_pet_store prev"></div>
      </div>
      <div className="container_arrow_pet_store next" onClick={next}>
        <div className="arrow_pet_store next"></div>
      </div>
      <div className="container_info_pet_store">
        <div className="container_pres_pet_store">
          <div className="container_img_pet_store">
            <img className="img_pet_store" src={data.img} alt="T2Mon" />
          </div>
          <div className="name_pet_store">
            {data.name} <span className="lvl_pet_store">Lvl.{data.lvl}</span>
          </div>
          <div className="container_type_pet_store">
            <div className={"type_pet_store " + data.type[0]}></div>
            <div className={"type_pet_store " + data.type[1]}></div>
          </div>
        </div>
        {statInfo ? (
          <div className="container_txt_pet_store">
            <div className="container_stat_mon">
              <div className="stat_mon">HP</div>
              <div className="stat_mon">
                <span>{grow(growRate.pv)}</span>
                <span>{data.pv}</span>
              </div>
            </div>
            <div className="container_stat_mon">
              <div className="stat_mon">MANA</div>
              <div className="stat_mon">
                <span>{grow(growRate.mana)}</span>
                <span>{data.mana}</span>
              </div>
            </div>
            <div className="container_stat_mon">
              <div className="stat_mon">ATK</div>
              <div className="stat_mon">
                <span>{grow(growRate.atk)}</span>
                <span>{data.atk}</span>
              </div>
            </div>
            <div className="container_stat_mon">
              <div className="stat_mon">DEF</div>
              <div className="stat_mon">
                <span>{grow(growRate.def)}</span>
                <span>{data.def}</span>
              </div>
            </div>
            <div className="container_stat_mon">
              <div className="stat_mon">SPEED</div>
              <div className="stat_mon">
                <span>{grow(growRate.speed)}</span>
                <span>{data.speed}</span>
              </div>
            </div>
          </div>
        ) : (
          <SpellPetStore model_id={data.model_id} />
        )}
      </div>
      <div className="container_confirm_pet_store">
        <div className="confirm_pet_store" onClick={confirmSelect}>
          {interactHut === "drop" ? "Drop" : "Take"}
        </div>
        <div
          className="confirm_pet_store"
          onClick={() => setStatInfo(!statInfo)}
        >
          {statInfo ? "Spell" : "Stat"}
        </div>
        <div
          className="confirm_pet_store"
          onClick={() => {
            setTextId({ id: 2 });
            setInteractHut("menu");
          }}
        >
          Return
        </div>
      </div>
    </div>
  );
};

export default GamePetStore;
