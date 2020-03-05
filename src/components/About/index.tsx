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
      color: "#505050" /*文字色*/,
      padding: "0.5em" /*文字周りの余白*/,
      display: "inline-block" /*おまじない*/,
      lineHeight: "1.3" /*行高*/,
      background: "#dbebf8" /*背景色*/,
      verticalAlign: "middle",
      borderRadius: "25px 0px 0px 25px" /*左側の角を丸く*/,
      "&:before": {
        content: '"●"',
        color: "white",
        marginRight: "8px"
      }
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
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
      marginLeft: "10px",
      marginBottom: "10px"
    }
  })
);

export default function About() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        <Typography variant="h6" className={classes.heading}>
          web-gscsとは
        </Typography>
        <Typography variant="body1" className={classes.body}>
          ブラウザ上でスモコンシミュレーションを行い、結果をシェアできるサービスです。
        </Typography>
        <Typography variant="h6" className={classes.heading}>
          用語の説明
        </Typography>
        <Typography variant="body1" className={classes.body}>
          あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
        </Typography>
        <Typography variant="h6" className={classes.heading}>
          実装内容
        </Typography>
        <Typography variant="body1" className={classes.body}>
          あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
        </Typography>
        <Typography variant="h6" className={classes.heading}>
          開発・連絡
        </Typography>
        <Typography variant="body1" className={classes.body}>
          あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
        </Typography>
      </Paper>
    </Container>
  );
}
