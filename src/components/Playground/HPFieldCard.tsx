import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ReplayIcon from "@material-ui/icons/Replay";
import { Manager } from "../../scs";

import { place2index } from "./helperFunc";

const useStylesController = makeStyles<Theme, { col: number }>((theme: Theme) =>
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
    cellWrapper: props => ({
      float: "left",
      position: "relative",
      width: `${100 / props.col}%`,
      paddingBottom: `${100 / props.col}%`,
      overflow: "hidden",
      border: "1px solid black",
      [theme.breakpoints.up("xs")]: {
        // TODO
        fontSize: `calc((100vw-${theme.spacing(4)}) * ${1 / props.col})`
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "10px"
      }
    }),

    cellWrapperBlack: {
      backgroundColor: "black"
    },
    cellWrapperWhite: {
      backgroundColor: "white"
    },
    cellWrapperRed: {
      backgroundColor: "red"
    },
    cellWrapperPink: {
      backgroundColor: "pink"
    },
    cellWrapperGreen: {
      backgroundColor: "green"
    },
    cellWrapperLightGreen: {
      backgroundColor: "lightgreen"
    },
    cell: {
      position: "absolute",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

type Props = {
  manager: Manager;
  activeIndex: number;
  run: () => void;
  reset: () => void;
};

export default function HPFieldCard({
  manager,
  activeIndex,
  run,
  reset
}: Props) {
  const classes = useStylesController({ col: manager.field.col });

  const hpTable = manager.field.data.flat().map((d, i) => {
    let cellString = "";
    let style: string;
    if (d === 0) {
      style = `${classes.cellWrapperWhite} ${classes.cellWrapper}`;
    } else if (d === 1) {
      style = `${classes.cellWrapperBlack} ${classes.cellWrapper}`;
    } else if (d < 20) {
      const f = manager.friends[d - 10];
      if (place2index(f.place, manager.field.col) === activeIndex) {
        style = `${classes.cellWrapperGreen} ${classes.cellWrapper}`;
      } else {
        style = `${classes.cellWrapperLightGreen} ${classes.cellWrapper}`;
      }
      cellString = f.chp.toFixed(0);
    } else {
      const e = manager.enemys.filter(e => e.num === d - 20)[0];
      if (place2index(e.place, manager.field.col) === activeIndex) {
        style = `${classes.cellWrapperRed} ${classes.cellWrapper}`;
      } else {
        style = `${classes.cellWrapperPink} ${classes.cellWrapper}`;
      }
      cellString = e.chp.toFixed(0);
    }
    return (
      <div className={style} key={`hptable-${i}`}>
        <div className={classes.cell}>{cellString}</div>
      </div>
    );
  });

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="HP Field" className={classes.header} />

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
            <Button
              size="small"
              onClick={run}
              disabled={manager.friends.filter(f => f.chp <= 0).length > 0}
            >
              <PlayArrowIcon />
            </Button>
            <Button size="small" onClick={reset}>
              <ReplayIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
}
