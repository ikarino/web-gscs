import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Draggable } from "react-beautiful-dnd";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuIcon from "@material-ui/icons/Menu";

import { FriendType } from "./types";
import FriendChip from "./FriendChip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      backgroundColor: "lightgray",
      padding: 0,
      margin: theme.spacing(1)
    }
  })
);
type Props = {
  friend: FriendType;
  index: number;
};

const FriendListItem = ({ friend, index }: Props) => {
  const classes = useStyles();

  const content = friend.content;
  const primary = `${content.name}(Lv ${content.lv})`;
  const secondary = <FriendChip f={content} />;
  return (
    <Draggable draggableId={friend.id} index={index}>
      {provided => (
        <ListItem
          className={classes.listItem}
          component={Paper}
          dense={true}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <ListItemIcon>
            <MenuIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default FriendListItem;
