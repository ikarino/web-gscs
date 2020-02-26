import { PayloadAction } from "@reduxjs/toolkit";

import { SCSInput, SCSSummarizedOutput, SCSTrialOutput } from "torneko3js";

import { SliceRunScs } from "../slice.interface";

export const actionProgess = (
  state: SliceRunScs,
  action: PayloadAction<{ progress: number; outputs: SCSTrialOutput[] }>
): SliceRunScs => {
  return {
    ...state,
    progress: action.payload.progress,
    outputs: action.payload.outputs
  };
};

export const actionStart = (
  state: SliceRunScs,
  action: PayloadAction<SCSInput>
): SliceRunScs => {
  return {
    ...state,
    record: {
      ...state.record,
      scsInput: action.payload // here
    },
    progress: 0, // here
    isRunning: true, //here,
    outputs: [] // here
  };
};

export const actionFinish = (
  state: SliceRunScs,
  action: PayloadAction<SCSSummarizedOutput>
): SliceRunScs => {
  return {
    ...state,
    record: {
      ...state.record,
      scsOutput: action.payload
    },
    isRunning: false //here
  };
};
