import React from "react";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import scsInputSlice from "../../slices/scsInputSlice";
import { WebGscsRecord } from "../../slices/slice.interface";
import { deleteFromLocalStorage } from "../../localStorageApi";
import OutputChips from "./OutputChips";
import InputChips from "./InputChips";
import FieldContainer from "./FieldContainer";
import FinishStatePaper from "./FinishStatePaper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      backgroundColor: "lightgray"
    },
    table: {
      margin: theme.spacing(1)
    }
  })
);

type Props = {
  time: string;
  record: WebGscsRecord;
};

export default function RecordCard({ time, record }: Props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const title = new Date(parseInt(time)).toString();
  const inp = record.scsInput;

  const deleteRecord = () => {
    deleteFromLocalStorage(time);
    history.push("/local");
  };
  const loadInput = () => {
    dispatch(scsInputSlice.actions.setInput(inp));
    history.push("/run");
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title={title} className={classes.header} />

      <CardContent>
        <FieldContainer field={inp.field} fixed={true} />
        <FinishStatePaper record={record} />
        <InputChips inp={inp} />
        <OutputChips record={record} />
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="secondary" onClick={deleteRecord}>
          削除
        </Button>
        <Button variant="outlined" color="primary" onClick={loadInput}>
          ロード
        </Button>
      </CardActions>
    </Card>
  );
}