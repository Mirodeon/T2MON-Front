import { DataBag } from "../types";
import * as data from "./dataItemBag";

const getDataBag = (model_id: number) => {
    const dataBag: DataBag = {};

    dataBag[1] = data.crystal;
    dataBag[2] = data.jar;
    dataBag[3] = data.pizza;
    dataBag[4] = data.potion;

    const item = dataBag[model_id];

    return item;
}

export default getDataBag;