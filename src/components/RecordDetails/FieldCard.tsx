import React, { useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import FieldContainer from "../share/FieldContainer";
import NameFieldContainer from "../share/NameFieldContainer";

import { SCSInput } from "../../scs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
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
  inp: SCSInput;
};

function FieldCard({ inp }: Props) {
  const classes = useStyles();
  const field = inp.field;

  const [isName, setIsName] = useState(true);

  const rendered = isName ? (
    <NameFieldContainer inp={inp} />
  ) : (
    <FieldContainer field={field} fixed={true} />
  );

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Field" />

      <CardContent>
        <Paper>{rendered}</Paper>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          onClick={() => setIsName(!isName)}
          variant="outlined"
        >
          ID ⇔ 名前
        </Button>
      </CardActions>
    </Card>
  );
}

export default FieldCard;
