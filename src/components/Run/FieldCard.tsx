import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
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

import FieldContainer from "../share/FieldContainer";
import { RootState } from "../../store";
import scsInputSlice from "../../slices/scsInputSlice";

const useStyles = makeStyles((theme: Theme) =>
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
    }
  })
);

function FieldCard() {
  const field = useSelector(
    (state: RootState) => state.scsInput.present.inp.field
  );
  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Field" className={classes.header} />

      <CardContent>
        <Paper>
          <FieldContainer field={field} fixed={false} />
        </Paper>

        <Container>
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
        </Container>
      </CardContent>
    </Card>
  );
}

export default FieldCard;
