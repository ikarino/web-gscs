import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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

    table: {
      margin: theme.spacing(1)
    },
    field: {
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
  showAuthor?: boolean;
};

export default function RecordCard({
  time,
  record,
  buttons,
  showAuthor
}: Props) {
  const classes = useStyles();
  const date = new Date(parseInt(time));
  let title = (
    <React.Fragment>
      {showAuthor && (
        <>
          <b>
            {record.webGscsExtra.userName}さんの投稿
            <br />
          </b>
          {record.webGscsExtra.comment}
          <br />
        </>
      )}
      @{date.getFullYear()}/{1 + date.getMonth()}/{date.getDate()}
    </React.Fragment>
  );

  const inp = record.scsInput;

  const cardActions = buttons.map(b => (
    <Button variant="outlined" color={b.color} onClick={b.func} key={b.content}>
      {b.content}
    </Button>
  ));

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title={title} />

      <CardContent>
        <div className={classes.field}>
          <NameFieldContainer inp={inp} />
        </div>

        <FinishStatePaper record={record} />
        <InputChips inp={inp} />
        <OutputChips record={record} />
      </CardContent>
      <CardActions>{cardActions}</CardActions>
    </Card>
  );
}
