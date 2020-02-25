import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  LinearProgress,
  Button
} from "@material-ui/core";

import { SCSTrialOutput, Manager } from "torneko3js";

import scsInputSlice from "../../slices/scsInputSlice";
import runScsSlice from "../../slices/runScsSlice";
import { RootState } from "../../store";
import { useSampleWorker } from "../../workers/useSampleWorker";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: "lightgray"
    },
    buttonGroup: {
      paddingTop: "5px"
    }
  })
);

export default function ResultCard() {
  // const config = useSelector((state: RootState) => state.scsInput.inp.config);
  const classes = useStyles();
  const isRunning = useSelector((state: RootState) => state.runScs.isRunning);
  const inp = useSelector((state: RootState) => state.scsInput.inp);

  const progress = useSelector((state: RootState) => state.runScs.progress);
  const dispatch = useDispatch();

  // web worker hook
  const sampleWorker = useSampleWorker();

  const handleStart = async () => {
    dispatch(runScsSlice.actions.start(inp));
    let outputs: SCSTrialOutput[] = [];
    for (let t = 0; t < 10; t++) {
      const result = await sampleWorker.runScs10(inp);
      outputs = outputs.concat(result);
      dispatch(runScsSlice.actions.progress((t + 1) * 10));
    }
    const m = new Manager(inp);
    m.trialOutputs = outputs;
    dispatch(runScsSlice.actions.finish(m.summarizeOutputs()));
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Result" className={classes.header} />
      <CardContent>
        AWESOME RESULT
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          bgcolor="background.paper"
        >
          <Button
            onClick={handleStart}
            disabled={isRunning}
            variant="outlined"
            color="secondary"
          >
            {isRunning ? "計算中" : "計算開始"}
          </Button>
        </Box>
        <LinearProgress variant="determinate" value={progress} />
      </CardContent>
    </Card>
  );
}
