import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
import { useFirestore } from "react-redux-firebase";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 600,
      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(2)
      marginBottom: theme.spacing(2)
    },
    panel: {
      width: "90%",
      margin: "auto",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    timeString: {
      marginLeft: theme.spacing(2)
    }
  })
);

const epochTimeToString = (createdAt: number): string => {
  const date = new Date(createdAt);
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
};

type TypeRecordLog = {
  comment: string;
  createdAt: number;
  recordId: string;
  userId: string;
  userName: string;
  photoURL: string;
};

type Commit = {
  sha: string;
  date: string;
  message: string;
};

export default function Dashboard() {
  const classes = useStyles();
  const firestore = useFirestore();
  const initialState: TypeRecordLog[] = [];
  const [recordLogs, setRecordLogs] = useState(initialState);
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    firestore
      .collection("recordLogs")
      .orderBy("createdAt", "desc")
      .limit(5)
      .onSnapshot(snapshot => {
        let datas: TypeRecordLog[] = [];
        snapshot.forEach(doc => {
          datas.push({
            comment: doc.data().comment as string,
            createdAt: doc.data().createdAt as number,
            recordId: doc.data().recordId as string,
            userId: doc.data().userId as string,
            userName: doc.data().userName as string,
            photoURL: doc.data().photoURL as string
          });
        });
        setRecordLogs(datas);
      });
  }, []);

  useEffect(() => {
    const f = async () => {
      const response = await axios(
        "https://api.github.com/repos/ikarino/web-gscs/commits?sha=typescript"
      );
      setCommits(
        response.data.map((d: any) => {
          return {
            sha: d["sha"],
            date: d["commit"]["committer"]["date"],
            message: d["commit"]["message"]
          };
        })
      );
    };
    f();
  }, []);

  const listItems = recordLogs.map(recordLog => (
    <React.Fragment key={recordLog.recordId}>
      <ListItem button component={Link} to={`/record/${recordLog.recordId}`}>
        <ListItemAvatar>
          <Avatar alt={recordLog.userName} src={recordLog.photoURL} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography component="span" variant="body1" color="textPrimary">
                {recordLog.userName}さんの投稿
              </Typography>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
                className={classes.timeString}
              >
                <br />@{epochTimeToString(recordLog.createdAt)}
              </Typography>
            </React.Fragment>
          }
          secondary={recordLog.comment}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  ));

  const rendered =
    recordLogs.length === 0 ? (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={120} />
      </Box>
    ) : (
      <List>{listItems}</List>
    );

  const updatesList = commits.slice(0, 5).map(commit => (
    <ListItem>
      <ListItemText
        primary={
          <Typography component="span" variant="body1" color="textPrimary">
            {commit.date}
          </Typography>
        }
        secondary={commit.message}
      />
    </ListItem>
  ));
  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        <Typography variant="h6">最新の投稿</Typography>
        {rendered}
      </Paper>
      <Paper elevation={4} className={classes.panel}>
        <Typography variant="h6">更新情報</Typography>
        <List>{updatesList}</List>
      </Paper>
    </Container>
  );
}
