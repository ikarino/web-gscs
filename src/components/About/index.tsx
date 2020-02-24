import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Typography,
  Link,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 600,
      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(2)
      marginBottom: theme.spacing(2)
    },
    heading: {},
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
    }
  })
);

export default function About() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <Paper elevation={1} className={classes.panel}>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            用語の説明
          </Typography>
          <Paper elevation={1} className={classes.infoPanel}>
            <Typography variant="h6">ターン経験値</Typography>
            <Typography variant="h6"></Typography>
            <Typography variant="caption">
              1ターンあたりに得られた経験値です。仲間が死亡したり、敵スモグルが消滅してシミュレーションが止まっているターンは無視されています。
            </Typography>
            <Typography variant="h6">ターン経過率</Typography>
            <Typography variant="caption">
              仲間が死亡したり、敵スモグルが消滅せずに経過したターンです。100%が望ましい状態です。
            </Typography>
            <Typography variant="h6">仲間死亡率</Typography>
            <Typography variant="caption">
              試行のうち、仲間が死亡してシミュレーションが終了した試行数です。0%が望ましい状態です。
            </Typography>
            <Typography variant="h6">敵スモ消滅率</Typography>
            <Typography variant="caption">
              敵スモグルが消滅してシミュレーション終了した試行数です。0%が望ましい状態です。
            </Typography>
            <Typography variant="h6">待機率</Typography>
            <Typography variant="caption">
              行動できなかったターン数です（倍速はカウント）。0%が望ましい状態です。
            </Typography>
            <Typography variant="h6">分裂ロス</Typography>
            <Typography variant="caption">
              スモールグールに攻撃した際に分裂するスペースが無かった回数です。0が望ましい状態です。
            </Typography>
          </Paper>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            実装内容
          </Typography>
          <Paper elevation={1} className={classes.infoPanel}>
            実装内容
          </Paper>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            開発・連絡
          </Typography>
          <Paper elevation={1} className={classes.infoPanel}>
            <Typography variant="caption">
              バグ報告、コメント等は以下までお願いいたします。
            </Typography>
            <List>
              <ListItem
                button
                component={Link}
                href="mailto:ggrks218@gmail.com?subject=web-gscsについて"
              >
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="E-mail" />
              </ListItem>
              <ListItem
                button
                component={Link}
                href="https://twitter.com/ikarino99"
              >
                <ListItemIcon>
                  <TwitterIcon />
                </ListItemIcon>
                <ListItemText primary="Twitter" />
              </ListItem>
            </List>
          </Paper>
        </Paper>
      </Container>
    </>
  );
}
