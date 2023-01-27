import React from "react";
import { InfoText } from "../../../utils/types";

interface DataText {
  [key: string]: { [key: string]: { [key: number]: JSX.Element } };
}

const TextGame = (
  keyEvent: string,
  keyText: string,
  phase: number,
  data: InfoText
) => {
  const fightTxt = data.fight;
  const monUseSpell = fightTxt.castSelf ? fightTxt.selfMon : fightTxt.opponent;
  const monRecieveSpell = fightTxt.castSelf
    ? fightTxt.opponent
    : fightTxt.selfMon;
  const spellDamagePV =
    fightTxt.spellEffect === "damage" ||
    fightTxt.spellEffect === "stealPV" ||
    fightTxt.spellEffect === "stealPVandMana";
  const spellDamageMana =
    fightTxt.spellEffect === "damageMana" ||
    fightTxt.spellEffect === "stealMana" ||
    fightTxt.spellEffect === "stealPVandMana";
  const spellRecoverPV =
    fightTxt.spellEffect === "recoverPV" ||
    fightTxt.spellEffect === "stealPV" ||
    fightTxt.spellEffect === "stealPVandMana";
  const spellRecoverMana =
    fightTxt.spellEffect === "recoverMana" ||
    fightTxt.spellEffect === "stealMana" ||
    fightTxt.spellEffect === "stealPVandMana";

  const dataText: DataText = {
    fight: {
      start: {
        0: <>A wild {fightTxt.opponent} appears!</>,
        1: (
          <>
            {fightTxt.selfMon}! <br />
            Beat the shit out of it!
          </>
        ),
      },
      attack: {
        0: (
          <>
            {monUseSpell} use {fightTxt.spell}.
          </>
        ),
        1: (
          <>
            {spellDamagePV || spellDamageMana ? (
              <>
                {monRecieveSpell}
                {spellDamagePV ? <> recieved {fightTxt.impact} damage</> : null}
                {spellDamagePV && spellDamageMana ? <> and</> : null}
                {spellDamageMana ? <> lost {fightTxt.impact} mana</> : null}.
                {spellRecoverPV ||
                spellRecoverMana ||
                fightTxt.effectiveness === "effective" ||
                fightTxt.effectiveness === "ineffective" ? (
                  <br />
                ) : null}
              </>
            ) : null}
            {spellRecoverPV || spellRecoverMana ? (
              <>
                {monUseSpell} recovers {fightTxt.impact}
                {spellRecoverPV ? <> PV</> : null}
                {spellRecoverPV && spellRecoverMana ? <> and</> : null}
                {spellRecoverMana ? <> Mana</> : null}.
                {fightTxt.effectiveness === "effective" ||
                fightTxt.effectiveness === "ineffective" ? (
                  <br />
                ) : null}
              </>
            ) : null}
            {fightTxt.effectiveness === "effective" ? (
              <>It's super effective!</>
            ) : fightTxt.effectiveness === "ineffective" ? (
              <>It's not very effective!</>
            ) : null}
          </>
        ),
      },
      changeMon: {
        0: <>{fightTxt.selfMon}, I choose you!</>,
        1: <>{fightTxt.selfMon} prove your worth.</>,
      },
      selfKO: {
        0: <>{fightTxt.selfMon} is no longer in a condition to shine.</>,
        1: <>What a shame.</>,
      },
      opponentKO: {
        0: (
          <>
            {fightTxt.perso} taught {fightTxt.opponent} a great lesson.
          </>
        ),
        1: <>{fightTxt.opponent} run away to lick its wounds.</>,
      },
      bagRecover: {
        0: (
          <>
            {fightTxt.perso} use {fightTxt.item}.
          </>
        ),
        1: (
          <>
            {fightTxt.selfMon} recovers half of its
            {fightTxt.item === "Potion" ? "PV" : "Mana"}.
          </>
        ),
      },
      bagBall: {
        0: (
          <>
            {fightTxt.perso} throw a {fightTxt.item}!
          </>
        ),
        1: (
          <>
            Yeah... It is...?
            <br />
            Yes it is! It's a wild poaching attempt!
          </>
        ),
      },
      gatchaAttempt: {
        0: <>{fightTxt.opponent} struggles!</>,
        1: (
          <>
            {fightTxt.gatcha ? (
              <>
                {fightTxt.perso} is a great poacher!
                <br />
                {fightTxt.opponent}, exhausted, submitted to the omnipotence of
                the jar!
              </>
            ) : (
              <>
                {fightTxt.perso} certainly lacks talent.
                <br />
                His attempt to trick {fightTxt.opponent} with his jar is a
                complete failure.
              </>
            )}
          </>
        ),
      },
      gatchaSuccess: {
        0: (
          <>
            Congratulation ! {fightTxt.perso} successfully captured this poor
            helpless T2MON.
          </>
        ),
        1: (
          <>
            {fightTxt.roomTeam ? (
              <>
                {fightTxt.opponent} has now joined {fightTxt.perso}'s slaves...
                <br />
                Uh, sorry, {fightTxt.perso}'s team.
              </>
            ) : (
              <>
                {fightTxt.opponent} was sent to {fightTxt.perso}'s dreadful
                prison...
                <br />
                Uh, sorry, {fightTxt.perso}'s mysterious storage space.
              </>
            )}
          </>
        ),
      },
      lose: {
        0: (
          <>
            What a disappointment.
            <br />
            It looks like {fightTxt.perso} is a loser.
          </>
        ),
        1: (
          <>
            {fightTxt.perso} loses {fightTxt.gold} gold.
            <br />
            Find a hut to recover. Loser.
          </>
        ),
      },
      win: {
        0: (
          <>
            {fightTxt.selfMon} receives {fightTxt.exp} experience points.
            <br />
            {fightTxt.perso} earns {fightTxt.gold} gold.
          </>
        ),
        1: (
          <>
            What a Hero!
            <br />
            {fightTxt.perso} beat a wild T2MON!
          </>
        ),
      },
    },
  };
  return dataText[keyEvent][keyText][phase];
};
export default TextGame;
