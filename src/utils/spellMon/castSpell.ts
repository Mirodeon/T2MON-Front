import { DataMon, Spell } from "../types";
import spellEffective from "./spellEffective";

interface Statut {
    pv: number;
    mana: number;
}

interface AfterSpell {
    caster: Statut;
    opponent: Statut;
    effectiveness: string;
    impact: number;
    spell: string;
    effect: string;
    img: any;
}

const castSpell = (
    spell: Spell,
    caster: DataMon,
    opponent: DataMon,
    casterStatut: Statut,
    opponentStatut: Statut
): AfterSpell => {
    const statut: AfterSpell = {
        caster: casterStatut,
        opponent: opponentStatut,
        effectiveness: "",
        impact: 0,
        spell: spell.name,
        effect: spell.effect,
        img: spell.img
    };

    const effectiveness = spellEffective(spell.type, opponent.type);
    if (effectiveness === 1.5) {
        statut.effectiveness = "effective";
    }
    if (effectiveness === 0.5) {
        statut.effectiveness = "ineffective";
    }

    const impact = Math.round((spell.impact + ((spell.impact ** ((caster.atk - opponent.def) / 100)) * caster.lvl)) * effectiveness);
    const selfImpact = Math.round(spell.impact + (spell.impact ** (caster.def / 1000)));

    if (caster.mana >= spell.mana) {
        if (spell.effect === "damage") {
            statut.opponent.pv = statut.opponent.pv - impact;
        }
        if (spell.effect === "damageMana") {
            statut.opponent.mana = statut.opponent.mana - impact;
        }
        if (spell.effect === "recoverPV") {
            statut.caster.pv = statut.caster.pv + selfImpact;
        }
        if (spell.effect === "recoverMana") {
            statut.caster.mana = statut.caster.mana + selfImpact;
        }
        if (spell.effect === "stealPV") {
            statut.opponent.pv = statut.opponent.pv - impact;
            statut.caster.pv = statut.caster.pv + impact;
        }
        if (spell.effect === "stealMana") {
            statut.opponent.mana = statut.opponent.mana - impact;
            statut.caster.mana = statut.caster.mana + impact;
        }
        if (spell.effect === "stealPVandMana") {
            statut.opponent.pv = statut.opponent.pv - impact;
            statut.caster.pv = statut.caster.pv + impact;
            statut.opponent.mana = statut.opponent.mana - impact;
            statut.caster.mana = statut.caster.mana + impact;
        }
        statut.caster.mana = statut.caster.mana - spell.mana; //mana cost spell
    }

    if (spell.effect === "recoverPV" || spell.effect === "recoverMana") {
        statut.impact = selfImpact;
        statut.effectiveness = "";
    } else {
        statut.impact = impact;
    }

    //avoid <0 and >total
    if (statut.caster.pv > caster.pv) {
        statut.caster.pv = caster.pv;
    }
    if (statut.caster.mana > caster.mana) {
        statut.caster.mana = caster.mana;
    }
    if (statut.opponent.pv < 0) {
        statut.opponent.pv = 0;
    }
    if (statut.opponent.mana < 0) {
        statut.opponent.mana = 0;
    }

    return statut;
};

export default castSpell;