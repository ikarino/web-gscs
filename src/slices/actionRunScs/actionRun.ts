import { PayloadAction } from "@reduxjs/toolkit";

import "firebase/firestore";

import { SCSInput, SCSSummarizedOutput, SCSTrialOutput } from "../../scs";

import { SliceRunScs, WebGscsExtra } from "../slice.interface";

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
      scsInput: {
        // here
        ...action.payload,
        config: {
          ...action.payload.config,
          pConf: undefined
        }
      }
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
    isRunning: false
  };
};

export const actionSetWebGscsExtra = (
  state: SliceRunScs,
  action: PayloadAction<WebGscsExtra>
): SliceRunScs => {
  return {
    ...state,
    record: {
      ...state.record,
      webGscsExtra: action.payload
    }
  };
};
