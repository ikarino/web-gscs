import React from "react";

import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import { WebGscsRecord } from "../../slices/slice.interface";
import { RootState } from "../../store";
import RecordCard from "../share/RecordCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    },
    cardGrid: {
      height: "100%"
    }
  })
);

export default function Records() {
  const classes = useStyles();
  useFirestoreConnect("records2");
  const records: { [key: string]: WebGscsRecord } = useSelector(
    (state: RootState) => state.firestore.data.records2
  );

  const rendered =
    records &&
    Object.keys(records).map((key: string) => {
      const record = records[key];
      return (
        <Grid item xs={12} sm={4} key={key}>
          <Paper className={classes.cardGrid}>
            <RecordCard
              time={record.webGscsExtra.createdAt.toString()}
              record={record}
            />
          </Paper>
        </Grid>
      );
    });

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={3}>
        {rendered}
      </Grid>
    </Container>
  );
}
