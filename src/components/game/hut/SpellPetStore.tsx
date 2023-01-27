import React from "react";
import { getMonSpellAll } from "../../../utils/t2mon/getMonSpell";
import { Spell } from "../../../utils/types";

type SpellPetStoreProps = {
  model_id: number;
};

const SpellPetStore = ({ model_id }: SpellPetStoreProps) => {
  const spells = getMonSpellAll(model_id);
  const details = (spell: Spell) => {
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
  return (
    <div className="container_spell_pet_store">
      {spells.map((spell: Spell, index: number) => {
        return (
          <div key={index} className="spell_pet_store">
            <div className="name_spell_pet_store">{spell.name}</div>
            <div className="container_info_spell_pet_store">
              <div className="mana_spell_pet_store">{spell.mana}</div>
              <div
                className={"effect_spell_pet_store " + details(spell).ressource}
              >
                {details(spell).effect}
              </div>
              <div className={"type_spell_pet_store " + spell.type}>
                {spell.impact}
              </div>
            </div>
          </div>
        );
      })}
      <div className="container_info_effect">
        <div className="info_effect">D : Damage</div>
        <div className="info_effect">R : Recover</div>
        <div className="info_effect">S : Steal</div>
      </div>
    </div>
  );
};

export default SpellPetStore;
