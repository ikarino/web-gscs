import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    }
  })
);

export default function Playground() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          My Awesome Playground Page
        </Grid>
      </Container>
    </>
  );
}
