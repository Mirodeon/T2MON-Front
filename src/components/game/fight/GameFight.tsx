import React, { useState } from "react";
import {
  DataMon,
  TeeTooMonState,
  InfoText,
  BagState,
} from "../../../utils/types";
import useTimeOut from "../../../utils/useTimeOut";
import { addClassName, removeClasseName } from "../../../utils/addClassName";
import getDataMon from "../../../utils/t2mon/getDataMon";
import useGameControll from "../utils/useGameControll";
import {
  MonFight,
  BoxInteractFight,
  BoxSpellFight,
  GameTeam,
  SpellCast,
  GameBag,
  TextGame,
} from "..";
import { getMonSpellAll } from "../../../utils/t2mon/getMonSpell";
import useEventFightControll from "../utils/useEventFightControll";
import useChangeMonFight from "../utils/useChangeMonFight";
import getDataBag from "../../../utils/bag/getDataBag";
import useItemFight from "../utils/useItemFight";

type GameFightProps = {
  team: Array<TeeTooMonState>;
  perso: string;
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
  setSubPanel: React.Dispatch<React.SetStateAction<string>>;
  subPanel: string;
  fightData: DataMon;
  petStore: Array<TeeTooMonState>;
  bag: Array<BagState>;
  gold: number;
};

const GameFight = ({
  team,
  perso,
  setPanel,
  panel,
  setSubPanel,
  subPanel,
  fightData,
  petStore,
  bag,
  gold,
}: GameFightProps) => {
  const [monFighting, setMonFighting] = useState(0);
  const [pvOpponent, setPvOpponent] = useState(fightData.pv);
  const [manaOpponent, setManaOpponent] = useState(fightData.mana);
  const [eventFight, setEventFight] = useState("start");
  const [phaseEvent, setEventPhase] = useState(0);
  const [myTurn, setMyTurn] = useState(false);
  const [interact, setInteract] = useState(false);
  const [interactSpell, setInteractSpell] = useState(false);
  const dataMonFighting = getDataMon(
    team[monFighting].model_id,
    team[monFighting].lvl
  );
  const monSpells = getMonSpellAll(team[monFighting].model_id);
  const [dataText, setDataText] = useState<InfoText>({
    fight: { opponent: fightData.name, selfMon: dataMonFighting.name },
  });
  const controll = useGameControll();
  const textFight = (event: string, phase: number, data: InfoText) =>
    TextGame("fight", event, phase, data);

  // close fight
  const [fadeOut, setFadeOut] = useState(false);
  const finishFight = () => {
    addClassName("fade_out", ".container_game_fight", 0);
    setFadeOut(true);
  };
  useTimeOut(
    () => {
      setPanel("game");
    },
    fadeOut ? 700 : null
  );

  // close box interact spell cast
  const [fadeOutBoxSpell, setFadeOutBoxSpell] = useState(false);
  const closeBoxSpell = () => {
    addClassName("fade_out", ".container_spell_fight", 0);
    setFadeOutBoxSpell(true);
  };
  useTimeOut(
    () => {
      setInteractSpell(false);
      setFadeOutBoxSpell(false);
    },
    fadeOutBoxSpell ? 700 : null
  );

  // close box interact
  const [fadeOutBoxInteract, setFadeOutBoxInteract] = useState(false);
  const closeBoxInteract = () => {
    addClassName("fade_out", ".container_interact_fight", 0);
    setFadeOutBoxInteract(true);
  };
  useTimeOut(
    () => {
      setInteract(false);
      setFadeOutBoxInteract(false);
    },
    fadeOutBoxInteract ? 700 : null
  );

  //send a new mon fight
  const [monSendingFight, setMonSendingFight] = useState<number | null>(null);
  const changeMon = (mon: number, firstSending: boolean) => {
    setMyTurn(false);
    setInteract(false);
    setEventPhase(0);
    let dataText: InfoText = {
      fight: { selfMon: getDataMon(team[mon].model_id, team[mon].lvl).name },
    };
    if (!firstSending) {
      setMonSendingFight(mon);
      addClassName("fade_out", ".item_game_fight.self", 0);
      addClassName("fade_out", ".container_img_game_fight.self", 0);
      setEventFight("changeMon");
    } else {
      setMonFighting(mon);
      dataText.fight.opponent = fightData.name;
    }
    setDataText(dataText);
  };

  useTimeOut(
    () => {
      if (typeof monSendingFight === "number") {
        setMonFighting(monSendingFight);
      }
      removeClasseName("fade_out", ".item_game_fight.self", 0);
      removeClasseName("fade_out", ".container_img_game_fight.self", 0);
      setMonSendingFight(null);
    },
    typeof monSendingFight === "number" ? 1400 : null
  );

  //SpellCast img
  const [spellImg, setSpellImg] = useState<any>(null);
  useTimeOut(
    () => {
      setSpellImg(null);
    },
    spellImg ? 2700 : null
  );

  //phase Attack controll
  useEventFightControll(
    controll,
    eventFight,
    setEventFight,
    phaseEvent,
    setEventPhase,
    myTurn,
    setMyTurn,
    interact,
    setInteract,
    fightData,
    pvOpponent,
    setPvOpponent,
    manaOpponent,
    setManaOpponent,
    dataMonFighting,
    team[monFighting],
    monFighting,
    dataText,
    setDataText,
    setSpellImg,
    perso,
    monSendingFight
  );

  //first mon fighting, change mon, checkAlive self and opponent controll
  useChangeMonFight(
    controll,
    perso,
    team,
    fightData,
    dataMonFighting,
    monFighting,
    finishFight,
    eventFight,
    setEventFight,
    phaseEvent,
    setEventPhase,
    interact,
    setDataText,
    changeMon
  );

  //use an item
  const usingInFight = (model_id: number) => {
    console.log("Using item !!");
    let dataItem = getDataBag(model_id);
    let dataText: InfoText = {
      fight: {
        selfMon: dataMonFighting.name,
        perso: perso,
        item: dataItem.name,
      },
    };
    let itemEvent =
      dataItem.effect === "recoverPV" || dataItem.effect === "recoverMana"
        ? "bagRecover"
        : "bagBall";
    setMyTurn(false);
    setInteract(false);
    setEventPhase(0);
    setEventFight(itemEvent);
    setDataText(dataText);
    setSpellImg(dataItem.img);
  };

  //event item, gatcha controll
  useItemFight(
    controll,
    eventFight,
    setEventFight,
    phaseEvent,
    setEventPhase,
    interact,
    setDataText,
    fightData,
    dataMonFighting,
    dataText,
    finishFight,
    team,
    perso
  );

  return (
    <>
      <div className="container_game_fight">
        <div className="container_item_game_fight">
          {/*opponent t2mon*/}
          <MonFight
            name={fightData.name}
            img={fightData.img}
            lvl={fightData.lvl}
            currentPv={pvOpponent}
            totalPv={fightData.pv}
            currentMana={manaOpponent}
            totalMana={fightData.mana}
            opponent={true}
          />
          {/*self t2mon*/}
          <MonFight
            name={dataMonFighting.name}
            img={dataMonFighting.img}
            lvl={dataMonFighting.lvl}
            currentPv={team[monFighting].pv}
            totalPv={dataMonFighting.pv}
            currentMana={team[monFighting].mana}
            totalMana={dataMonFighting.mana}
            opponent={false}
          />
          {/*img spell*/}
          {spellImg ? <SpellCast img={spellImg} /> : null}
        </div>
        <div className="container_interface_fight">
          {interactSpell ? (
            <BoxSpellFight
              spells={monSpells}
              controll={controll}
              subPanel={subPanel}
              selfMon={team[monFighting]}
              dataMonFighting={dataMonFighting}
              opponent={fightData}
              pvOpponent={pvOpponent}
              setPvOpponent={setPvOpponent}
              manaOpponent={manaOpponent}
              setManaOpponent={setManaOpponent}
              closeBoxSpell={closeBoxSpell}
              monFighting={monFighting}
              closeBoxInteract={closeBoxInteract}
              setEventFight={setEventFight}
              setEventPhase={setEventPhase}
              setDataText={setDataText}
              setSpellImg={setSpellImg}
            />
          ) : (
            <div className="container_text_fight">
              {/*dialogue box*/}
              {textFight(eventFight, phaseEvent, dataText)}
              <span className="blink"> &#x25BC;</span>
            </div>
          )}
          {/*box interact*/}
          {interact ? (
            <BoxInteractFight
              setSubPanel={setSubPanel}
              subPanel={subPanel}
              controll={controll}
              interact={interact}
              interactSpell={interactSpell}
              setInteractSpell={setInteractSpell}
              finishFight={finishFight}
              closeBoxSpell={closeBoxSpell}
            />
          ) : null}
        </div>
      </div>
      {subPanel === "t2mon" ? (
        <GameTeam
          team={team}
          setSubPanel={setSubPanel}
          panel={panel}
          monFighting={monFighting}
          changeMon={changeMon}
        />
      ) : null}
      {subPanel === "bag" ? (
        <GameBag
          bag={bag}
          setSubPanel={setSubPanel}
          panel={panel}
          gold={gold}
          team={team}
          monInFight={monFighting}
          usingInFight={usingInFight}
          petStore={petStore}
        />
      ) : null}
    </>
  );
};

export default GameFight;
