import { useEffect } from "react";
import {
  ControllActivity,
  DataMon,
  InfoText,
  Spell,
  TeeTooMonState,
} from "../../../utils/types";
import useMouseClick from "../../../utils/useMouseClick";
import { useDispatch } from "react-redux";
import { getMonSpellAll } from "../../../utils/t2mon/getMonSpell";
import castSpell from "../../../utils/spellMon/castSpell";
import gameSlice from "../../../store/slices/game";

const useEventFightControll = (
  controll: ControllActivity,
  eventFight: string,
  setEventFight: React.Dispatch<React.SetStateAction<string>>,
  phaseEvent: number,
  setEventPhase: React.Dispatch<React.SetStateAction<number>>,
  myTurn: boolean,
  setMyTurn: React.Dispatch<React.SetStateAction<boolean>>,
  interact: boolean,
  setInteract: React.Dispatch<React.SetStateAction<boolean>>,
  opponent: DataMon,
  pvOpponent: number,
  setPvOpponent: React.Dispatch<React.SetStateAction<number>>,
  manaOpponent: number,
  setManaOpponent: React.Dispatch<React.SetStateAction<number>>,
  dataMonFighting: DataMon,
  selfMon: TeeTooMonState,
  monFighting: number,
  dataText: InfoText,
  setDataText: React.Dispatch<React.SetStateAction<InfoText>>,
  setSpellImg: React.Dispatch<React.SetStateAction<any>>,
  perso: string,
  monSendingFight: number | null
) => {
  const boxDialClick = useMouseClick(".container_interface_fight");
  const nextControll = controll.a || controll.e || boxDialClick;
  const dispatch = useDispatch();

  const opponentCasting = () => {
    const spells = getMonSpellAll(opponent.model_id);
    const validSpells: Array<Spell> = spells.filter(
      (spell) => manaOpponent >= spell.mana
    );
    const recoverPVSpells: Array<Spell> = validSpells.filter(
      (spell) =>
        spell.effect === "recoverPV" ||
        spell.effect === "stealPV" ||
        spell.effect === "stealPVandMana"
    );
    const recoverManaSpells: Array<Spell> = validSpells.filter(
      (spell) =>
        spell.effect === "recoverMana" ||
        spell.effect === "stealMana" ||
        spell.effect === "stealPVandMana"
    );
    const willBeCast = () => {
      if (pvOpponent <= opponent.pv / 2 && recoverPVSpells.length > 0) {
        return recoverPVSpells[
          Math.floor(Math.random() * recoverPVSpells.length)
        ];
      } else if (
        manaOpponent <= opponent.mana / 2 &&
        recoverManaSpells.length > 0
      ) {
        return recoverManaSpells[
          Math.floor(Math.random() * recoverManaSpells.length)
        ];
      } else {
        return validSpells[Math.floor(Math.random() * validSpells.length)];
      }
    };
    let casting = castSpell(
      willBeCast(),
      opponent,
      dataMonFighting,
      { pv: pvOpponent, mana: manaOpponent },
      { pv: selfMon.pv, mana: selfMon.mana }
    );
    dispatch(
      gameSlice.actions.setPVandMana({
        index: monFighting,
        pv: casting.opponent.pv,
        mana: casting.opponent.mana,
      })
    );
    setPvOpponent(casting.caster.pv);
    setManaOpponent(casting.caster.mana);
    setEventPhase(0);
    setEventFight("attack");
    setDataText({
      fight: {
        castSelf: false,
        selfMon: dataMonFighting.name,
        opponent: opponent.name,
        spell: casting.spell,
        spellEffect: casting.effect,
        impact: casting.impact,
        effectiveness: casting.effectiveness,
      },
    });
    setSpellImg(casting.img);
  };

  const checkSpeed = () => {
    return dataMonFighting.speed >= opponent.speed;
  };

  useEffect(() => {
    if (nextControll && !interact) {
      if (eventFight === "attack") {
        if (phaseEvent === 0) {
          setEventPhase(1);
          setSpellImg(null);
        }
        if (phaseEvent === 1) {
          if (!myTurn) {
            if (selfMon.pv <= 0) {
              setEventFight("selfKO");
              setEventPhase(0);
              setDataText({ fight: { selfMon: dataMonFighting.name } });
            } else {
              setMyTurn(true);
              setInteract(true);
            }
          } else {
            if (pvOpponent <= 0) {
              setEventFight("opponentKO");
              setEventPhase(0);
              setDataText({ fight: { perso: perso, opponent: opponent.name } });
            } else {
              setMyTurn(false);
              opponentCasting();
            }
          }
        }
      }
      if (
        eventFight === "start" ||
        eventFight === "changeMon" ||
        eventFight === "bagRecover" ||
        eventFight === "gatchaAttempt"
      ) {
        if (phaseEvent === 0) {
          setEventPhase(1);
        }
        if (phaseEvent === 1 && monSendingFight === null) {
          if (
            checkSpeed() &&
            eventFight !== "bagRecover" &&
            eventFight !== "gatchaAttempt"
          ) {
            setMyTurn(true);
            setInteract(true);
          } else if (!dataText.fight.gatcha) {
            setMyTurn(false);
            opponentCasting();
          }
        }
      }
    } // eslint-disable-next-line
  }, [nextControll]);
};

export default useEventFightControll;
