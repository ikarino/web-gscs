import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import { SCSConfigInput } from "../../scs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      backgroundColor: "lightgray"
    },
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
      textAlign: "right"
    }
  })
);

type Props = {
  config: SCSConfigInput;
};

export default function ConfigCard({ config }: Props) {
  const classes = useStyles();

  const numSumoLimit = config.numSumoLimit ? config.numSumoLimit : 9;
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Config" className={classes.header} />
      <CardContent>
        <FormControl className={classes.formControl}>
          <InputLabel id="turn-select-label">ターン数</InputLabel>
          <Select
            labelId="turn-select-labell"
            id="turn-select"
            value={config.turn}
            disabled={true}
          >
            <MenuItem value={config.turn}>{config.turn}</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="trial-select-labell">試行回数</InputLabel>
          <Select
            labelId="trial-select-label"
            id="trial-select"
            value={config.trial}
            disabled={true}
          >
            <MenuItem value={config.trial}>{config.trial}</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="numSumoLimit-select-labell">
            スモグル発生数制限
          </InputLabel>
          <Select
            labelId="numSumoLimit-select-label"
            id="numSumoLimit-select"
            value={numSumoLimit}
            disabled={true}
          >
            <MenuItem value={numSumoLimit}>{numSumoLimit}</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
