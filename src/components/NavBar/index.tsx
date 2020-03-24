import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

import LeftDrawer from "./LeftDrawer";
import { RootState } from "../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "gray"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

function NavBar() {
  const classes = useStyles();
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const history = useHistory();
  // drawer
  const [drawer, setDrawer] = useState(false);

  // login or small photo
  const leftComponent =
    isLoaded(auth) && !isEmpty(auth) ? (
      auth.photoURL ? (
        <Avatar
          alt="Cindy Baker"
          src={auth.photoURL}
          component={Link}
          to="/user"
        />
      ) : (
        <Avatar>{auth.uid[0]}</Avatar>
      )
    ) : (
      <Button color="inherit" component={Link} to={"/login"}>
        Login
      </Button>
    );

  const pathname = history.location.pathname;
  const breadcrumb =
    pathname === "/"
      ? ""
      : pathname.includes("/record/")
      ? "/record"
      : pathname;

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          web-gscs{breadcrumb}
        </Typography>
        {leftComponent}
      </Toolbar>
      <LeftDrawer drawer={drawer} setDrawer={setDrawer} />
    </AppBar>
  );
}

export default NavBar;
