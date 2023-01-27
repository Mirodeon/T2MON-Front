import { useEffect } from "react";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import { ControllActivity, DataMon, InfoText, TeeTooMonState } from "../../../utils/types";
import useMouseClick from "../../../utils/useMouseClick";

const useItemFight = (
  controll: ControllActivity,
  eventFight: string,
  setEventFight: React.Dispatch<React.SetStateAction<string>>,
  phaseEvent: number,
  setEventPhase: React.Dispatch<React.SetStateAction<number>>,
  interact: boolean,
  setDataText: React.Dispatch<React.SetStateAction<InfoText>>,
  opponent: DataMon,
  dataMonFighting: DataMon,
  dataText: InfoText,
  finishFight: () => void,
  team: Array<TeeTooMonState>,
  perso: string
) => {
  const boxDialClick = useMouseClick(".container_interface_fight");
  const nextControll = controll.a || controll.e || boxDialClick;
  const roomTeam = team.length < 6;
  const dispatch = useDispatch();

  const captureMon = () => {
    let captureRate = () => {
      return Math.round(
        10000 / (100 + 100 ** ((dataMonFighting.dodge - opponent.dodge) / 100))
      );
    };
    let randomCapture = Math.floor(Math.random() * captureRate());
    let textCapture: InfoText = {
      fight: { opponent: opponent.name, perso: perso },
    };
    if (randomCapture <= 50) {
      textCapture.fight.gatcha = true;
      dispatch(gameSlice.actions.setAddMonTeam(opponent));
    }
    setEventPhase(0);
    setEventFight("gatchaAttempt");
    setDataText(textCapture);
  };

  useEffect(() => {
    if (nextControll && !interact) {
      if (eventFight === "bagBall") {
        if (phaseEvent === 0) {
          setEventPhase(1);
        }
        if (phaseEvent === 1) {
          captureMon();
        }
      }
      if (eventFight === "gatchaAttempt") {
        if (phaseEvent === 1 && dataText.fight.gatcha) {
          let textSuccess: InfoText = {
            fight: {
              perso: perso,
              roomTeam: roomTeam,
              opponent: opponent.name,
            },
          };
          setEventPhase(0);
          setEventFight("gatchaSuccess");
          setDataText(textSuccess);
        }
      }
      if (eventFight === "gatchaSuccess") {
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

export default useItemFight;
