import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";

import { WebGscsRecord } from "../../slices/slice.interface";
import { sum } from "../share/mathFunctions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    }
  })
);

type Props = {
  record: WebGscsRecord;
};

export default function ResultCard({ record }: Props) {
  const classes = useStyles();
  const inp = record.scsInput;
  const out = record.scsOutput;
  const extra = record.webGscsExtra;

  const waiting =
    (sum(out.loss.action.mean) /
      sum(
        inp.friends.map(f =>
          f.doubleSpeed ? inp.config.turn * 2 : inp.config.turn
        )
      )) *
    100;

  // 計算結果、投稿者情報関係、シェアボタン等
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Result" />
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  {extra.userName}さんの投稿
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <b>Config</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">ターン数</TableCell>
                <TableCell align="right">{inp.config.turn}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">試行回数</TableCell>
                <TableCell align="right">{inp.config.trial}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">発生数制限</TableCell>
                <TableCell align="right">{inp.config.numSumoLimit}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <b>計算結果</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">ターン経験値</TableCell>
                <TableCell align="right">
                  {(out.exp.total.mean / inp.config.turn).toFixed(1)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">ターン経過率</TableCell>
                <TableCell align="right">
                  {(
                    (out.result.finishState.success / inp.config.trial) *
                    100
                  ).toFixed(1)}
                  %
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">待機率</TableCell>
                <TableCell align="right">{waiting.toFixed(1)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
