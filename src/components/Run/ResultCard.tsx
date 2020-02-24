import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: "lightgray"
    },
    buttonGroup: {
      paddingTop: "5px"
    }
  })
);

export default function ResultCard() {
  // const config = useSelector((state: RootState) => state.scsInput.inp.config);
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <CardHeader title="Result" className={classes.header} />
      <CardContent>AWESOME RESULT</CardContent>
    </Card>
  );
}
