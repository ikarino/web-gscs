import React from "react";
import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { RootState } from "../../../../store";

import { mean } from "../../../share/mathFunctions";
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

  const means = [...Array(outputs.length)].map((v, i) => ({
    x: i,
    y: mean(outputs.slice(0, i + 1).map(o => o.exp.perTurn))
  }));

  return (
    <Paper className={classes.root}>
      <Paper className={classes.papers}>
        <StatisticalCheckChart mean={means} />
      </Paper>
    </Paper>
  );
}
