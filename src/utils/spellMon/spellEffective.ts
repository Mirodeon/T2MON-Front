interface RelationType {
    [key: string]: {
        up: Array<number>;
        down: Array<number>;
    }
}

const spellEffective = (spellType: string, monType: Array<string>) => {
    const dataType = ["Darkness", "Earth", "Fire", "Ice", "Light", "Neutral", "Physic", "Water", "Wind"];
    const relationType: RelationType = {
        Darkness: { up: [4], down: [2, 5] },
        Earth: { up: [7, 6], down: [2, 8] },
        Fire: { up: [3, 1], down: [7, 8] },
        Ice: { up: [7, 6], down: [2] },
        Light: { up: [0], down: [6, 5] },
        Neutral: { up: [0, 4], down: [6, 5] },
        Physic: { up: [3, 5], down: [0, 8] },
        Water: { up: [2], down: [3] },
        Wind: { up: [2, 1], down: [] }
    }
    let effectiveness = 1;
    monType.forEach(carac => {
        relationType[spellType].up.forEach(upType => { if (carac === dataType[upType]) { effectiveness = effectiveness + 1; } });
        relationType[spellType].down.forEach(downType => { if (carac === dataType[downType]) { effectiveness = effectiveness - 1; } });
    });
    return effectiveness > 1 ? 1.5 : effectiveness < 1 ? 0.5 : 1;
};

export default spellEffective;