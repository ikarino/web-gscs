import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import SummaryPaper from "./SummaryPaper";
import BarChartPaper from "./BarChartPaper";
import StatisticsPaper from "./StatisticsPaper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroup: {
      paddingTop: "5px"
    }
  })
);

export default function ResultCard() {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardHeader title="Result" />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <SummaryPaper />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BarChartPaper />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatisticsPaper />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
