import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 600,
      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(2)
      marginBottom: theme.spacing(2)
    },
    panel: {
      width: "90%",
      margin: "auto",
      padding: theme.spacing(2)
    }
  })
);

export default function NoMatch() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        <Typography variant="h6">Invalid URL</Typography>
      </Paper>
    </Container>
  );
}