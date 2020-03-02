import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    }
  })
);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          My Awesome Dashboard Page
        </Grid>
      </Container>
    </>
  );
}
