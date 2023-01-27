const createItemBag = (name: string,
    cost: number,
    effect: string,
    description: string,
    img: any) => {
    return {
        name: name,
        cost: cost,
        effect: effect,
        description: description,
        img: img
    };

}

export default createItemBag;