import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

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

export default function BarChartPaper() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Paper className={classes.papers}>AWESOME BARCHART HERE</Paper>
    </Paper>
  );
}
