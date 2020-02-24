import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import FieldCard from "./FieldCard";
import FriendCard from "./FriendCard";
import ConfigCard from "./ConfigCard";
import ResultCard from "./ResultCard";

// スタイルを定義
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      flexGrow: 1
    },
    title: {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    container: {
      paddingTop: theme.spacing(2)
    }
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
            <FieldCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <FriendCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <ConfigCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <ResultCard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Run;
