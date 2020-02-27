import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  LinearProgress,
  Button,
  Grid,
  Typography
} from "@material-ui/core";

import { SCSTrialOutput, Manager } from "torneko3js";

import runScsSlice from "../../../../slices/runScsSlice";
import { RootState } from "../../../../store";
import { useSampleWorker } from "../../../../workers/useSampleWorker";
import InputChips from "../../../share/InputChips";
import { mean } from "../../../share/mathFunctions";

import FinishStatePie from "./FinishStatePie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: "lightgray"
    },
    button: {
      width: "100%"
    },
    root: {
      padding: theme.spacing(1)
    },
    papers: {
      margin: theme.spacing(1)
    },
    exp: {
      marginTop: theme.spacing(4)
    },
    pos: {
      marginBottom: 12
    }
  })
);

export default function SummaryPaper() {
  // const config = useSelector((state: RootState) => state.scsInput.inp.config);
  const classes = useStyles();
  const isRunning = useSelector((state: RootState) => state.runScs.isRunning);
  const inp = useSelector((state: RootState) => state.scsInput.present.inp);
  const progress = useSelector((state: RootState) => state.runScs.progress);
  const outputs = useSelector((state: RootState) => state.runScs.outputs);
  const dispatch = useDispatch();

  // web worker hook
  const sampleWorker = useSampleWorker();

  const handleStart = async () => {
    dispatch(runScsSlice.actions.start(inp));
    let outputs: SCSTrialOutput[] = [];
    for (let t = 0; t < 10; t++) {
      const result = await sampleWorker.runScs10(inp);
      outputs = outputs.concat(result);
      dispatch(
        runScsSlice.actions.progress({
          progress: (t + 1) * 10,
          outputs: outputs
        })
      );
    }
    const m = new Manager(inp);
    m.trialOutputs = outputs;
    dispatch(runScsSlice.actions.finish(m.summarizeOutputs()));
  };

  const successCount = outputs.filter(o => o.result.finishState === "success")
    .length;
  const killedCount = outputs.filter(o => o.result.finishState === "killed")
    .length;
  const genocidedCount = outputs.filter(
    o => o.result.finishState === "genocided"
  ).length;

  const mExp = mean(outputs.map(o => o.exp.perTurn));
  const mTurn =
    (mean(outputs.map(o => o.result.turnPassed)) / inp.config.turn) * 100;
  return (
    <Paper className={classes.root}>
      <Paper className={classes.papers}>
        <Box display="flex" justifyContent="center" bgcolor="background.paper">
          <Button
            onClick={handleStart}
            disabled={isRunning}
            variant="outlined"
            color="secondary"
            className={classes.button}
          >
            {isRunning ? "計算中" : "計算開始"}
          </Button>
        </Box>
        <LinearProgress
          value={progress}
          variant="determinate"
          color="secondary"
        />
      </Paper>

      <InputChips inp={inp} />

      <Paper className={classes.papers}>
        <Grid container>
          <Grid item xs={8}>
            <FinishStatePie
              success={successCount}
              killed={killedCount}
              genocided={genocidedCount}
            />
          </Grid>
          <Grid item xs={4}>
            <div className={classes.exp}>
              <Typography variant="h5">{mExp.toFixed(1)}</Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
                variant="caption"
              >
                ターン経験値
              </Typography>
            </div>
            <div>
              <Typography variant="h5">{mTurn.toFixed(1)}%</Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
                variant="caption"
              >
                ターン経過率
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
}
