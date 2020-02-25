import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import { sampleSCSInputs, SCSTrialOutput, Manager } from "torneko3js";

import scsInputSlice from "../../slices/scsInputSlice";
import runScsSlice, { runScsAsync } from "../../slices/runScsSlice";
import { RootState } from "../../store";
import { useSampleWorker } from "../../workers/useSampleWorker";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: "lightgray"
    },
    buttonGroup: {
      paddingTop: "5px"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "100%",
      textAlign: "right"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    calcButton: {
      justifyContent: "center"
    }
  })
);

export default function ConfigCard() {
  const inp = useSelector((state: RootState) => state.scsInput.inp);
  const isRunning = useSelector((state: RootState) => state.runScs.isRunning);
  const config = inp.config;
  const numSumoLimit =
    config.numSumoLimit === undefined ? 9 : config.numSumoLimit;
  const templateName = useSelector(
    (state: RootState) => state.scsInput.templateName
  );
  const progress = useSelector((state: RootState) => state.runScs.progress);
  const dispatch = useDispatch();
  const classes = useStyles();

  // web worker hook
  const sampleWorker = useSampleWorker();

  // react-doms
  const templates = Object.keys(sampleSCSInputs).map(templateName => (
    <MenuItem key={templateName} value={templateName}>
      {templateName}
    </MenuItem>
  ));

  const handleStart = async () => {
    dispatch(runScsSlice.actions.start(inp));
    let outputs: SCSTrialOutput[] = [];
    for (let t = 0; t < 10; t++) {
      const result = await sampleWorker.runScs10(inp);
      outputs = outputs.concat(result);
      dispatch(runScsSlice.actions.progress((t + 1) * 10));
    }
    const m = new Manager(inp);
    m.trialOutputs = outputs;
    dispatch(runScsSlice.actions.finish(m.summarizeOutputs()));
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Config" className={classes.header} />
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
          <FormHelperText>一度の試行で計算するターン数です。</FormHelperText>
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
          <FormHelperText>発生できるスモグルの数を制限します</FormHelperText>
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
          <FormHelperText>
            典型的なスモコン形状をテンプレートとして読み込みます
          </FormHelperText>
        </FormControl>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          bgcolor="background.paper"
        >
          <Button
            onClick={handleStart}
            disabled={isRunning}
            variant="outlined"
            color="secondary"
            className={classes.calcButton}
          >
            {isRunning ? "計算中" : "計算開始"}
          </Button>
        </Box>
        <LinearProgress variant="determinate" value={progress} />
      </CardContent>
    </Card>
  );
}
