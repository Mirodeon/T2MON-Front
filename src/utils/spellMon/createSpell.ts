const createSpell = (
    name: string,
    consumption: number,
    impact: number,
    effect: string,
    type: string,
    img: any
) => {
    return {
        name: name,
        mana: consumption,
        impact: impact,
        effect: effect,
        type: type,
        img: img
    };
}
export default createSpell;