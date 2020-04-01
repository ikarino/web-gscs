import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";

import { sampleSCSInputs } from "../../../scs";

import scsInputSlice from "../../../slices/scsInputSlice";
import { RootState } from "../../../store";
import PConfTree from "./PconfTree";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },

    buttonGroup: {
      paddingTop: theme.spacing(1)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "100%",
      textAlign: "right"
    },
    drawer: {
      width: 250,
      margin: theme.spacing(2)
    }
  })
);

export default function ConfigCard() {
  const [drawer, setDrawer] = useState(false);
  const inp = useSelector((state: RootState) => state.scsInput.inp);
  const config = inp.config;
  const numSumoLimit =
    config.numSumoLimit === undefined ? 9 : config.numSumoLimit;
  const templateName = useSelector(
    (state: RootState) => state.scsInput.templateName
  );

  const dispatch = useDispatch();
  const classes = useStyles();

  // react-doms
  const templates = Object.keys(sampleSCSInputs).map(templateName => (
    <MenuItem key={templateName} value={templateName}>
      {templateName}
    </MenuItem>
  ));

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Config" />
      <CardContent>
        <FormControl className={classes.formControl}>
          <InputLabel id="turn-select-label">ターン数</InputLabel>
          <Select
            labelId="turn-select-labell"
            id="turn-select"
            value={config.turn}
            onChange={e => {
              dispatch(scsInputSlice.actions.setTurn(e.target.value as number));
            }}
          >
            <MenuItem value={1200}>1200</MenuItem>
            <MenuItem value={1500}>1500</MenuItem>
            <MenuItem value={1800}>1800</MenuItem>
          </Select>
          <FormHelperText>一度の試行で計算するターン数です</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="trial-select-labell">試行回数</InputLabel>
          <Select
            labelId="trial-select-label"
            id="trial-select"
            value={config.trial}
            onChange={e => {
              dispatch(
                scsInputSlice.actions.setTrial(e.target.value as number)
              );
            }}
          >
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={300}>300</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
          <FormHelperText>
            試行回数が多いほど誤差が小さくなります
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="numSumoLimit-select-labell">
            スモグル発生数制限
          </InputLabel>
          <Select
            labelId="numSumoLimit-select-label"
            id="numSumoLimit-select"
            value={numSumoLimit}
            onChange={e => {
              dispatch(
                scsInputSlice.actions.setNumSumoLimit(e.target.value as number)
              );
            }}
          >
            {[...Array(29)].map((v, i) => (
              <MenuItem value={i + 1} key={`sumo${i + 1}`}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>フロアユニット数の上限を考慮します</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="template-select-labell">テンプレート</InputLabel>
          <Select
            labelId="template-select-label"
            id="template-select"
            value={templateName}
            onChange={e => {
              dispatch(
                scsInputSlice.actions.setTemplate(e.target.value as string)
              );
            }}
          >
            {templates}
          </Select>
          <FormHelperText>典型的なスモコン形状を読み込みます</FormHelperText>
        </FormControl>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDrawer(true)}
          >
            確率設定
          </Button>
        </Box>
        <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
          <div className={classes.drawer} role="presentation">
            <PConfTree />
          </div>
        </Drawer>
      </CardContent>
    </Card>
  );
}
