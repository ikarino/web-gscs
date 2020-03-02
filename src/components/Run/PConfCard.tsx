import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { defaultProbabilityConf, OverWriter } from "torneko3js";

import scsInputSlice from "../../slices/scsInputSlice";
import { RootState } from "../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      backgroundColor: "lightgray"
    },
    buttonGroup: {
      paddingTop: "5px"
    }
  })
);

export default function PConfCard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tmpPConf, setTmpPConf] = useState(defaultProbabilityConf);

  // dispatch(scsInputSlice.actions.setPConf(edit.updated_src as OverWriter));

  const list = Object.keys(tmpPConf).map(k => {
    const items = Object.keys(tmpPConf[k]).map(kk => {
      return (
        <TextField
          key={`item-${k}-${kk}`}
          label={kk}
          defaultValue={tmpPConf[k][kk]}
          onChange={e => {
            const newValue = parseFloat(e.target.value);
            console.log(newValue);
            let newConf = JSON.parse(JSON.stringify(defaultProbabilityConf));
            if (isNaN(newConf)) {
              return;
            }
            newConf[k][kk] = newValue;
            setTmpPConf(newConf);
            dispatch(scsInputSlice.actions.setPConf(newConf));
          }}
        />
      );
    });
    return (
      <Grid item key={`item-${k}`} xs={12} md={4}>
        <Typography variant="h6">{k}</Typography>
        {items}
      </Grid>
    );
  });

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Probability Config" className={classes.header} />

      <CardContent>
        <Button
          onClick={() => {
            setTmpPConf(defaultProbabilityConf);
            dispatch(scsInputSlice.actions.setPConf(defaultProbabilityConf));
            console.log("fuck");
          }}
        >
          set default
        </Button>
        <Grid container spacing={3}>
          {list}
        </Grid>
      </CardContent>
    </Card>
  );
}
