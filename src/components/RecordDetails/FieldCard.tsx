import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import FieldContainer from "../share/FieldContainer";

import { SCSFieldInput } from "../../scs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      backgroundColor: "lightgray"
    },
    buttonGroup: {
      marginTop: theme.spacing(2)
    },
    fieldPaper: {
      margin: "auto"
    }
  })
);

type Props = {
  field: SCSFieldInput;
};

function FieldCard({ field }: Props) {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Field" className={classes.header} />

      <CardContent>
        <Paper>
          <FieldContainer field={field} fixed={true} />
        </Paper>
      </CardContent>
    </Card>
  );
}

export default FieldCard;
