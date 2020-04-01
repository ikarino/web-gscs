import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import ImportExportIcon from "@material-ui/icons/ImportExport";

import { WebGscsRecord } from "../../slices/slice.interface";
import scsInputSlice from "../../slices/scsInputSlice";
import { RootState } from "../../store";
import RecordCard, { ActionButtonType } from "../share/RecordCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2)
    },
    cardGrid: {
      height: "100%"
    },
    controller: {
      position: "fixed",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)"
    },
    formControl: {
      minWidth: "120px",
      padding: 0,
      margin: 0
    },
    orderBox: {
      width: "100%"
    }
  })
);

type Control = {
  sortBy: "exp" | "createdAt";
  order: "descend" | "ascend";
  speed: "single" | "double" | "either";
  numHoimin: number;
  numKillerma: number;
  withKinoko: boolean;
  growKinoko: boolean;
  withKiton: boolean;
  growKiton: boolean;
};

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

  const rendered = recordsRendered
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
      if (control.numHoimin === -1) {
        return true;
      }
      return (
        r.scsInput.friends.filter(f => f.name === "ホイミスライム").length ===
        control.numHoimin
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
        return (r1.webGscsExtra.createdAt - r2.webGscsExtra.createdAt) * order;
      } else if (control.sortBy === "exp") {
        return (
          (r1.scsOutput.exp.total.mean - r2.scsOutput.exp.total.mean) * order
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
    });

  return (
    <React.Fragment>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={3}>
          {rendered}
        </Grid>
      </Container>
      <Card className={classes.controller}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              className={classes.orderBox}
            >
              <Button>経験値順</Button>
              <Button>投稿日順</Button>
              <Button>
                <ImportExportIcon />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Button variant="outlined">倍速</Button>
              <Button variant="outlined">等速</Button>
            </Box>
            <Box>
              <Button variant="outlined">茸有</Button>
              <Button variant="outlined">茸育</Button>
            </Box>
            <Box>
              <Button variant="outlined">祈有</Button>
              <Button variant="outlined">祈育</Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="numKillerma-label">キラーマ数</InputLabel>
              <Select
                labelId="numKillerma-label"
                id="numKillerma"
                value={control.numKillerma}
                onChange={() => {}}
              >
                <MenuItem value={-1}>指定なし</MenuItem>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="numHoimin-label">ホイミン数</InputLabel>
              <Select
                labelId="numHoimin-label"
                id="numHoimin"
                value={control.numHoimin}
                onChange={() => {}}
              >
                <MenuItem value={-1}>指定なし</MenuItem>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}
