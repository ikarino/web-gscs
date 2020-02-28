import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import ReactJson, { InteractionProps } from "react-json-view";

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
  const pConf = defaultProbabilityConf;

  const dispatch = useDispatch();
  const classes = useStyles();
  const [tmpPConf, setTmpPConf] = useState(pConf);

  const onEdit = (edit: InteractionProps) => {
    if (typeof edit.new_value !== "number") {
      return false;
    }

    // TODO
    // TypeError: Cannot assign to read only property 'skill' of object '#<Object>'
    dispatch(scsInputSlice.actions.setPConf(edit.updated_src as OverWriter));
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Probability Config" className={classes.header} />

      <CardContent>
        <Button onClick={() => setTmpPConf(pConf)}>set default</Button>
        <ReactJson
          src={tmpPConf}
          name={"pConf"}
          collapsed={1}
          displayDataTypes={true} // TODO
          onEdit={onEdit}
          validationMessage={"不正な値が入力されました"}
        />
      </CardContent>
    </Card>
  );
}
