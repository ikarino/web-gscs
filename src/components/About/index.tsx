import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 600,
      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(2)
      marginBottom: theme.spacing(2)
    },
    heading: {
      marginTop: theme.spacing(2)
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
    }
  })
);

export default function About() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        Awesome About Page !
      </Paper>
    </Container>
  );
}
