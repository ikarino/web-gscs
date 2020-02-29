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

import FieldContainer from "../share/FieldContainer";
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
    buttonGroup: {
      marginTop: theme.spacing(2)
    },
    fieldPaper: {
      margin: "auto"
    },
    emptyCell: props => ({
      width: props.width,
      backgroundColor: "white",
      "&::before": {
        content: "",
        display: "block",
        paddingTop: "100%"
      }
    }),
    wallCell: props => ({
      width: props.width,
      backgroundColor: "black"
    }),
    enemyCell: props => ({
      width: props.width,
      backgroundColor: "orange"
    }),
    friendCell: props => ({
      width: props.width,
      backgroundColor: "lightgreen",
      "&::before": {
        content: "",
        display: "block",
        paddingTop: "100%"
      }
    })
  })
);

export default function ControllerCard() {
  const inp = useSelector((state: RootState) => state.scsInput.present.inp);
  const dispatch = useDispatch();
  const m = new Manager(inp);
  m.init();
  const [manager, setManager] = useState(m);
  const classes = useStyles({ width: `${100 / inp.field.col}%` });

  const hpTable = manager.field.data.map((row, irow) => {
    const tds = row.map((m, im) => {
      const key = `m${irow}-${im}`;
      if (m === 0) {
        return <td key={key} className={classes.emptyCell}></td>;
      } else if (m === 1) {
        return <td key={key} className={classes.wallCell}></td>;
      } else if (10 <= m && m < 20) {
        const hp = manager.friends[m - 10].chp.toFixed(0);
        return (
          <td key={key} className={classes.friendCell}>
            {hp}
          </td>
        );
      } else {
        const hp = manager.getEnemyByNumber(m - 20).chp.toFixed(0);
        return (
          <td key={key} className={classes.enemyCell}>
            {hp}
          </td>
        );
      }
    });
    return <tr key={`row${irow}`}>{tds}</tr>;
  });

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Field" className={classes.header} />

      <CardContent>
        <Paper>
          <table className="mx-auto">
            <tbody>{hpTable}</tbody>
          </table>
        </Paper>

        <Box display="flex" justifyContent="center">
          <ButtonGroup
            color="primary"
            size="small"
            aria-label="outlined primary button group"
            className={classes.buttonGroup}
            component={Paper}
          >
            <Button
              size="small"
              onClick={() =>
                dispatch(scsInputSlice.actions.changeFieldSize(true))
              }
            >
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
