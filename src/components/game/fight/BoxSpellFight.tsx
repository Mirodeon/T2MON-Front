import React, { useEffect, useState } from "react";
import {
  slideDown,
  slideLateral,
  slideReset,
  slideUp,
} from "../../../utils/slideList";
import castSpell from "../../../utils/spellMon/castSpell";
import {
  ControllActivity,
  DataMon,
  InfoText,
  Spell,
  TeeTooMonState,
} from "../../../utils/types";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";

type BoxSpellFightProps = {
  spells: Array<Spell>;
  controll: ControllActivity;
  subPanel: string;
  selfMon: TeeTooMonState;
  dataMonFighting: DataMon;
  opponent: DataMon;
  pvOpponent: number;
  setPvOpponent: React.Dispatch<React.SetStateAction<number>>;
  manaOpponent: number;
  setManaOpponent: React.Dispatch<React.SetStateAction<number>>;
  closeBoxSpell: () => void;
  monFighting: number;
  closeBoxInteract: () => void;
  setEventFight: React.Dispatch<React.SetStateAction<string>>;
  setEventPhase: React.Dispatch<React.SetStateAction<number>>;
  setDataText: React.Dispatch<React.SetStateAction<InfoText>>;
  setSpellImg: React.Dispatch<React.SetStateAction<any>>;
};

const BoxSpellFight = ({
  spells,
  controll,
  subPanel,
  selfMon,
  dataMonFighting,
  opponent,
  pvOpponent,
  setPvOpponent,
  manaOpponent,
  setManaOpponent,
  closeBoxSpell,
  monFighting,
  closeBoxInteract,
  setEventFight,
  setEventPhase,
  setDataText,
  setSpellImg,
}: BoxSpellFightProps) => {
  const [countInteract, setCountInteract] = useState(0);
  const [neverCast, setNeverCast] = useState(true);
  const dispatch = useDispatch();

  const checkMana = (index: number) => {
    return selfMon.mana >= spells[index].mana;
  };

  const spellCasting = (spell: Spell) => {
    let casting = castSpell(
      spell,
      dataMonFighting,
      opponent,
      { pv: selfMon.pv, mana: selfMon.mana },
      { pv: pvOpponent, mana: manaOpponent }
    );
    dispatch(
      gameSlice.actions.setPVandMana({
        index: monFighting,
        pv: casting.caster.pv,
        mana: casting.caster.mana,
      })
    );
    setPvOpponent(casting.opponent.pv);
    setManaOpponent(casting.opponent.mana);
    setEventPhase(0);
    setEventFight("attack");
    setDataText({
      fight: {
        castSelf: true,
        selfMon: dataMonFighting.name,
        opponent: opponent.name,
        spell: casting.spell,
        spellEffect: casting.effect,
        impact: casting.impact,
        effectiveness: casting.effectiveness,
      },
    });
    setSpellImg(casting.img);
    closeBoxInteract();
    closeBoxSpell();
  };

  useEffect(() => {
    setCountInteract(slideReset(countInteract, `.item_spell_fight`)); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (subPanel === "none") {
      if (controll.e) {
        closeBoxSpell();
      }
      if (controll.onlyZ) {
        setCountInteract(slideUp(countInteract, `.item_spell_fight`));
      }
      if (controll.onlyS) {
        setCountInteract(slideDown(countInteract, `.item_spell_fight`));
      }
      if (controll.onlyQ || controll.onlyD) {
        setCountInteract(slideLateral(countInteract, `.item_spell_fight`));
      }
    } // eslint-disable-next-line
  }, [controll]);

  useNonInitialEffect(() => {
    if (subPanel === "none") {
      if (controll.a && checkMana(countInteract) && neverCast) {
        setNeverCast(false);
        spellCasting(spells[countInteract]);
      }
    }
  }, [controll.a]);

  return (
    <div className="container_spell_fight">
      {spells.map((spell: Spell, index: number) => {
        return (
          <div
            key={index}
            className="item_spell_fight"
            {...(checkMana(index) &&
              neverCast && {
                onClick: () => {
                  setNeverCast(false);
                  spellCasting(spell);
                },
              })}
          >
            <div className="name_spell_fight">{spell.name}</div>
            <div className="container_info_spell_fight">
              <div
                className={
                  "mana_spell_fight" + (checkMana(index) ? "" : " not_enough")
                }
              >
                {spell.mana}
              </div>
              <div className={"type_spell_fight " + spell.type}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoxSpellFight;
