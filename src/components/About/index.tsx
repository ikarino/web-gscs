import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 600,
      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(2)
      marginBottom: theme.spacing(2)
    },
    heading: {
      padding: ".1em 0 .2em .75em",
      borderLeft: "6px solid #ccc",
      borderBottom: "1px solid #ccc"
    },
    heading2: {
      marginLeft: theme.spacing(1),
      padding: ".1em 0 .2em .75em",
      borderLeft: "6px solid #ccc",
      borderBottom: "1px solid #ccc"
    },
    panel: {
      width: "90%",
      margin: "auto",
      padding: theme.spacing(2)
    },
    infoPanel: {
      padding: theme.spacing(2)
    },
    body: {
      fontSize: "10pt",
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1)
    },
    code: {
      backgroundColor: "lightgray",
      fontWeight: "bold",
      marginRight: theme.spacing(1)
    }
  })
);

export default function About() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        <Typography className={classes.heading}>web-gscsとは</Typography>
        <Typography variant="body1" className={classes.body}>
          ウェブブラウザ上でスモコンシミュレーションを行い、結果をシェアできるサービスです。
          <br />
          PS2でスモコンをする時代は終わりました。
        </Typography>
        <Typography className={classes.heading}>使い方</Typography>

        <Typography variant="body1" className={classes.body}>
          大きく分けて3種類の機能があります。
        </Typography>
        <ul>
          <li>
            <span className={classes.code}>Playground</span>スモコンお試し機能
          </li>
          <li>
            <span className={classes.code}>Run</span>スモコン計算・投稿機能
          </li>
          <li>
            <span className={classes.code}>Records</span>投稿閲覧機能
          </li>
        </ul>
        <Typography className={classes.heading2}>Playground</Typography>
        <Typography variant="body1" className={classes.body}>
          大きく分けて3種類の機能があります。
        </Typography>

        <Typography className={classes.heading}>実装内容</Typography>
        <Typography variant="body1" className={classes.body}>
          あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
        </Typography>
        <Typography className={classes.heading}>開発・連絡</Typography>
        <Typography variant="body1" className={classes.body}>
          あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
        </Typography>
      </Paper>
    </Container>
  );
}
