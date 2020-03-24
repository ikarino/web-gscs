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

type Turn = "敵ターン" | "仲間等速ターン" | "仲間倍速ターン";

export default function Playground() {
  const classes = useStyles();
  const inp = useSelector((state: RootState) => state.scsInput.inp);
  const [manager, setManager] = useState(
    JSON.parse(JSON.stringify(m)) as Manager
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const [turn, setTurn] = useState<Turn>("敵ターン");
  const [numEnemy, setNumEnemy] = useState(0);

  useEffect(() => {
    m = new Manager(inp);
    m.init();
    setManager(JSON.parse(JSON.stringify(m)) as Manager);
    if (m.enemys.length !== 0) {
      setActiveIndex(
        m.field.col * m.enemys[0].place.row + m.enemys[0].place.col
      );
      setNumEnemy(m.enemys.length);
    }
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
      // console.assert(turn === "仲間倍速ターン" || turn === "仲間等速ターン");
      const f = fs[0];
      const isLast = f.order === m.friends.length - 1;

      m.actionFriend(f);
      f.naturalRecovery();
      if (turn === "仲間等速ターン") {
        if (isLast) {
          setTurn("仲間倍速ターン");
          let flag = true;
          for (let i = 0; i < m.friends.length; i++) {
            if (m.friends[i].doubleSpeed) {
              nextActiveIndex = place2index(m.friends[i].place, m.field.col);
              flag = false;
              break;
            }
          }
          if (flag) {
            setTurn("敵ターン");
            setNumEnemy(m.enemys.length);
            nextActiveIndex = place2index(m.enemys[0].place, m.field.col);
            m.turnNow += 1;
          }
        } else {
          nextActiveIndex = place2index(
            m.friends[f.order + 1].place,
            m.field.col
          );
        }
      } else if (turn === "仲間倍速ターン") {
        if (isLast) {
          setTurn("敵ターン");
          setNumEnemy(m.enemys.length);
          m.turnNow += 1;
          if (m.enemys.length === 0) {
            setManager(JSON.parse(JSON.stringify(m)) as Manager);
            return;
          }
          nextActiveIndex = place2index(m.enemys[0].place, m.field.col);
        } else {
          let flag = true;
          for (let i = f.order + 1; i < m.friends.length; i++) {
            if (m.friends[i].doubleSpeed) {
              nextActiveIndex = place2index(m.friends[i].place, m.field.col);
              flag = false;
              break;
            }
          }
          if (flag) {
            setTurn("敵ターン");
            setNumEnemy(m.enemys.length);
            m.turnNow += 1;
            if (m.enemys.length === 0) {
              setManager(JSON.parse(JSON.stringify(m)) as Manager);
              return;
            }
            nextActiveIndex = place2index(m.enemys[0].place, m.field.col);
          }
        }
      }
    } else if (es.length === 1) {
      // console.assert(turn === "敵ターン");
      const e = es[0];
      const currentEnemyIndex = m.enemys.map(enemy => enemy.num).indexOf(e.num);
      const isLast = currentEnemyIndex === numEnemy - 1;
      m.actionEnemy(e);
      if (isLast) {
        // ラストだったらFriendの行動順0番目へ
        nextActiveIndex = place2index(m.friends[0].place, m.field.col);
        setTurn("仲間等速ターン");
      } else {
        // それ以外だったら次のEnemyへ
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
    setTurn("敵ターン");
    setNumEnemy(m.enemys.length);
  };
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.cardGrid}>
            <HPFieldCard
              manager={manager}
              activeIndex={activeIndex}
              run={run}
              reset={reset}
              disabled={
                m.enemys.length === 0 ||
                m.friends.filter(f => f.chp <= 0).length > 0
              }
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.cardGrid}>
            <InfoCard manager={manager} activeIndex={activeIndex} turn={turn} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
