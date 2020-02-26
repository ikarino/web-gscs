import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";

import SummaryPaper from "./SummaryPaper";
import BarChartPaper from "./BarChartPaper";
import StatisticsPaper from "./StatisticsPaper";

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
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardHeader title="Result" className={classes.header} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <SummaryPaper />
          </Grid>
          <Grid item xs={12} md={4}>
            <BarChartPaper />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatisticsPaper />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
