import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { RouteComponentProps } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

import FriendCard from "./FriendCard";
import FieldCard from "./FieldCard";
import { WebGscsRecord } from "../../slices/slice.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    },
    panel: {
      width: "90%",
      margin: "auto",
      padding: theme.spacing(2)
    },
    cardGrid: { height: "100%" }
  })
);

type Props = RouteComponentProps<{ id: string }>;

export default function RecordDetails(props: Props) {
  const classes = useStyles();
  const [record, setRecord] = useState<WebGscsRecord | undefined>(undefined);
  const firestore = useFirestore();

  useEffect(() => {
    firestore
      .collection("records2")
      .doc(props.match.params.id)
      .get()
      .then(doc => {
        console.log(doc.id);
        console.log(doc.data());
        setRecord(doc.data() as WebGscsRecord);
      })
      .catch(e => console.log(e));
  }, []);

  const rendered = record ? (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.cardGrid}>
          <FieldCard field={record.scsInput.field} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.cardGrid}>
          <FriendCard friends={record.scsInput.friends} />
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <Box display="flex" justifyContent="center">
      <CircularProgress size={120} />
    </Box>
  );
  return (
    <Container maxWidth="md" className={classes.container}>
      {rendered}
    </Container>
  );
}
