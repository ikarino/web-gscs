import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";

import { Manager } from "../../scs";
import { place2index } from "./helperFunc";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      backgroundColor: "lightgray"
    },
    table: {
      marginBottom: theme.spacing(1)
    }
  })
);

type Props = {
  manager: Manager;
  activeIndex: number;
  turn: "敵ターン" | "仲間等速ターン" | "仲間倍速ターン";
};

export default function InfoCard({ manager, activeIndex, turn }: Props) {
  const classes = useStyles();
  const fs = manager.friends.filter(
    f => place2index(f.place, manager.field.col) === activeIndex
  );
  const es = manager.enemys.filter(
    f => place2index(f.place, manager.field.col) === activeIndex
  );
  const u = fs.length === 1 ? fs[0] : es[0];

  const activeUnitInfo =
    u === undefined ? null : (
      <TableBody>
        <TableRow>
          <TableCell align="left">種族</TableCell>
          <TableCell align="right">{u.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Lv</TableCell>
          <TableCell align="right">{u.lv}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">HP</TableCell>
          <TableCell align="right">{u.chp}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">攻撃力</TableCell>
          <TableCell align="right">{u.atk}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">防御力</TableCell>
          <TableCell align="right">{u.def}</TableCell>
        </TableRow>
      </TableBody>
    );

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Info" className={classes.header} />

      <CardContent>
        <TableContainer component={Paper} className={classes.table}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <b>{turn}</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">経過ターン数</TableCell>
                <TableCell align="right">{manager.turnNow}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">撃破数</TableCell>
                <TableCell align="right">
                  {manager.killCount - manager.enemys.length}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <b>行動中のキャラ情報</b>
                </TableCell>
              </TableRow>
            </TableHead>
            {activeUnitInfo}
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
