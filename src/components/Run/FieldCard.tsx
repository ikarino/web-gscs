import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  ButtonGroup
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

import FieldContainer from "../share/FieldContainer";
import { RootState } from "../../store";
import scsInputSlice from "../../slices/scsInputSlice";

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

function FieldCard() {
  const field = useSelector((state: RootState) => state.scsInput.inp.field);
  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <Card variant="outlined">
      <CardHeader title="Field" className={classes.header} />

      <CardContent>
        <FieldContainer field={field} fixed={false} />
        <ButtonGroup
          color="primary"
          size="small"
          aria-label="outlined primary button group"
          className={classes.buttonGroup}
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
      </CardContent>
    </Card>
  );
}

export default FieldCard;
