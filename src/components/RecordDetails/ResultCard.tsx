import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { SCSSummarizedOutput } from "../../scs";
import { WebGscsExtra } from "../../slices/slice.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      backgroundColor: "lightgray"
    }
  })
);

type Props = {
  output: SCSSummarizedOutput;
  extra: WebGscsExtra;
};

export default function ResultCard({ output, extra }: Props) {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Result" className={classes.header} />
      <CardContent>計算結果、投稿者情報関係、シェアボタン等</CardContent>
    </Card>
  );
}
