import React from "react";

import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import RecordCard, { ActionButtonType } from "../share/RecordCard";

import scsInputSlice from "../../slices/scsInputSlice";
import {
  loadLocalStorage,
  deleteFromLocalStorage
} from "../../localStorageApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    },
    cardGrid: { height: "100%" },
    panel: {
      width: "90%",
      margin: "auto",
      padding: theme.spacing(2)
    }
  })
);

export default function LocalRecords() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const records = loadLocalStorage();

  const cards = Object.keys(records).map(key => {
    const record = records[key];
    const buttons: ActionButtonType[] = [
      {
        content: "削除",
        func: () => {
          deleteFromLocalStorage(key);
        },
        color: "secondary"
      },
      {
        content: "ロード",
        func: () => {
          dispatch(scsInputSlice.actions.setInput(record.scsInput));
          history.push("/run");
        },
        color: "primary"
      }
    ];
    return (
      <Grid item xs={12} sm={6} md={4} key={key}>
        <Paper className={classes.cardGrid}>
          <RecordCard time={key} record={record} buttons={buttons} />
        </Paper>
      </Grid>
    );
  });

  const rendered =
    Object.keys(records).length === 0 ? (
      <Paper elevation={4} className={classes.panel}>
        <a href="https://www.fellows.tokyo/">
          <img
            alt="ASKA NOW !"
            src="https://cache3.nipc.jp/entertainment/news/img/et-et-aska20170121-9-w300_0.jpg"
          />
        </a>
        <br />
        保存されているデータがありません。
        <br />
        <Link to="/run">Runページ</Link>
        で計算結果を保存するとこのページに表示されます。
        <br />
        データが保存されると、この画像は表示されなくなります。
        <br />
        <br />
        ブラウザのLocalStorageを使用しているため、デバイス間でデータは共有されません。
      </Paper>
    ) : (
      cards
    );

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={3}>
        {rendered}
      </Grid>
    </Container>
  );
}
