import { useEffect } from "react";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import { ControllActivity, DataMon, InfoText, TeeTooMonState } from "../../../utils/types";
import useMouseClick from "../../../utils/useMouseClick";

const useChangeMonFight = (
  controll: ControllActivity,
  perso: string,
  team: Array<TeeTooMonState>,
  opponent: DataMon,
  dataMonFighting: DataMon,
  monFighting: number,
  finishFight: () => void,
  eventFight: string,
  setEventFight: React.Dispatch<React.SetStateAction<string>>,
  phaseEvent: number,
  setEventPhase: React.Dispatch<React.SetStateAction<number>>,
  interact: boolean,
  setDataText: React.Dispatch<React.SetStateAction<InfoText>>,
  changeMon: (mon: number, firstSending: boolean) => void
) => {
  const boxDialClick = useMouseClick(".container_interface_fight");
  const nextControll = controll.a || controll.e || boxDialClick;
  const dispatch = useDispatch();

  //lose fight
  const loseFight = () => {
    dispatch(gameSlice.actions.setGainGold(-opponent.givenGold));
    setEventPhase(0);
    setEventFight("lose");
    setDataText({
      fight: {
        perso: perso,
        gold: opponent.givenGold,
      },
    });
  };

  const winFight = () => {
    dispatch(gameSlice.actions.setGainGold(opponent.givenGold));
    dispatch(
      gameSlice.actions.setGainExp({
        index: monFighting,
        gainExp: opponent.givenExp,
      })
    );
    setEventPhase(0);
    setEventFight("win");
    setDataText({
      fight: {
        selfMon: dataMonFighting.name,
        exp: opponent.givenExp,
        perso: perso,
        gold: opponent.givenGold,
      },
    });
  };

  //check alive and set first mon alive on fight
  const checkAlive = (first: boolean) => {
    let firstMonFighting = team.findIndex((mon) => {
      if (mon.pv > 0) {
        return true;
      }
      return false;
    });
    if (firstMonFighting !== -1) {
      changeMon(firstMonFighting, first);
    } else {
      loseFight();
    }
  };

  //set the first mon fighting and init lose if no mon alive (only first render)
  useEffect(() => {
    checkAlive(true); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (nextControll && !interact) {
      if (eventFight === "selfKO") {
        if (phaseEvent === 0) {
          setEventPhase(1);
        }
        if (phaseEvent === 1) {
          checkAlive(false);
        }
      }
      if (eventFight === "opponentKO") {
        if (phaseEvent === 0) {
          setEventPhase(1);
        }
        if (phaseEvent === 1) {
          winFight();
        }
      }
      if (eventFight === "lose" || eventFight === "win") {
        if (phaseEvent === 0) {
          setEventPhase(1);
        }
        if (phaseEvent === 1) {
          finishFight();
        }
      }
    } // eslint-disable-next-line
  }, [nextControll]);
};

export default useChangeMonFight;
