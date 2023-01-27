//interface user
export interface UserResponse {
    email: string;
    username: string;
    is_active: string;
    id: number;
}

export interface AccountResponse {
    id: number;
    email: string;
    username: string;
    is_active: boolean;
}

//interface game
export interface TeeTooMonState {
    id?: number;
    game_id: number;
    model_id: number;
    order: number;
    lvl: number;
    pv: number;
    mana: number;
    exp: number;
}

export interface BagState {
    id?: number;
    game_id: number;
    model_id: number;
    order: number;
    amount: number;
}

export interface GameState {
    id: number | null;
    is_active: boolean;
    name: string | null;
    pseudo: string | null;
    position: string | null;
    gold: number | null;
    team: Array<TeeTooMonState> | null;
    petStore: Array<TeeTooMonState> | null;
    bag: Array<BagState> | null;
}

//Interface DataMap
interface MapBox {
    [key: number]: number;
}
interface MapRow {
    [key: number]: MapBox;
}

export interface DataMap {
    [key: string]: MapRow;
}

export interface MapEnv {
    [key: number]: string;
}

//Interface Character
export interface DataFrame {
    [key: string]: string[];
}

//Interface Mon
export interface Stats {
    init: number;
    markup: number;
}

export interface DataMon {
    model_id: number;
    name: string;
    lvl: number;
    pv: number;
    mana: number;
    atk: number;
    def: number;
    speed: number;
    dodge: number;
    exp: number;
    type: Array<string>;
    givenExp: number;
    givenGold: number;
    img: any;
}
// interface bag
export interface DataBag {
    [key: number]: ItemBag;
}
export interface ItemBag {
    name: string;
    cost: number;
    effect: string;
    description: string;
    img: any;
}

//interface change Order
export interface ChangeOrder {
    index: number;
    order: number;
}

//interface Spell
export interface Spell {
    name: string;
    mana: number;
    impact: number;
    effect: string;
    type: string;
    img: any;
}

//interface data for text
export interface InfoText {
    fight: {
        opponent?: string;
        selfMon?: string;
        perso?: string;
        impact?: number;
        effectiveness?: string;
        item?: string;
        gatcha?: boolean;//succes of gatcha attempt
        roomTeam?: boolean;//room in team = true else false
        gold?: number;
        exp?: number;
        spell?: string;
        spellEffect?: string;
        castSelf?: boolean;//selfmon use spell = true, opponent use spell = false
    };
}

//interface data text in hut
export interface HutText {
    id: number;
    mon?: DataMon;
    bag?: ItemBag;
}

//interface controll
export interface ControllActivity {
    z: boolean;
    q: boolean;
    s: boolean;
    d: boolean;
    a: boolean;
    e: boolean;
    space: boolean;
    p: boolean;
    moving: boolean;
    onlyZ: boolean;
    onlyQ: boolean;
    onlyS: boolean;
    onlyD: boolean;
    onlySpace: boolean;
    onlyP: boolean;
};

//interface responsive
export interface Responsive {
    width: boolean;
    height: boolean;
}

//interface keyboard settings
export interface KeyboardSettings {
    zKey: string;
    qKey: string;
    sKey: string;
    dKey: string;
    aKey: string;
    eKey: string;
    spaceKey: string;
    pKey: string;
}