import { createSlice } from "@reduxjs/toolkit";
import { sampleSCSInputs } from "torneko3js";

import { SliceSCSInput } from "./slice.interface";
import {
  actionChangeField,
  actionChangeFieldSize,
  actionMoveField,
  actionSetTurn,
  actionSetTrial,
  actionSetFriend,
  actionSetNumSumoLimit
} from "./actionSCSInput";

const initialState: SliceSCSInput = {
  templateName: "4キラーマ倍速",
  inp: sampleSCSInputs["4キラーマ倍速"],
  activePlace: { row: -1, col: -1 }
};

const scsInputSlice = createSlice({
  name: "scsInput",
  initialState,
  reducers: {
    // templateName
    setTemplate: (state, action) => ({
      ...state,
      templateName: action.payload,
      inp: sampleSCSInputs[action.payload]
    }),
    // inp.field
    changeField: actionChangeField,
    changeFieldSize: actionChangeFieldSize,
    moveField: actionMoveField,
    // inp.config
    setTurn: actionSetTurn,
    setTrial: actionSetTrial,
    setNumSumoLimit: actionSetNumSumoLimit,
    // inp.friends
    setFriend: actionSetFriend
  }
});

export const { setTurn, changeField } = scsInputSlice.actions;
export default scsInputSlice;
