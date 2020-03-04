import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

import { RootState } from "../../store";

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

export default function UserPage() {
  const classes = useStyles();
  const firebase = useFirebase();
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const history = useHistory();

  useEffect(() => {
    if (!isLoaded(auth) || isEmpty(auth)) {
      history.push("/");
    }
  });

  const createdAt = new Date(parseInt(auth.createdAt));
  const content =
    isLoaded(auth) && !isEmpty(auth) ? (
      <Paper>
        <List>
          <ListItem>
            <ListItemText primary={auth.displayName} secondary="ユーザ名" />
          </ListItem>
          <ListItem>
            <ListItemText primary={auth.uid} secondary="ユーザID" />
          </ListItem>
          <ListItem>
            <ListItemText primary={createdAt.toString()} secondary="登録日" />
          </ListItem>
        </List>
      </Paper>
    ) : (
      <CircularProgress />
    );

  const logOut = () => firebase.logout();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        <Typography variant="h5">Awesome USER Page !</Typography>
        {content}
        <Button onClick={logOut} color="primary">
          log out
        </Button>
      </Paper>
    </Container>
  );
}
