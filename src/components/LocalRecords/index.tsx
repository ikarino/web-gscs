import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import ControlCard, { Control } from "../share/ControlCard";
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
    cardGrid: {
      height: "100%"
    },
    panel: {
      width: "90%",
      margin: "auto",
      maxWidth: "400px",
      padding: theme.spacing(2)
    }
  })
);

export default function LocalRecords() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [records, setRecords] = useState(loadLocalStorage());

  const [control, setControl] = useState<Control>({
    sortBy: "createdAt",
    order: "descend",
    speed: "either",
    numHoimin: -1,
    numKillerma: -1,
    withKinoko: false,
    withKiton: false,
    growKinoko: false,
    growKiton: false
  });
  const [open, setOpen] = useState<boolean>(true);

  const cards = Object.keys(records)
    .filter(key => {
      const r = records[key];
      if (control.speed === "single") {
        return (
          r.scsInput.friends.filter(f => !f.doubleSpeed).length ===
          r.scsInput.friends.length
        );
      } else if (control.speed === "double") {
        return (
          r.scsInput.friends.filter(f => f.doubleSpeed).length ===
          r.scsInput.friends.length
        );
      } else {
        return true;
      }
    })
    .filter(key => {
      const r = records[key];
      const friends = r.scsInput.friends;
      const lvKiton =
        Math.min(
          ...friends.filter(f => f.name === "きとうし").map(f => f.lv)
        ) === Infinity
          ? 0
          : Math.min(
              ...friends.filter(f => f.name === "きとうし").map(f => f.lv)
            );

      const withKiton = !control.withKiton || lvKiton > 0;
      const growKiton = !control.growKiton || lvKiton < 5;
      return withKiton && growKiton;
    })
    .filter(key => {
      const r = records[key];
      const friends = r.scsInput.friends;
      const lvKinoko =
        Math.min(
          ...friends.filter(f => f.name === "おばけキノコ").map(f => f.lv)
        ) === Infinity
          ? 0
          : Math.min(
              ...friends.filter(f => f.name === "おばけキノコ").map(f => f.lv)
            );

      const withKinoko = !control.withKinoko || lvKinoko > 0;
      const growKinoko = !control.growKinoko || lvKinoko < 5;
      return withKinoko && growKinoko;
    })
    .filter(key => {
      const r = records[key];
      if (control.numHoimin === -1) {
        return true;
      }
      return (
        r.scsInput.friends.filter(f => f.name === "ホイミスライム").length ===
        control.numHoimin
      );
    })
    .filter(key => {
      const r = records[key];
      if (control.numKillerma === -1) {
        return true;
      }
      return (
        r.scsInput.friends.filter(f => f.name === "キラーマシン").length ===
        control.numKillerma
      );
    })
    .sort((key1: string, key2: string) => {
      const r1 = records[key1];
      const r2 = records[key2];
      const order = control.order === "ascend" ? 1 : -1;
      if (control.sortBy === "createdAt") {
        return (r1.webGscsExtra.createdAt - r2.webGscsExtra.createdAt) * order;
      } else if (control.sortBy === "exp") {
        return (
          (r1.scsOutput.exp.total.mean - r2.scsOutput.exp.total.mean) * order
        );
      }
      return 0;
    })
    .map(key => {
      const record = records[key];
      const buttons: ActionButtonType[] = [
        {
          content: "削除",
          func: () => {
            deleteFromLocalStorage(key);
            setRecords(loadLocalStorage());
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
    cards.length === 0 ? (
      <Paper elevation={4} className={classes.panel}>
        <a href="https://www.fellows.tokyo/">
          <img
            alt="ASKA NOW !"
            src="https://cache3.nipc.jp/entertainment/news/img/et-et-aska20170121-9-w300_0.jpg"
          />
        </a>
        <br />
        表示するデータがありません。
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
    <React.Fragment>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          {rendered}
        </Grid>
      </Container>
      <ControlCard
        control={control}
        setControl={setControl}
        open={open}
        setOpen={setOpen}
      />
    </React.Fragment>
  );
}
