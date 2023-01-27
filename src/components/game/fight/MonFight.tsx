import React from "react";

type MonFightProps = {
  name: string;
  img: any;
  lvl: number;
  currentPv: number;
  totalPv: number;
  currentMana: number;
  totalMana: number;
  opponent: boolean;
};

const MonFight = ({
  name,
  img,
  lvl,
  currentPv,
  totalPv,
  currentMana,
  totalMana,
  opponent,
}: MonFightProps) => {
  return (
    <>
      <div className={"item_game_fight " + (opponent ? "opponent" : "self")}>
        <div className="container_info_game_fight">
          <div className="container_details_game_fight">
            <div className="name_game_fight">{name}</div>
            <div className="lvl_game_fight">Lvl. {lvl}</div>
          </div>
          <div className="container_ressource_game_fight">
            <div className="ressource_bar_game_fight">
              <div
                className="pv_bar_game_fight"
                style={{ width: `${(currentPv / totalPv) * 100}%` }}
              ></div>
              <div className="numeric_ressource_game_fight">
                {currentPv} / {totalPv}
              </div>
            </div>
            <div className="ressource_bar_game_fight">
              <div
                className="mana_bar_game_fight"
                style={{
                  width: `${(currentMana / totalMana) * 100}%`,
                }}
              ></div>
              <div className="numeric_ressource_game_fight">
                {currentMana} / {totalMana}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "container_img_game_fight " + (opponent ? "opponent" : "self")
        }
      >
        <img className="img_game_fight" src={img} alt="T2Mon" />
      </div>
    </>
  );
};

export default MonFight;
