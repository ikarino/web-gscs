import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

import { Manager } from "torneko3js";

import { RootState } from "../../store";
import scsInputSlice from "../../slices/scsInputSlice";

const useStyles = makeStyles<Theme, { width: string }>((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    header: {
      backgroundColor: "lightgray"
    },
    buttonBox: {
      clear: "left"
    },
    buttonGroup: {
      marginTop: theme.spacing(2)
    },
    fieldPaper: {
      margin: "auto"
    },

    cellWrapperBlack: props => ({
      float: "left",
      position: "relative",
      width: props.width,
      paddingBottom: props.width,
      overflow: "hidden",
      backgroundColor: "black",
      fontSize: "5pt",
      border: "1px solid black"
    }),
    cellWrapperRed: props => ({
      float: "left",
      position: "relative",
      width: props.width,
      paddingBottom: props.width,
      overflow: "hidden",
      backgroundColor: "red",
      fontSize: "5pt",
      border: "1px solid black"
    }),
    cellWrapperWhite: props => ({
      float: "left",
      position: "relative",
      width: props.width,
      paddingBottom: props.width,
      overflow: "hidden",
      backgroundColor: "white",
      fontSize: "5pt",
      border: "1px solid black"
    }),
    cellWrapperGreen: props => ({
      float: "left",
      position: "relative",
      width: props.width,
      paddingBottom: props.width,
      overflow: "hidden",
      backgroundColor: "lightgreen",

      // TODO
      // responsive fontsize
      [theme.breakpoints.down("xs")]: {
        fontSize: "5px"
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "10px"
      },
      border: "1px solid black"
    }),
    cellString: {
      position: "absolute",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

export default function ControllerCard() {
  const inp = useSelector((state: RootState) => state.scsInput.inp);
  const dispatch = useDispatch();
  const m = new Manager(inp);
  m.init();
  const [state, setState] = useState(true);
  const classes = useStyles({ width: `${100 / inp.field.col}%` });

  const hpTable = m.field.data.flat().map((d, i) => {
    if (state) {
    }
    let cellString = "";
    let style: string;
    if (d === 0) {
      style = classes.cellWrapperWhite;
    } else if (d === 1) {
      style = classes.cellWrapperBlack;
    } else if (d < 20) {
      style = classes.cellWrapperGreen;
      cellString = m.friends[d - 10].chp.toFixed(0);
    } else {
      style = classes.cellWrapperRed;
      cellString = m.getEnemyByNumber(d - 20).chp.toFixed(0);
    }
    return (
      <div className={style} key={`hptable-${i}`}>
        <div className={classes.cellString}>{cellString}</div>
      </div>
    );
  });
  const run = () => {
    m.turnEnemy();
    console.log(m.friends.map(f => f.chp));
    setState(!state);
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Field" className={classes.header} />

      <CardContent>
        <Paper>{hpTable}</Paper>

        <Box
          display="flex"
          justifyContent="center"
          className={classes.buttonBox}
        >
          <ButtonGroup
            color="primary"
            size="small"
            aria-label="outlined primary button group"
            className={classes.buttonGroup}
            component={Paper}
          >
            <Button size="small" onClick={run}>
              <ZoomOutIcon />
            </Button>
            <Button
              size="small"
              onClick={() =>
                dispatch(scsInputSlice.actions.changeFieldSize(false))
              }
            >
              <ZoomInIcon />
            </Button>
            <Button
              size="small"
              onClick={() => dispatch(scsInputSlice.actions.moveField("left"))}
            >
              <ArrowBackIcon />
            </Button>
            <Button
              size="small"
              onClick={() => dispatch(scsInputSlice.actions.moveField("right"))}
            >
              <ArrowForwardIcon />
            </Button>
            <Button
              size="small"
              onClick={() => dispatch(scsInputSlice.actions.moveField("up"))}
            >
              <ArrowUpwardIcon />
            </Button>
            <Button
              size="small"
              onClick={() => dispatch(scsInputSlice.actions.moveField("down"))}
            >
              <ArrowDownwardIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
}
