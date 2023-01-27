import React, { useEffect, useState } from "react";
import { TeeTooMonState } from "../../../utils/types";
import getDataMon from "../../../utils/t2mon/getDataMon";
import { crossReturn as returnImg } from "../../../img/others";
import useTimeOut from "../../../utils/useTimeOut";
import { addClassName } from "../../../utils/addClassName";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import useGameControll from "../utils/useGameControll";
import { slideNext, slidePrev, slideReset } from "../../../utils/slideList";

type GameTeamProps = {
  team: Array<TeeTooMonState>;
  setSubPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
  monFighting?: number;
  changeMon?: (mon: number, firstSending: boolean) => void;
};

const GameTeam = ({
  team,
  setSubPanel,
  panel,
  monFighting,
  changeMon,
}: GameTeamProps) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [interactTeam, setInteractTeam] = useState(false);
  const [idFirstInteractTeam, setIdFirstInteractTeam] = useState(0);
  const [idSecondInteractTeam, setIdSecondInteractTeam] = useState(0);
  const [changeOrder, setChangeOrder] = useState(false);
  const [release, setRelease] = useState(false);
  const [sendFight, setSendFight] = useState(false);
  const [countTeam, setCountTeam] = useState(0);
  const [countInteract, setCountInteract] = useState(0);
  const [countConfirm, setCountConfirm] = useState(0);
  const dispatch = useDispatch();
  const controll = useGameControll();

  useTimeOut(() => setSubPanel("none"), fadeOut ? 700 : null);

  useEffect(() => {
    setCountInteract(
      slideReset(countInteract, `.item_change_game_team.select_change_team`)
    );
    setCountConfirm(
      slideReset(countConfirm, `.item_change_game_team.confirm_change_team`)
    ); // eslint-disable-next-line
  }, [interactTeam]);

  useEffect(() => {
    if (controll.onlyZ) {
      if (interactTeam === changeOrder) {
        if (idFirstInteractTeam === idSecondInteractTeam) {
          setCountTeam(slidePrev(countTeam, `.item_game_team`));
        } else {
          setCountConfirm(
            slidePrev(
              countConfirm,
              `.item_change_game_team.confirm_change_team`
            )
          );
        }
      } else {
        if (release || sendFight) {
          setCountConfirm(
            slidePrev(
              countConfirm,
              `.item_change_game_team.confirm_change_team`
            )
          );
        } else {
          setCountInteract(
            slidePrev(
              countInteract,
              `.item_change_game_team.select_change_team`
            )
          );
        }
      }
    }
    if (controll.onlyS) {
      if (interactTeam === changeOrder) {
        if (idFirstInteractTeam === idSecondInteractTeam) {
          setCountTeam(slideNext(countTeam, `.item_game_team`));
        } else {
          setCountConfirm(
            slideNext(
              countConfirm,
              `.item_change_game_team.confirm_change_team`
            )
          );
        }
      } else {
        if (release || sendFight) {
          setCountConfirm(
            slideNext(
              countConfirm,
              `.item_change_game_team.confirm_change_team`
            )
          );
        } else {
          setCountInteract(
            slideNext(
              countInteract,
              `.item_change_game_team.select_change_team`
            )
          );
        }
      }
    } // eslint-disable-next-line
  }, [controll.z, controll.s]);

  useEffect(() => {
    if (controll.e) {
      if (!interactTeam && !changeOrder) {
        addClassName("fade_out", ".container_game_team", 0);
        setFadeOut(true);
      } else {
        setInteractTeam(false);
        setChangeOrder(false);
        setRelease(false);
        setSendFight(false);
        setIdFirstInteractTeam(countTeam + 1);
        setIdSecondInteractTeam(countTeam + 1);
      }
    }
    if (controll.a) {
      if (!interactTeam && !changeOrder && !release && !sendFight) {
        if (
          !(
            (panel === "fight" &&
              (monFighting === countTeam || team[countTeam].pv <= 0)) ||
            (panel === "menu" && team.length <= 1)
          )
        ) {
          setInteractTeam(true);
          setIdFirstInteractTeam(countTeam + 1);
          setIdSecondInteractTeam(countTeam + 1);
          setChangeOrder(false);
        }
      }
      if (interactTeam && !changeOrder && !release && !sendFight) {
        if (countInteract === 0) {
          if (panel === "menu") {
            setChangeOrder(true);
          }
          if (panel === "fight") {
            setSendFight(true);
          }
        }
        if (countInteract === 1) {
          if (panel === "menu") {
            setRelease(true);
          }
          if (panel === "fight") {
            setInteractTeam(false);
            setChangeOrder(false);
            setSendFight(false);
          }
        }
        if (countInteract === 2) {
          setInteractTeam(false);
          setChangeOrder(false);
          setSendFight(false);
        }
      }
      if (interactTeam && changeOrder && !release && !sendFight) {
        if (countConfirm === 0) {
          setIdSecondInteractTeam(countTeam + 1);
          if (idFirstInteractTeam !== idSecondInteractTeam) {
            setChangeOrder(false);
            setInteractTeam(false);
            dispatch(
              gameSlice.actions.setOrder([
                {
                  index: idFirstInteractTeam - 1,
                  order: idSecondInteractTeam,
                },
                {
                  index: idSecondInteractTeam - 1,
                  order: idFirstInteractTeam,
                },
              ])
            );
            setIdFirstInteractTeam(idSecondInteractTeam);
          }
        }
        if (countConfirm === 1) {
          setInteractTeam(false);
          setChangeOrder(false);
          setRelease(false);
          setSendFight(false);
          setIdFirstInteractTeam(countTeam + 1);
          setIdSecondInteractTeam(countTeam + 1);
        }
      }
      if (interactTeam && !changeOrder && release && !sendFight) {
        if (countConfirm === 0) {
          setRelease(false);
          setInteractTeam(false);
          if (team.length > 1) {
            dispatch(
              gameSlice.actions.setDeleteByOrder({
                index: idFirstInteractTeam - 1,
                order: idFirstInteractTeam,
              })
            );
            setIdFirstInteractTeam(0);
            setIdSecondInteractTeam(0);
            setCountTeam(0);
          }
        }
        if (countConfirm === 1) {
          setInteractTeam(false);
          setChangeOrder(false);
          setRelease(false);
          setSendFight(false);
          setIdFirstInteractTeam(countTeam + 1);
          setIdSecondInteractTeam(countTeam + 1);
        }
      }
      if (interactTeam && !changeOrder && !release && sendFight && changeMon) {
        if (countConfirm === 0) {
          changeMon(idFirstInteractTeam - 1, false);
          setSendFight(false);
          handleReturn();
        }
        if (countConfirm === 1) {
          setInteractTeam(false);
          setChangeOrder(false);
          setRelease(false);
          setSendFight(false);
          setIdFirstInteractTeam(countTeam + 1);
          setIdSecondInteractTeam(countTeam + 1);
        }
      }
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  const handleReturn = () => {
    addClassName("fade_out", ".container_game_team", 0);
    setFadeOut(true);
  };

  const handleInteract = (order: number, change: boolean) => {
    if (change) {
      setIdSecondInteractTeam(order);
    } else if (
      !(
        (panel === "fight" &&
          (monFighting === order - 1 || team[order - 1].pv <= 0)) ||
        (panel === "menu" && team.length <= 1)
      )
    ) {
      let bool = interactTeam !== true;
      setInteractTeam(bool);
      setIdFirstInteractTeam(order);
      setIdSecondInteractTeam(order);
      setChangeOrder(false);
      setRelease(false);
      setSendFight(false);
    }
  };

  const handleConfirm = () => {
    if (changeOrder) {
      dispatch(
        gameSlice.actions.setOrder([
          { index: idFirstInteractTeam - 1, order: idSecondInteractTeam },
          { index: idSecondInteractTeam - 1, order: idFirstInteractTeam },
        ])
      );
    }
    if (release) {
      if (team.length > 1) {
        dispatch(
          gameSlice.actions.setDeleteByOrder({
            index: idFirstInteractTeam - 1,
            order: idFirstInteractTeam,
          })
        );
        setIdFirstInteractTeam(0);
        setIdSecondInteractTeam(0);
      }
    }
    if (sendFight && changeMon) {
      changeMon(idFirstInteractTeam - 1, false);
      handleReturn();
    }
    setChangeOrder(false);
    setRelease(false);
    setSendFight(false);
    setInteractTeam(false);
  };

  return (
    <div className="container_game_team">
      <img
        className="return_game_team"
        src={returnImg}
        alt="return button"
        onClick={handleReturn}
      />
      {team.map((mon: TeeTooMonState, index: number) => {
        let data = getDataMon(mon.model_id, mon.lvl);
        return (
          <div key={index} className="container_item_game_team">
            <div
              className={
                "item_game_team" +
                (changeOrder &&
                (idFirstInteractTeam === mon.order ||
                  idSecondInteractTeam === mon.order)
                  ? " select"
                  : "")
              }
              onClick={() => handleInteract(mon.order, changeOrder)}
            >
              <div className="container_img_game_team">
                <img className="img_game_team" src={data.img} alt="T2Mon" />
              </div>
              <div className="container_info_game_team">
                <div className="name_game_team">{data.name}</div>
                <div className="container_details_game_team">
                  <div className="container_ressource_game_team">
                    <div className="ressource_bar_game_team">
                      <div
                        className="pv_bar_game_team"
                        style={{ width: `${(mon.pv / data.pv) * 100}%` }}
                      ></div>
                      <div className="numeric_ressource_game_team">
                        {mon.pv} / {data.pv}
                      </div>
                    </div>
                    <div className="ressource_bar_game_team">
                      <div
                        className="mana_bar_game_team"
                        style={{
                          width: `${(mon.mana / data.mana) * 100}%`,
                        }}
                      ></div>
                      <div className="numeric_ressource_game_team">
                        {mon.mana} / {data.mana}
                      </div>
                    </div>
                  </div>
                  <div className="lvl_game_team">Lvl. {mon.lvl}</div>
                </div>
                <div className="ressource_exp_bar_game_team">
                  <div
                    className="exp_bar_game_team"
                    style={{ width: `${(mon.exp / data.exp) * 100}%` }}
                  ></div>
                  <div className="numeric_exp_game_team">
                    {mon.exp >= 10000
                      ? Math.round(mon.exp / 1000) + "K"
                      : mon.exp}{" "}
                    /{" "}
                    {data.exp >= 10000
                      ? Math.round(data.exp / 1000) + "K"
                      : data.exp}
                  </div>
                </div>
              </div>
            </div>
            {interactTeam && idFirstInteractTeam === mon.order ? ( //box interact team
              <div className="container_box_change_game_team">
                {panel === "menu" ? (
                  <>
                    <div
                      className={
                        "item_change_game_team select_change_team" +
                        (changeOrder ? " select" : "")
                      }
                      onClick={() => {
                        setChangeOrder(true);
                        setRelease(false);
                        setSendFight(false);
                      }}
                    >
                      Change order
                    </div>
                    <div
                      className={
                        "item_change_game_team select_change_team" +
                        (release ? " release" : "")
                      }
                      onClick={() => {
                        setChangeOrder(false);
                        setRelease(true);
                        setSendFight(false);
                      }}
                    >
                      Release
                    </div>
                  </>
                ) : panel === "fight" ? (
                  <div
                    className={
                      "item_change_game_team select_change_team" +
                      (sendFight ? " select" : "")
                    }
                    onClick={() => {
                      setChangeOrder(false);
                      setRelease(false);
                      setSendFight(true);
                    }}
                  >
                    Send fight
                  </div>
                ) : null}
                <div
                  className="item_change_game_team select_change_team"
                  onClick={() => handleInteract(mon.order, false)}
                >
                  Cancel
                </div>
              </div>
            ) : null}
            {(interactTeam &&
              changeOrder &&
              idSecondInteractTeam === mon.order &&
              idSecondInteractTeam !== idFirstInteractTeam) ||
            (release && idFirstInteractTeam === mon.order) ||
            (sendFight && idFirstInteractTeam === mon.order) ? ( // pop-up confirmation change
              <div className="container_box_confirm_change_game_team">
                <div
                  className="item_change_game_team confirm_change_team"
                  onClick={handleConfirm}
                >
                  Confirm{" "}
                  {changeOrder ? "change" : release ? "release" : "sending"}
                </div>
                <div
                  className="item_change_game_team confirm_change_team"
                  onClick={() => handleInteract(mon.order, false)}
                >
                  Cancel
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default GameTeam;
