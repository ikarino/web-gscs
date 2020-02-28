import React from "react";
import FriendListItem from "./FriendListItem";
import List from "@material-ui/core/List";
import { FriendType } from "./types";

const FriendList = React.memo<{ friends: FriendType[] }>(({ friends }) => (
  <List>
    {friends.map((friend, index: number) => (
      <FriendListItem friend={friend} index={index} key={friend.id} />
    ))}
  </List>
));

export default FriendList;
