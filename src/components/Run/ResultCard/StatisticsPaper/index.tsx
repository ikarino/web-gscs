import React, { useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { RootState } from "../../../../store";

import { mean, sum } from "../../../share/mathFunctions";
import StatisticalCheckChart from "./LineChart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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

export default function StatisticalCheckPaper() {
  const classes = useStyles();
  const outputs = useSelector((state: RootState) => state.runScs.outputs);
  const [selected, setSelected] = useState(0);

  const exps = [...Array(outputs.length)].map((v, i) => ({
    x: i,
    y: mean(outputs.slice(0, i + 1).map(o => o.exp.perTurn))
  }));
  const lossAction = [...Array(outputs.length)].map((v, i) => ({
    x: i,
    y: mean(outputs.slice(0, i + 1).map(o => sum(o.loss.action)))
  }));
  const lossDivison = [...Array(outputs.length)].map((v, i) => ({
    x: i,
    y: mean(outputs.slice(0, i + 1).map(o => sum(o.loss.division)))
  }));
  const killCount = [...Array(outputs.length)].map((v, i) => ({
    x: i,
    y: mean(
      outputs.slice(0, i + 1).map(o => sum(o.result.orderOfKilledFriends))
    )
  }));

  const label = ["経験値", "行動ロス", "分裂ロス", "死亡回数"][selected];

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">全体データ</Typography>
      <Box hidden={selected !== 0}>
        <StatisticalCheckChart mean={exps} />
      </Box>
      <Box hidden={selected !== 1}>
        <StatisticalCheckChart mean={lossAction} />
      </Box>

      <Box hidden={selected !== 2}>
        <StatisticalCheckChart mean={lossDivison} />
      </Box>
      <Box hidden={selected !== 3}>
        <StatisticalCheckChart mean={killCount} />
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
