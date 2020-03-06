import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { SCSSummarizedOutput, SCSInput } from "../../scs";
import MyTip from "./MyTip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.grey.A100
    }
  })
);

type Props = {
  record: {
    scsInput: SCSInput;
    scsOutput: SCSSummarizedOutput;
  };
};

export default function OutputChips({ record }: Props) {
  const classes = useStyles();
  const inp = record.scsInput;
  const out = record.scsOutput;

  // TODO 倍速/等速
  const lossAction =
    out.loss.action.mean.filter(l => l / inp.config.turn > 0.5).length > 0;

  return (
    <Paper className={classes.root}>
      {out.result.finishState.genocided > 0 ? (
        <MyTip title="敵スモ全滅試行あり" label="滅" color="secondary" />
      ) : null}
      {out.result.finishState.killed > 0 ? (
        <MyTip title="仲間死亡試行あり" label="死" color="secondary" />
      ) : null}
      {out.result.finishState.genocided === 0 &&
      out.result.finishState.killed === 0 ? (
        <MyTip title="ターン経過率100%" label="完璧" color="secondary" />
      ) : null}
      {out.exp.total.mean / inp.config.turn > 100 ? (
        <MyTip title="ターン経験値100以上" label="100" color="secondary" />
      ) : null}
      {lossAction ? (
        <MyTip
          title="半分以上手待ちのキャラあり"
          label="個待"
          color="primary"
        />
      ) : null}
    </Paper>
  );
}
