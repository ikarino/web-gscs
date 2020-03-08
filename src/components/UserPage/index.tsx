import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

import { RootState } from "../../store";
import { loadLocalStorage } from "../../localStorageApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 600,
      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(2)
      marginBottom: theme.spacing(2)
    },
    list: {
      border: "1px solid black"
    },
    panel: {
      width: "90%",
      margin: "auto",
      padding: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(2)
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
    console.log(auth);
  });

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
            <ListItemText
              primary={new Date(parseInt(auth.createdAt)).toString()}
              secondary="登録日"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={new Date(parseInt(auth.lastLoginAt)).toString()}
              secondary="最終ログイン日"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`${Object.keys(loadLocalStorage()).length}件`}
              secondary="ローカル保存Record数"
            />
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
        {content}
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={logOut}
            color="primary"
            variant="outlined"
            className={classes.button}
          >
            log out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
