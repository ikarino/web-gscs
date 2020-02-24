import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import GitHubIcon from "@material-ui/icons/GitHub";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import HelpIcon from "@material-ui/icons/Help";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import TelegramIcon from "@material-ui/icons/Telegram";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});
type Props = {
  drawer: boolean;
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LeftDrawer({ drawer, setDrawer }: Props) {
  const classes = useStyles();
  const close = () => {
    setDrawer(false);
  };

  return (
    <Drawer open={drawer} onClose={close}>
      <div
        className={classes.list}
        role="presentation"
        onClick={close}
        onKeyDown={close}
      >
        <List>
          <ListItem button key="run">
            <ListItemIcon>
              <PlayCircleFilledIcon />
            </ListItemIcon>
            <ListItemText primary="Run" />
          </ListItem>
          <ListItem button key="playground">
            <ListItemIcon>
              <TelegramIcon />
            </ListItemIcon>
            <ListItemText primary="Playground" />
          </ListItem>
          <ListItem button key="records">
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Records" />
          </ListItem>
          <ListItem button key="about">
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={`guide`}>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary={"スモコン指南書"} />
          </ListItem>
          <ListItem button key={`development`}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={"Github"} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
