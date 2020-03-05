import { PayloadAction } from "@reduxjs/toolkit";

import { SliceSCSInput } from "../slice.interface";
import { OverWriter } from "../../scs";

export const actionSetTurn = (
  state: SliceSCSInput,
  action: PayloadAction<number>
): SliceSCSInput => {
  return {
    ...state,
    inp: {
      ...state.inp,
      config: {
        ...state.inp.config,
        turn: action.payload
      }
    }
  };
};

export const actionSetTrial = (
  state: SliceSCSInput,
  action: PayloadAction<number>
): SliceSCSInput => {
  return {
    ...state,
    inp: {
      ...state.inp,
      config: {
        ...state.inp.config,
        trial: action.payload
      }
    }
  };
};

export const actionSetNumSumoLimit = (
  state: SliceSCSInput,
  action: PayloadAction<number>
): SliceSCSInput => {
  return {
    ...state,
    inp: {
      ...state.inp,
      config: {
        ...state.inp.config,
        numSumoLimit: action.payload
      }
    }
  };
};
export const actionSetPConf = (
  state: SliceSCSInput,
  action: PayloadAction<OverWriter>
): SliceSCSInput => {
  return {
    ...state,
    inp: {
      ...state.inp,
      config: {
        ...state.inp.config,
        pConf: action.payload
      }
    }
  };
};
