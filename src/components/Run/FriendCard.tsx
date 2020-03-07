import React, { useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import FriendEditDialogue from "../share/FriendTable/FriendEditDialogue";
import FriendTable from "../share/FriendTable";
// import FriendTable from "../share/FriendTable2";

import { RootState } from "../../store";
import { SCSFriendInput } from "../../scs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      backgroundColor: "lightgray"
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

function FriendCard() {
  const friends = useSelector((state: RootState) => state.scsInput.inp.friends);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  console.log(friends.length === 10);
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Friend" className={classes.header} />
      <CardContent>
        <FriendTable friends={friends} editable={true} />
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.addButton}
            disabled={friends.length === 10}
          >
            仲間追加
          </Button>
        </Box>
      </CardContent>
      <FriendEditDialogue
        open={open}
        setOpen={setOpen}
        f={initialFriendInput}
        order={friends.length}
      />
    </Card>
  );
}

export default FriendCard;
