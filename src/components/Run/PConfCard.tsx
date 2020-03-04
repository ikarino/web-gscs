import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { defaultProbabilityConf } from "torneko3js";

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
    },
    eachPconf: {
      margin: theme.spacing(1)
    }
  })
);

export default function PConfCard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tmp = useSelector(
    (state: RootState) => state.scsInput.present.inp.config.pConf
  );
  const pConf = tmp !== undefined ? tmp : defaultProbabilityConf;

  let iniState: { [key: string]: { [index: string]: boolean } } = {};
  for (const k of Object.keys(pConf)) {
    iniState[k] = {};
    for (const kk of Object.keys(pConf[k])) {
      iniState[k][kk] = false;
    }
  }
  const [state, setState] = useState(iniState);

  const list = Object.keys(pConf).map(k => {
    const items = Object.keys(pConf[k]).map(kk => {
      return (
        <React.Fragment key={`box-${k}${kk}`}>
          <Box
            display={state[k][kk] ? "none" : "block"}
            onClick={() => {
              setState({
                ...state,
                [k]: {
                  ...state[k],
                  [kk]: !state[k][kk]
                }
              });
            }}
          >
            <Button>
              {kk}:{pConf[k][kk]}
            </Button>
          </Box>
          <Box display={state[k][kk] ? "block" : "none"}>
            <TextField
              key={`item-${k}-${kk}`}
              label={kk}
              defaultValue={pConf[k][kk]}
              helperText={`default: ${defaultProbabilityConf[k][kk]}`}
              onChange={e => {
                const newValue = parseFloat(e.target.value);
                if (isNaN(newValue)) {
                  // TODO
                  // show some popup
                  return;
                }
                dispatch(
                  scsInputSlice.actions.setPConf({
                    ...pConf,
                    [k]: {
                      ...pConf[k],
                      [kk]: newValue
                    }
                  })
                );
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setState({
                  ...state,
                  [k]: {
                    ...state[k],
                    [kk]: !state[k][kk]
                  }
                });
              }}
            >
              OK
            </Button>
          </Box>
        </React.Fragment>
      );
    });
    return (
      <Grid
        item
        key={`item-${k}`}
        xs={12}
        md={2}
        component={Paper}
        className={classes.eachPconf}
      >
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
            dispatch(scsInputSlice.actions.setPConf(defaultProbabilityConf));
          }}
          color="primary"
          variant="outlined"
        >
          set default
        </Button>

        <Grid container spacing={3} justify="center">
          {list}
        </Grid>
      </CardContent>
    </Card>
  );
}
