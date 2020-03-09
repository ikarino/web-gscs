import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { useFirestore } from "react-redux-firebase";

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

function RecordLogs() {
  const firestore = useFirestore();
  // firestore.collection("recordLogs").orderBy("createdAt", "desc").limits(5)
}

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        My Awesome Dashboard Page
      </Paper>
    </Container>
  );
}
