import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

import { SCSTrialOutput, summarizeSCSOutputs } from "../../../../scs";

import runScsSlice from "../../../../slices/runScsSlice";
import { RootState } from "../../../../store";
import { useSampleWorker } from "../../../../workers/useSampleWorker";
import InputChips from "../../../share/InputChips";
import OutputChips from "../../../share/OutputChips";
import { mean } from "../../../share/mathFunctions";
import { saveRecordToLocalStorage } from "../../../../localStorageApi";

// TODO
// FinishStatePieを捨ててFinishStatePaperに統合したいが、
// state.runScs.recordがリアルタイムに更新されていない
// import FinishStatePaper from "../../../share/FinishStatePaper";
import FinishStatePie from "../../../share/FinishStatePaper/FinishStatePie";
import PaperHeader from "../PaperHeader";
import ConfirmDialog from "./ConfirmDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    calcButton: {
      width: "100%"
    },
    root: {
      height: "100%",
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
    },
    postButton: {
      padding: theme.spacing(1)
    }
  })
);

export default function SummaryPaper() {
  // const config = useSelector((state: RootState) => state.scsInput.inp.config);
  const classes = useStyles();
  const isRunning = useSelector((state: RootState) => state.runScs.isRunning);
  const inp = useSelector((state: RootState) => state.scsInput.inp);
  const progress = useSelector((state: RootState) => state.runScs.progress);
  const outputs = useSelector((state: RootState) => state.runScs.outputs);
  const record = useSelector((state: RootState) => state.runScs.record);
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [snackBar, setSnackBar] = useState({ open: false, message: "" });
  const [open, setOpen] = useState(false);

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
    dispatch(runScsSlice.actions.finish(summarizeSCSOutputs(outputs)));
  };

  const save2LocalStorage = () => {
    const result = saveRecordToLocalStorage(record);
    if (result) {
      history.push("/local");
    } else {
      setSnackBar({
        open: true,
        message: `保存に失敗しました`
      });
    }
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
      <PaperHeader title="Controller" />
      <Paper className={classes.papers}>
        <Box display="flex" justifyContent="center" bgcolor="background.paper">
          <Button
            onClick={handleStart}
            disabled={isRunning}
            variant="outlined"
            color="secondary"
            className={classes.calcButton}
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

      <Paper className={classes.papers}>
        <Grid container>
          <Grid item xs={7}>
            <FinishStatePie
              success={successCount}
              killed={killedCount}
              genocided={genocidedCount}
            />
          </Grid>
          <Grid item xs={5}>
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

      <InputChips inp={inp} />

      {outputs.length > 0 && !isRunning && <OutputChips record={record} />}

      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          className={classes.postButton}
          disabled={
            isLoaded(auth) &&
            !isEmpty(auth) &&
            (outputs.length === 0 || isRunning)
          }
          onClick={() => setOpen(true)}
        >
          投稿
        </Button>
        　
        <Button
          variant="outlined"
          color="secondary"
          className={classes.postButton}
          disabled={outputs.length === 0 || isRunning}
          onClick={save2LocalStorage}
        >
          保存
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={() => setSnackBar({ open: false, message: "" })}
        message={snackBar.message}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackBar({ open: false, message: "" })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      <ConfirmDialog open={open} setOpen={setOpen} />
    </Paper>
  );
}
