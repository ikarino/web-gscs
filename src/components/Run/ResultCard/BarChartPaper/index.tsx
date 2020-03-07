import React, { useState } from "react";

import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { VictoryBar, VictoryChart, VictoryTheme } from "victory";

import { summarizeSCSOutputs } from "../../../../scs";

import { RootState } from "../../../../store";
import PaperHeader from "../PaperHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      padding: theme.spacing(1)
    },
    papers: {
      margin: theme.spacing(1)
    },
    label: {
      marginLeft: theme.spacing(1),
      textDecoration: "underline"
    }
  })
);

export default function BarChartPaper() {
  const classes = useStyles();
  const inp = useSelector((state: RootState) => state.scsInput.inp);
  const outputs = useSelector((state: RootState) => state.runScs.outputs);

  const [selected, setSelected] = useState(0);
  const initialData = [...Array(inp.friends.length)].map((_, i) => ({
    x: i.toString(),
    y: 0
  }));
  const exps =
    outputs.length > 0
      ? summarizeSCSOutputs(outputs).exp.perMonster.mean.map((exp, i) => ({
          x: i.toString(),
          y: exp
        }))
      : initialData;
  const actionLoss =
    outputs.length > 0
      ? summarizeSCSOutputs(outputs).loss.action.mean.map((loss, i) => ({
          x: i.toString(),
          y: loss
        }))
      : initialData;
  const divisionLoss =
    outputs.length > 0
      ? summarizeSCSOutputs(outputs).loss.division.mean.map((loss, i) => ({
          x: i.toString(),
          y: loss
        }))
      : initialData;
  const killCount =
    outputs.length > 0
      ? summarizeSCSOutputs(outputs).result.countOfKilledFriends.map(
          (loss, i) => ({
            x: i.toString(),
            y: loss
          })
        )
      : initialData;

  const label = ["経験値", "行動ロス", "分裂ロス", "死亡回数"][selected];

  return (
    <Paper className={classes.root}>
      <PaperHeader title="仲間別データ" />
      <Box hidden={selected !== 0}>
        <MyChart data={exps} />
      </Box>
      <Box hidden={selected !== 1}>
        <MyChart data={actionLoss} />
      </Box>
      <Box hidden={selected !== 2}>
        <MyChart data={divisionLoss} />
      </Box>
      <Box hidden={selected !== 3}>
        <MyChart data={killCount} />
      </Box>

      <Container>
        <ButtonGroup
          size="small"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button disabled={selected === 0} onClick={() => setSelected(0)}>
            E
          </Button>
          <Button disabled={selected === 1} onClick={() => setSelected(1)}>
            A
          </Button>
          <Button disabled={selected === 2} onClick={() => setSelected(2)}>
            D
          </Button>
          <Button disabled={selected === 3} onClick={() => setSelected(3)}>
            K
          </Button>
        </ButtonGroup>

        <Typography
          variant="overline"
          color="primary"
          className={classes.label}
        >
          {label}
        </Typography>
      </Container>
    </Paper>
  );
}

const MyChart = ({ data }: { data: { x: string; y: number }[] }) => (
  <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
    <VictoryBar
      theme={VictoryTheme.material}
      barRatio={0.8}
      labels={({ datum }) => datum.x}
      style={{ labels: { fill: "white" } }}
      data={data}
    />
  </VictoryChart>
);
