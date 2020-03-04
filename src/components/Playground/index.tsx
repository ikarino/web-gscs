import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import ControllerCard from "./ControllerCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    },
    cardGrid: { height: "100%" },
    backFAB: {
      margin: 0,
      top: "auto",
      right: "20px",
      bottom: "20px",
      left: "auto",
      position: "fixed"
    }
  })
);

export default function Playground() {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.cardGrid}>
              <ControllerCard />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
