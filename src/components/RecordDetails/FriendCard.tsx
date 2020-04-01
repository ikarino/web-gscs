import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import FriendTable from "../share/FriendTable";

import { SCSFriendInput } from "../../scs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    }
  })
);

type Props = {
  friends: SCSFriendInput[];
};

export default function FriendCard({ friends }: Props) {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Friend" />
      <CardContent>
        <FriendTable friends={friends} editable={false} />
      </CardContent>
    </Card>
  );
}
