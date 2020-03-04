import React, { useState, useEffect } from "react";
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

import { Manager, SCSInput } from "torneko3js";

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
      [theme.breakpoints.up("xs")]: {
        fontSize: "calc(4vmin)"
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "10px"
      },
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
      [theme.breakpoints.up("xs")]: {
        fontSize: "calc(4vmin)"
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

const createInitialManager = (inp: SCSInput) => {
  const m = new Manager(inp);
  m.init();
  return m;
};

interface Props {}

interface State {
  m: Manager;
  manager: Manager;
}
/*
class ControllerCard2 extends React.Component<Props, State> {
  run() {
    this.state.m.turnEnemy();
    console.log(this.state.m.friends.map(f => f.chp));
  }

  reset() {
    this.state.m.init();
  }
  render() {
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
              <Button size="small" onClick={this.run}>
                <ZoomOutIcon />
              </Button>
              <Button size="small" onClick={this.reset}>
                <ZoomOutIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </CardContent>
      </Card>
    );
  }
}
*/
export default function ControllerCard() {
  const inp = useSelector((state: RootState) => state.scsInput.inp);
  const m = createInitialManager(inp);

  const [manager, setManager] = useState(
    JSON.parse(JSON.stringify(m)) as Manager
  );

  const classes = useStyles({ width: `${100 / inp.field.col}%` });

  const hpTable = manager.field.data.flat().map((d, i) => {
    let cellString = "";
    let style: string;
    if (d === 0) {
      style = classes.cellWrapperWhite;
    } else if (d === 1) {
      style = classes.cellWrapperBlack;
    } else if (d < 20) {
      style = classes.cellWrapperGreen;
      cellString = manager.friends[d - 10].chp.toFixed(0);
    } else {
      style = classes.cellWrapperRed;
      cellString = manager.enemys
        .filter(e => e.num === d - 20)[0]
        .chp.toFixed(0);
      // cellString = manager.getEnemyByNumber(d - 20).chp.toFixed(0);
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
    setManager(JSON.parse(JSON.stringify(m)) as Manager);
  };

  const reset = () => {
    m.init();
    setManager(JSON.parse(JSON.stringify(m)) as Manager);
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
            <Button size="small" onClick={reset}>
              <ZoomOutIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
}
