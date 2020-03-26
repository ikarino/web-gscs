import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import { WebGscsRecord } from "../../slices/slice.interface";
import OutputChips from "./OutputChips";
import InputChips from "./InputChips";
import NameFieldContainer from "./NameFieldContainer";
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

export type ActionButtonType = {
  content: string;
  func: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color: "inherit" | "primary" | "secondary" | "default" | undefined;
};

type Props = {
  time: string;
  record: WebGscsRecord;
  buttons: ActionButtonType[];
};

export default function RecordCard({ time, record, buttons }: Props) {
  const classes = useStyles();
  const title = new Date(parseInt(time)).toString();
  const inp = record.scsInput;

  const cardActions = buttons.map(b => (
    <Button variant="outlined" color={b.color} onClick={b.func} key={b.content}>
      {b.content}
    </Button>
  ));

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title={title} className={classes.header} />

      <CardContent>
        <NameFieldContainer inp={inp} />

        <FinishStatePaper record={record} />
        <InputChips inp={inp} />
        <OutputChips record={record} />
      </CardContent>
      <CardActions>{cardActions}</CardActions>
    </Card>
  );
}
