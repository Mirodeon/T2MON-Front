import { createSlice } from "@reduxjs/toolkit";
import { KeyboardSettings } from "../../utils/types";

const initialState: KeyboardSettings = {
    zKey: "z",
    qKey: "q",
    sKey: "s",
    dKey: "d",
    aKey: "a",
    eKey: "e",
    spaceKey: " ",
    pKey: "p"
};

const keyboardSettingsSlice = createSlice({
    name: "keyboard",
    initialState,
    reducers: {
        setSettings(state: KeyboardSettings) {
            if (state.aKey === "a") {
                state.zKey = "w";
                state.qKey = "a";
                state.aKey = "q";
            } else {
                state.zKey = "z";
                state.qKey = "q";
                state.aKey = "a";
            }
        }
    },
});

export default keyboardSettingsSlice;