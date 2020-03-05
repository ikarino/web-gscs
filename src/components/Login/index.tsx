import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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

export default function Login() {
  const classes = useStyles();
  const firebase = useFirebase();
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const history = useHistory();

  const loginWithGoogle = () =>
    firebase
      .login({
        provider: "google",
        type: "redirect"
      })
      .catch(err => {
        // TODO
        // some notifications needed
        console.log(err);
      });

  const loginWithTwitter = () =>
    firebase
      .login({
        provider: "twitter",
        type: "redirect"
      })
      .catch(err => {
        // TODO
        // some notifications needed
        console.log(err);
      });

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      history.push("/");
    }
  });

  const content = isLoaded(auth) ? (
    <ButtonGroup size="large" color="primary">
      <Button onClick={loginWithGoogle}>Googleでログイン！</Button>
      <Button onClick={loginWithTwitter}>Twitterでログイン！</Button>
    </ButtonGroup>
  ) : (
    <Typography variant="body1" align="center">
      ログイン状態チェック中
    </Typography>
  );

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        <Typography variant="h5">LOGIN Page !</Typography>
        {content}
      </Paper>
    </Container>
  );
}
