import React, { useState, useEffect } from "react";

import { useFirestore } from "react-redux-firebase";
import { RouteComponentProps } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

import FriendCard from "./FriendCard";
import FieldCard from "./FieldCard";
import ResultCard from "./ResultCard";
import { WebGscsRecord } from "../../slices/slice.interface";
import scsInputSlice from "../../slices/scsInputSlice";

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
    cardGrid: { height: "100%" },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
);

type Props = RouteComponentProps<{ id: string }>;

export default function RecordDetails(props: Props) {
  const classes = useStyles();
  const [record, setRecord] = useState<WebGscsRecord | undefined>(undefined);
  const firestore = useFirestore();
  const history = useHistory();
  const dispatch = useDispatch();

  const loadInput = () => {
    dispatch(scsInputSlice.actions.setInput(record?.scsInput));
    history.push("/run");
  };

  useEffect(() => {
    firestore
      .collection("records2")
      .doc(props.match.params.id)
      .onSnapshot(doc => {
        setRecord(doc.data() as WebGscsRecord);
      });
  }, [props.match.params.id, firestore]);

  const rendered = record ? (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.cardGrid}>
          <ResultCard record={record} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.cardGrid}>
          <FieldCard inp={record.scsInput} />
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
      <Fab
        color="secondary"
        aria-label="edit"
        className={classes.fab}
        onClick={loadInput}
      >
        <EditIcon />
      </Fab>
    </Container>
  );
}
