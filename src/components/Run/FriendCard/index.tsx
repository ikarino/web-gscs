import React, { useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import FriendAddDialog from "./FriendAddDialog";
// import FriendTable from "../../share/FriendTable";
import FriendListDnd from "../../share/FriendListDnd";

import { RootState } from "../../../store";
import { SCSFriendInput } from "../../../scs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },

    addButton: {
      width: "100%",
      marginTop: theme.spacing(1)
    }
  })
);

const initialFriendInput: SCSFriendInput = {
  name: "キラーマシン",
  lv: 13
};

export default function FriendCard() {
  const friends = useSelector((state: RootState) => state.scsInput.inp.friends);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const addButton =
    friends.length !== 10 ? (
      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
          size="small"
          className={classes.addButton}
          disabled={friends.length === 10}
          onClick={() => setOpen(true)}
        >
          仲間追加
        </Button>
      </Box>
    ) : null;

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Friend" />
      <CardContent>
        <FriendListDnd friends={friends} editable={true} />
        {addButton}
      </CardContent>
      <FriendAddDialog
        open={open}
        setOpen={setOpen}
        f={initialFriendInput}
        order={friends.length}
      />
    </Card>
  );
}
