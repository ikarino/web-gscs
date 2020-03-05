import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import { Manager, sampleSCSInputs } from "../../scs";
import { RootState } from "../../store";
import HPFieldCard from "./HPFieldCard";
import InfoCard from "./InfoCard";
import { place2index } from "./helperFunc";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    },
    cardGrid: { height: "100%" },
    backFAB: {
      margin: 0,
      top: "auto",
      right: "20px",
      bottom: "20px",
      left: "auto",
      position: "fixed"
    }
  })
);

let m = new Manager(sampleSCSInputs["4キラーマ倍速"]);

export default function Playground() {
  const classes = useStyles();
  const inp = useSelector((state: RootState) => state.scsInput.inp);
  const [manager, setManager] = useState(
    JSON.parse(JSON.stringify(m)) as Manager
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    m = new Manager(inp);
    m.init();
    setManager(JSON.parse(JSON.stringify(m)) as Manager);
    setActiveIndex(m.field.col * m.enemys[0].place.row + m.enemys[0].place.col);
  }, [inp]);

  const run = () => {
    let nextActiveIndex = -1;
    const fs = m.friends.filter(
      f => place2index(f.place, m.field.col) === activeIndex
    );
    const es = m.enemys.filter(
      f => place2index(f.place, m.field.col) === activeIndex
    );
    if (fs.length === 1) {
      m.actionFriend(fs[0]);
      if (fs[0].order === m.friends.length - 1) {
        m.turnNow += 1;
        nextActiveIndex = place2index(m.enemys[0].place, m.field.col);
      } else {
        nextActiveIndex = place2index(
          m.friends[fs[0].order + 1].place,
          m.field.col
        );
      }
    } else if (es.length === 1) {
      m.actionEnemy(es[0]);
      const currentEnemyIndex = m.enemys.map(e => e.num).indexOf(es[0].num);
      if (currentEnemyIndex === m.enemys.length - 1) {
        nextActiveIndex = place2index(m.friends[0].place, m.field.col);
      } else {
        nextActiveIndex = place2index(
          m.enemys[currentEnemyIndex + 1].place,
          m.field.col
        );
      }
    } else {
      throw new Error("fuck");
    }

    setManager(JSON.parse(JSON.stringify(m)) as Manager);
    setActiveIndex(nextActiveIndex);
  };

  const reset = () => {
    m.init();
    setManager(JSON.parse(JSON.stringify(m)) as Manager);
    setActiveIndex(m.field.col * m.enemys[0].place.row + m.enemys[0].place.col);
  };
  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.cardGrid}>
              <HPFieldCard
                manager={manager}
                activeIndex={activeIndex}
                run={run}
                reset={reset}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.cardGrid}>
              <InfoCard manager={manager} activeIndex={activeIndex} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
