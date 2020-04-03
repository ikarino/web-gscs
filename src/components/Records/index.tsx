import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import { WebGscsRecord } from "../../slices/slice.interface";
import scsInputSlice from "../../slices/scsInputSlice";
import { RootState } from "../../store";
import RecordCard, { ActionButtonType } from "../share/RecordCard";
import ControlCard, { Control } from "../share/ControlCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    },
    cardGrid: {
      height: "100%"
    },
    controller: {
      width: "80%",
      padding: theme.spacing(1),
      backgroundColor: "gray",
      maxWidth: "200pt",
      position: "fixed",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)"
    },
    formControl: {
      padding: 0,
      margin: 0
    },
    orderBox: {},
    buttonSet: {
      margin: theme.spacing(0.5)
    }
  })
);

type KeyRecord = { r: WebGscsRecord; k: string };

export default function Records() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
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
  const [open, setOpen] = useState(true);
  const [recordsRendered, setRecordsRendered] = useState<KeyRecord[]>([]);

  useFirestoreConnect("records2");
  const records: { [key: string]: WebGscsRecord } = useSelector(
    (state: RootState) => state.firestore.data.records2
  );

  useEffect(() => {
    if (!records) {
      return;
    }
    const keys = Object.keys(records);
    const values = Object.values(records);
    setRecordsRendered(
      keys.map((k, i) => ({
        r: values[i],
        k
      }))
    );
  }, [records]);

  const rendered =
    recordsRendered.length === 0 ? (
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <CircularProgress size={120} />
        </Box>
      </Grid>
    ) : (
      recordsRendered
        .filter(kr => {
          const r = kr.r;
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
        .filter(kr => {
          const r = kr.r;
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
        .filter(kr => {
          const r = kr.r;
          const friends = r.scsInput.friends;
          const lvKinoko =
            Math.min(
              ...friends.filter(f => f.name === "おばけキノコ").map(f => f.lv)
            ) === Infinity
              ? 0
              : Math.min(
                  ...friends
                    .filter(f => f.name === "おばけキノコ")
                    .map(f => f.lv)
                );

          const withKinoko = !control.withKinoko || lvKinoko > 0;
          const growKinoko = !control.growKinoko || lvKinoko < 5;
          return withKinoko && growKinoko;
        })
        .filter(kr => {
          const r = kr.r;
          if (control.numHoimin === -1) {
            return true;
          }
          return (
            r.scsInput.friends.filter(f => f.name === "ホイミスライム")
              .length === control.numHoimin
          );
        })
        .filter(kr => {
          const r = kr.r;
          if (control.numKillerma === -1) {
            return true;
          }
          return (
            r.scsInput.friends.filter(f => f.name === "キラーマシン").length ===
            control.numKillerma
          );
        })
        .sort((kr1: KeyRecord, kr2: KeyRecord) => {
          const r1 = kr1.r;
          const r2 = kr2.r;
          const order = control.order === "ascend" ? 1 : -1;
          if (control.sortBy === "createdAt") {
            return (
              (r1.webGscsExtra.createdAt - r2.webGscsExtra.createdAt) * order
            );
          } else if (control.sortBy === "exp") {
            return (
              (r1.scsOutput.exp.total.mean - r2.scsOutput.exp.total.mean) *
              order
            );
          }
          return 0;
        })
        .map((kr: KeyRecord) => {
          const key = kr.k;
          const record = kr.r;
          const buttons: ActionButtonType[] = [
            {
              content: "詳細",
              func: () => {
                history.push(`/record/${key}`);
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
                <RecordCard
                  time={record.webGscsExtra.createdAt.toString()}
                  record={record}
                  showAuthor={true}
                  buttons={buttons}
                />
              </Paper>
            </Grid>
          );
        })
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
