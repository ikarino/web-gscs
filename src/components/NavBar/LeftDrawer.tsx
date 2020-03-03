import React from "react";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import * as MuiLink from "@material-ui/core/Link";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";
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
          <ListItem button key="dashboard" component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="run" component={Link} to="/run">
            <ListItemIcon>
              <PlayCircleFilledIcon />
            </ListItemIcon>
            <ListItemText primary="Run" />
          </ListItem>
          <ListItem button key="playground" component={Link} to="/playground">
            <ListItemIcon>
              <TelegramIcon />
            </ListItemIcon>
            <ListItemText primary="Playground" />
          </ListItem>
          <ListItem button key="records" component={Link} to="/records">
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Records" />
          </ListItem>
          <ListItem button key="about" component={Link} to="/about">
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key={`guide`}
            component={MuiLink.default}
            href="https://combo-guide.now.sh"
          >
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary={"スモコン指南書"} />
          </ListItem>
          <ListItem
            button
            key={`development`}
            component={MuiLink.default}
            href="https://github.com/ikarino/web-gscs/tree/typescript"
          >
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
