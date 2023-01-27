import React, { useState } from "react";
import getDataSpell from "../../utils/spellMon/getDataSpell";

const WikiSpell = () => {
  const [count, setCount] = useState(0);

  const spellData = () => {
    let data = [];
    for (let i = 1; i <= 29; i++) {
      data[i - 1] = getDataSpell(i);
    }
    data.sort((a, b) => {
      return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
    });
    return data;
  };
  const dataSpell = spellData();
  const spell = dataSpell[count];

  const getDetails = () => {
    let effect = spell.effect;
    let result = { effect: "", ressource: "" };
    if (effect === "damage" || effect === "damageMana") {
      result.effect = "D";
    }
    if (effect === "recoverPV" || effect === "recoverMana") {
      result.effect = "R";
    }
    if (
      effect === "stealPV" ||
      effect === "stealMana" ||
      effect === "stealPVandMana"
    ) {
      result.effect = "S";
    }
    if (effect === "damage" || effect === "recoverPV" || effect === "stealPV") {
      result.ressource = "PV";
    }
    if (
      effect === "damageMana" ||
      effect === "recoverMana" ||
      effect === "stealMana"
    ) {
      result.ressource = "Mana";
    }
    if (effect === "stealPVandMana") {
      result.ressource = "PVandMana";
    }
    return result;
  };
  const details = getDetails();

  const prev = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(dataSpell.length - 1);
    }
  };
  const next = () => {
    if (count < dataSpell.length - 1) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  };

  return (
    <div className="container_wikispell">
      <div className="container_arrow_wikispell prev" onClick={prev}>
        <div className="arrow_wikispell prev"></div>
      </div>
      <div className="container_arrow_wikispell next" onClick={next}>
        <div className="arrow_wikispell next"></div>
      </div>
      <div className="container_spell_wiki">
        <div className="container_detail_spell">
          <div className="name_spell">{spell.name}</div>
          <div className="container_info_spell">
            <div className="mana_spell">{spell.mana}</div>
            <div className={"effect_spell " + details.ressource}>
              {details.effect}
            </div>
            <div className={"type_spell " + spell.type}>{spell.impact}</div>
          </div>
        </div>
        <div className="container_info_effect">
          <div className="info_effect">D : Damage</div>
          <div className="info_effect">R : Recover</div>
          <div className="info_effect">S : Steal</div>
        </div>
      </div>
    </div>
  );
};

export default WikiSpell;
