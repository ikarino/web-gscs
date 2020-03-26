import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { SCSInput, SCSSummarizedOutput } from "../../../scs";

import FinishStatePie from "./FinishStatePie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: "lightgray"
    },
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
      marginTop: theme.spacing(2)
    },
    pos: {
      marginBottom: 12
    },
    postButton: {
      padding: theme.spacing(1)
    }
  })
);

type Props = {
  record: {
    scsInput: SCSInput;
    scsOutput: SCSSummarizedOutput;
  };
};

export default function FinishStatePaper({ record }: Props) {
  const classes = useStyles();

  const successCount = record.scsOutput.result.finishState.success;
  const killedCount = record.scsOutput.result.finishState.killed;
  const genocidedCount = record.scsOutput.result.finishState.genocided;
  const mExp = record.scsOutput.exp.total.mean / record.scsInput.config.turn;
  const mTurn =
    (record.scsOutput.result.turnPassed.mean / record.scsInput.config.turn) *
    100;
  return (
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
  );
}
