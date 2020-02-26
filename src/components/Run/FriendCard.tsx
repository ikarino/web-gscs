import * as React from "react";
import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent } from "@material-ui/core";

import FriendTable from "../share/FriendTable";

import { RootState } from "../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      backgroundColor: "lightgray"
    },
    buttonGroup: {
      paddingTop: "5px"
    }
  })
);

function FriendCard() {
  const friends = useSelector((state: RootState) => state.scsInput.inp.friends);
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Friend" className={classes.header} />
      <CardContent>
        <FriendTable friends={friends} editable={true} />
      </CardContent>
    </Card>
  );
}

export default FriendCard;
