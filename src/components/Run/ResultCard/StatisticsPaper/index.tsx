import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { RootState } from "../../../../store";

import { mean, std } from "../../../share/mathFunctions";

import StatisticalCheckChart from "./LineChart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1)
    },
    papers: {
      margin: theme.spacing(1)
    }
  })
);

export default function StatisticalCheckPaper() {
  const classes = useStyles();
  const outputs = useSelector((state: RootState) => state.runScs.outputs);

  const mExp = mean(outputs.map(o => o.exp.perTurn));
  const sExp = std(outputs.map(o => o.exp.perTurn));

  const means = [...Array(outputs.length)].map((v, i) => ({
    x: i,
    y: mean(outputs.slice(0, i + 1).map(o => o.exp.perTurn))
  }));

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">平均経験値統計</Typography>
      <Paper className={classes.papers}>
        <div>
          exp: {mExp.toFixed(1)}±{sExp.toFixed(1)}
        </div>
        <StatisticalCheckChart mean={means} />
      </Paper>
    </Paper>
  );
}
