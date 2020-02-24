import { createSlice } from "@reduxjs/toolkit";

import { AppThunk } from "../store";

import {
  initialState,
  actionProgess,
  actionStart,
  actionFinish
} from "./actionRunScs";
import { Manager, SCSInput } from "torneko3js";

const runScsSlice = createSlice({
  name: "runScs",
  initialState: initialState,
  reducers: {
    progress: actionProgess,
    start: actionStart,
    finish: actionFinish
  }
});

export const runScsAsync = (inp: SCSInput): AppThunk => {
  console.log("starting ...");
  const m = new Manager(inp);

  const run = (trials: number) =>
    new Promise(reslove => {
      console.log("fuck");
      setTimeout(() => {
        for (let trial = 0; trial < trials; trial++) {
          m.trial();
        }
        reslove(0);
      }, 0);
    });

  return async dispatch => {
    console.log("running async function");
    dispatch(runScsSlice.actions.progress(0));
    dispatch(runScsSlice.actions.start(inp));
    for (let i = 0; i < 10; i++) {
      await run(inp.config.trial / 10);
      dispatch(runScsSlice.actions.progress((i + 1) * 10));
    }
    dispatch(runScsSlice.actions.finish(m.summarizeOutputs()));
  };
};

export default runScsSlice;
