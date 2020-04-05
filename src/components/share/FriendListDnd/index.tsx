import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Container, Draggable, DropResult } from "react-smooth-dnd";

import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

import DragHandleIcon from "@material-ui/icons/DragHandle";

import { SCSFriendInput } from "../../../scs";
import scsInputSlice from "../../../slices/scsInputSlice";

import FriendEditDialogue from "./FriendEditDialogue";
import friendListTheme from "./theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    first: {
      display: "inline-block",
      width: "55%"
    },
    second: {
      fontSize: "4pt",
      color: "gray"
    }
  })
);

type PropsListItem = {
  id: number;
  f: SCSFriendInput;
  openDialogue: () => void;
};

function FriendListItem({ f, id, openDialogue }: PropsListItem) {
  const classes = useStyles();
  let secondary: string[] = [];
  if (f.doubleSpeed) {
    secondary.push("倍");
  }
  if (f.isSealed) {
    secondary.push("封");
  }
  if (f.isSticked) {
    secondary.push("不動");
  }
  if (f.weakenAtk) {
    secondary.push(`水${f.weakenAtk}`);
  }
  if (f.weakenDef) {
    secondary.push(`ル${f.weakenDef}`);
  }
  if (f.hpDope) {
    secondary.push(`HP+${f.hpDope}`);
  }
  if (f.atkDope) {
    secondary.push(`AT+${f.atkDope}`);
  }
  return (
    <Draggable>
      <ListItem component={Paper}>
        <ListItemIcon className="drag-handle">
          <DragHandleIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={
            <React.Fragment>
              <span className={classes.first}>
                [{id}] {f.name} Lv{f.lv}
              </span>
              <span className={classes.second}>{secondary.join(",")}</span>
            </React.Fragment>
          }
          onClick={openDialogue}
        />
      </ListItem>
    </Draggable>
  );
}
type Props = {
  friends: SCSFriendInput[];
  editable: boolean;
};
export default function FriendListDnd({ friends, editable }: Props) {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [opens, setOpens] = useState(new Array<boolean>(10).fill(false));

  let dialogues: JSX.Element[] = [];
  if (editable) {
    for (let order = 0; order < friends.length; order++) {
      const setOpen = (open: boolean) => {
        let newState = new Array<boolean>(10).fill(false);
        newState[order] = open;
        setOpens(newState);
      };
      dialogues.push(
        <FriendEditDialogue
          open={opens[order]}
          setOpen={setOpen}
          f={friends[order]}
          order={order}
          key={`order${order}`}
        />
      );
    }
  }

  const friendList = friends.map((f, order) => {
    const openDialogue = editable
      ? () => {
          let newState = new Array<boolean>(10).fill(false);
          newState[order] = true;
          setOpens(newState);
        }
      : () => {};
    return (
      <FriendListItem
        f={f}
        id={order}
        key={order}
        openDialogue={openDialogue}
      />
    );
  });

  const onDrop = (result: DropResult) => {
    dispatch(scsInputSlice.actions.changeOrder(result));
  };

  return (
    <ThemeProvider theme={friendListTheme}>
      <List>
        <Container
          dragHandleSelector=".drag-handle"
          lockAxis="y"
          onDrop={onDrop}
        >
          {friendList}
        </Container>
      </List>
      {dialogues}
    </ThemeProvider>
  );
}
