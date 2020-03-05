import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

import { SCSInput, SCSFieldInput } from "../../scs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.info.light
    },
    tip: {
      margin: "1px"
    }
  })
);

const creatableWithExplosion = (field: SCSFieldInput) => {
  let answer: number[] = [];
  let test: number[] = [];
  for (let irow = 0; irow < field.row; irow++) {
    for (let icol = 0; icol < field.col; icol++) {
      const idata = irow * field.col + icol;
      if (field.data[idata] === 1) {
        continue;
      }

      answer.push(idata);
      let flag = false;
      for (let dcol of [-1, 0, 1]) {
        for (let drow of [-1, 0, 1]) {
          if (field.data[(irow + drow) * field.col + (icol + dcol)] === 1) {
            flag = true;
          }
        }
      }

      if (flag) {
        continue;
      }

      for (let dcol of [-1, 0, 1]) {
        for (let drow of [-1, 0, 1]) {
          test.push((irow + drow) * field.col + (icol + dcol));
        }
      }
    }
  }
  for (const a of answer) {
    if (!test.includes(a)) return false;
  }
  return true;
};

type MyTipProps = {
  title: string;
  label: string;
};

function MyTip({ title, label }: MyTipProps) {
  const classes = useStyles();
  return (
    <Tooltip
      enterDelay={500}
      leaveDelay={200}
      title={title}
      arrow
      placement="top"
      className={classes.tip}
    >
      <Chip size="small" label={label} />
    </Tooltip>
  );
}

type Props = {
  inp: SCSInput;
};
export default function InputChips({ inp }: Props) {
  const classes = useStyles();

  const friends = inp.friends;

  const numHs = friends.filter(f => f.name === "ホイミスライム").length;
  const numKm = friends.filter(f => f.name === "キラーマシン").length;
  const lvKiton =
    Math.min(...friends.filter(f => f.name === "きとうし").map(f => f.lv)) ===
    Infinity
      ? 0
      : Math.min(...friends.filter(f => f.name === "きとうし").map(f => f.lv));
  const lvKinoko =
    Math.min(
      ...friends.filter(f => f.name === "おばけキノコ").map(f => f.lv)
    ) === Infinity
      ? 0
      : Math.min(
          ...friends.filter(f => f.name === "おばけキノコ").map(f => f.lv)
        );

  return (
    <Paper className={classes.root}>
      {creatableWithExplosion(inp.field) ? (
        <MyTip title="爆発の指輪で作成可能" label="爆" />
      ) : null}
      {friends.filter(f => f.doubleSpeed).length === friends.length ? (
        <MyTip title="全員倍速" label="倍速" />
      ) : null}
      {friends.filter(f =>
        f.doubleSpeed === undefined ? true : !f.doubleSpeed
      ).length === inp.friends.length ? (
        <MyTip title="全員等速" label="等速" />
      ) : null}
      {numHs > 0 ? (
        <MyTip title={"ホイミスライムの数"} label={`ホ${numHs}`} />
      ) : null}
      {numKm > 0 ? (
        <MyTip title={"キラーマシンの数"} label={`機${numKm}`} />
      ) : null}
      {lvKinoko > 0 ? <MyTip title={"おばけキノコ有り"} label={`茸`} /> : null}
      {lvKinoko > 0 && lvKinoko < 5 ? (
        <MyTip title={"おばけキノコ育成"} label={`茸育`} />
      ) : null}
      {lvKiton > 0 ? <MyTip title={"きとうし有り"} label={`祈`} /> : null}
      {lvKiton > 0 && lvKiton < 5 ? (
        <MyTip title={"きとうし育成"} label={`祈育`} />
      ) : null}
    </Paper>
  );
}
