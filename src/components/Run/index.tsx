import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import FieldCard from "./FieldCard";
import FriendCard from "./FriendCard";
import ConfigCard from "./ConfigCard";
import ResultCard from "./ResultCard";

// スタイルを定義
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    },
    cardGrid: { height: "100%" }
  })
);

function Run() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.cardGrid}>
              <FieldCard />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.cardGrid}>
              <FriendCard />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.cardGrid}>
              <ConfigCard />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.cardGrid}>
              <ResultCard />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Run;
