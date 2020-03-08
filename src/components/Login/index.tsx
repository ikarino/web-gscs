import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { RootState } from "../../store";
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 400,
      paddingTop: theme.spacing(4),
      // paddingBottom: theme.spacing(2)
      marginBottom: theme.spacing(2)
    },
    panel: {
      width: "90%",
      margin: "auto",
      paddingBottom: theme.spacing(4)
    },
    logoBox: {
      backgroundColor: "lightBlue"
    },
    logo: {
      width: "60%"
    },
    scs: {
      textAlign: "center",
      paddingBottom: theme.spacing(3)
    },
    loginButton: {
      width: "80%",
      margin: theme.spacing(1)
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
    <>
      <Box justifyContent="center" display="flex">
        <Button
          onClick={loginWithGoogle}
          variant="contained"
          color="secondary"
          className={classes.loginButton}
        >
          Googleでログイン
        </Button>
      </Box>
      <Box justifyContent="center" display="flex">
        <Button
          onClick={loginWithTwitter}
          variant="contained"
          color="primary"
          className={classes.loginButton}
        >
          Twitterでログイン
        </Button>
      </Box>
    </>
  ) : (
    <Typography variant="body1" align="center">
      ログイン状態チェック中
    </Typography>
  );

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        <Box justifyContent="center" display="flex" className={classes.logoBox}>
          <img src={logo} alt="logo" className={classes.logo} />
        </Box>
        <Typography variant="h6" className={classes.scs}>
          web-gscs
        </Typography>
        {content}
      </Paper>
    </Container>
  );
}
