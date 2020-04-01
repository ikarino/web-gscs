import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import SummaryPaper from "./SummaryPaper";
import BarChartPaper from "./BarChartPaper";
import StatisticsPaper from "./StatisticsPaper";

export default function ResultCard() {
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
