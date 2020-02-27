import React from "react";

import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel } from "victory";

import { Manager, SCSSummarizedOutput } from "torneko3js";

import { RootState } from "../../../../store";

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
  const inp = useSelector((state: RootState) => state.scsInput.present.inp);
  const outputs = useSelector((state: RootState) => state.runScs.outputs);

  let summarizedOutputs: SCSSummarizedOutput = {
    result: {
      finishState: {
        success: 0,
        killed: 0,
        genocided: 0
      },
      turnPassed: {
        mean: 0,
        std: 0
      },
      countOfKilledFriends: Array(inp.friends.length).fill(0)
    },
    exp: {
      total: {
        mean: 0,
        std: 0
      },
      perMonster: {
        mean: Array(inp.friends.length).fill(0),
        std: Array(inp.friends.length).fill(0)
      }
    },
    loss: {
      action: {
        mean: Array(inp.friends.length).fill(0),
        std: Array(inp.friends.length).fill(0)
      },
      division: {
        mean: Array(inp.friends.length).fill(0),
        std: Array(inp.friends.length).fill(0)
      }
    }
  };
  if (outputs.length) {
    const m = new Manager(inp);
    m.trialOutputs = outputs;
    summarizedOutputs = m.summarizeOutputs();
  }
  const exps = summarizedOutputs.exp.perMonster.mean.map((exp, i) => ({
    x: i,
    y: exp / inp.config.turn
  }));

  return (
    <Paper className={classes.root}>
      <MyChart data={exps} />
    </Paper>
  );
}

const MyChart = ({ data }: { data: { x: number; y: number }[] }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    domainPadding={10}
    minDomain={{ x: -0.5 }}
    maxDomain={{ x: 9.5 }}
  >
    <VictoryBar
      theme={VictoryTheme.material}
      barRatio={0.8}
      labels={({ datum }) => datum.x}
      style={{ labels: { fill: "white" } }}
      data={data}
    />
  </VictoryChart>
);
