import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState, TeeTooMonState, BagState, ChangeOrder, DataMon } from "../../utils/types";
import getDataMon from "../../utils/t2mon/getDataMon";

const initialState: GameState = {
    id: null, is_active: false, name: null, pseudo: null, position: null, gold: null, team: null, petStore: null, bag: null
};

const compareOrder = (a: TeeTooMonState | BagState, b: TeeTooMonState | BagState) => {
    return a.order - b.order;
};

const removeByOrder = (team: Array<TeeTooMonState>, change: ChangeOrder) => {
    team.splice(change.index, 1);
    team.forEach(i => { if (i.order > change.order) { i.order-- } });
    team.sort(compareOrder);
    return team;
};

const removeByOrderBag = (bag: Array<BagState>, change: ChangeOrder) => {
    bag.splice(change.index, 1);
    bag.forEach(i => { if (i.order > change.order) { i.order-- } });
    bag.sort(compareOrder);
    return bag;
};

const gainExpAndLvl = (mon: TeeTooMonState, gainExp: number) => {
    let dataMon = getDataMon(mon.model_id, mon.lvl);
    if (mon.exp + gainExp >= dataMon.exp) {
        mon.exp = mon.exp + gainExp - dataMon.exp;
        mon.lvl = mon.lvl >= 100 ? mon.lvl : mon.lvl + 1;
        mon.pv = dataMon.pv;
        mon.mana = dataMon.mana;
    } else {
        mon.exp = mon.exp + gainExp;
    }
    return mon;
};

const fullRecovery = (team: Array<TeeTooMonState>) => {
    team.forEach(mon => {
        let dataMon = getDataMon(mon.model_id, mon.lvl);
        mon.pv = dataMon.pv;
        mon.mana = dataMon.mana;
    });
    return team;
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setActivityOn(
            state: GameState,
            action: PayloadAction<GameState>
        ) {
            state.id = action.payload.id;
            state.is_active = action.payload.is_active;
            state.name = action.payload.name;
            state.pseudo = action.payload.pseudo;
            state.position = action.payload.position;
            state.gold = action.payload.gold;
            state.team = action.payload.team;
            state.petStore = action.payload.petStore;
            state.bag = action.payload.bag;
        },
        setPosition(state: GameState, action: PayloadAction<{ position: string }>) {
            state.position = action.payload.position;
        },
        setGainGold(state: GameState, action: PayloadAction<number>) {
            if ((state.gold || state.gold === 0) && (action.payload + state.gold) > 0) {
                state.gold = state.gold + action.payload;
            } else {
                state.gold = 1;
            }
        },
        setOrder(state: GameState, action: PayloadAction<Array<ChangeOrder>>) {
            action.payload.forEach(e => {
                if (state.team) {
                    state.team[e.index].order = e.order;
                }
            });
            state.team?.sort(compareOrder);
        },
        setDeleteByOrder(state: GameState, action: PayloadAction<ChangeOrder>) {
            if (state.team) {
                state.team = removeByOrder(state.team, action.payload);
            }
        },
        setAddMonTeam(state: GameState, action: PayloadAction<DataMon>) {
            let newMon: TeeTooMonState = {
                game_id: state.id ? state.id : 0,
                model_id: action.payload.model_id,
                order: 0,
                lvl: action.payload.lvl,
                pv: action.payload.pv,
                mana: action.payload.mana,
                exp: 0
            };
            if (state.team && state.team.length < 6) {
                newMon.order = state.team.length + 1;
                state.team[state.team.length] = newMon;
            } else if (state.petStore && state.petStore.length < 30) {
                newMon.order = state.petStore.length + 1;
                state.petStore[state.petStore.length] = newMon;
            }
        },
        setAddMonPetStore(state: GameState, action: PayloadAction<DataMon>) {
            let newMon: TeeTooMonState = {
                game_id: state.id ? state.id : 0,
                model_id: action.payload.model_id,
                order: 0,
                lvl: action.payload.lvl,
                pv: action.payload.pv,
                mana: action.payload.mana,
                exp: 0
            };
            if (state.petStore && state.petStore.length < 30) {
                newMon.order = state.petStore.length + 1;
                state.petStore[state.petStore.length] = newMon;
            }
        },
        setDeleteInPetStore(state: GameState, action: PayloadAction<ChangeOrder>) {
            if (state.petStore) {
                state.petStore = removeByOrder(state.petStore, action.payload);
            }
        },
        setOrderPetStore(state: GameState, action: PayloadAction<Array<ChangeOrder>>) {
            action.payload.forEach(e => {
                if (state.petStore) {
                    state.petStore[e.index].order = e.order;
                }
            });
            state.petStore?.sort(compareOrder);
        },
        setPVandMana(state: GameState, action: PayloadAction<{ index: number, pv: number, mana: number }>) {
            if (state.team) {
                state.team[action.payload.index].pv = action.payload.pv;
                state.team[action.payload.index].mana = action.payload.mana;
            }
        },
        setGainExp(state: GameState, action: PayloadAction<{ index: number, gainExp: number }>) {
            if (state.team) {
                state.team[action.payload.index] = gainExpAndLvl(state.team[action.payload.index], action.payload.gainExp);
            }
        },
        setFullRecovery(state: GameState) {
            if (state.team) {
                state.team = fullRecovery(state.team);
            }
        },
        setUseItem(state: GameState, action: PayloadAction<{ effect: string, mon: number }>) {
            if (state.team) {
                let mon = state.team[action.payload.mon];
                let dataMon = getDataMon(mon.model_id, mon.lvl);

                if (action.payload.effect === "lvlUp") {
                    state.team[action.payload.mon].lvl = mon.lvl >= 100 ? mon.lvl : mon.lvl + 1;
                }
                if (action.payload.effect === "recoverMana") {
                    state.team[action.payload.mon].mana =
                        Math.round(mon.mana > (dataMon.mana / 2) ? dataMon.mana : mon.mana + (dataMon.mana / 2));
                }
                if (action.payload.effect === "recoverPV") {
                    state.team[action.payload.mon].pv =
                        Math.round(mon.pv > (dataMon.pv / 2) ? dataMon.pv : mon.pv + (dataMon.pv / 2));
                }
            }
        },
        setOrderBag(state: GameState, action: PayloadAction<Array<ChangeOrder>>) {
            action.payload.forEach(e => {
                if (state.bag) {
                    state.bag[e.index].order = e.order;
                }
            });
            state.bag?.sort(compareOrder);
        },
        setAmountBag(state: GameState, action: PayloadAction<{ index: number, amount: number }>) {
            if (state.bag) {
                state.bag[action.payload.index].amount = action.payload.amount;
            }
        },
        setDeleteItemBag(state: GameState, action: PayloadAction<ChangeOrder>) {
            if (state.bag) {
                state.bag = removeByOrderBag(state.bag, action.payload);
            }
        },
        setAddItemBag(state: GameState, action: PayloadAction<BagState>) {
            let newBag: BagState = {
                game_id: state.id ? state.id : 0,
                model_id: action.payload.model_id,
                order: 0,
                amount: action.payload.amount
            };
            if (state.bag && state.bag.length < 6) {
                newBag.order = state.bag.length + 1;
                state.bag[state.bag.length] = newBag;
            }
        },
        setActivityOff(state: GameState) {
            state.id = null;
            state.is_active = false;
            state.name = null;
            state.pseudo = null;
            state.position = null;
            state.gold = null;
            state.team = null;
            state.petStore = null;
            state.bag = null;
        },
    },
});

export default gameSlice;