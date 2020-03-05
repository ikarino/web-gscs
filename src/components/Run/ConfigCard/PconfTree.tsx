import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { defaultProbabilityConf } from "../../../scs";
import { RootState } from "../../../store";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400
  }
});

export default function PConfTree() {
  const classes = useStyles();
  const tmp = useSelector(
    (state: RootState) => state.scsInput.inp.config.pConf
  );
  const pConf = tmp !== undefined ? tmp : defaultProbabilityConf;

  const tree = Object.keys(pConf).map(k => {
    const items = Object.keys(pConf[k]).map(kk => (
      <TreeItem
        key={`${k}-${kk}`}
        nodeId={`${k}-${kk}`}
        label={`${kk}: ${pConf[k][kk]}`}
      >
        <TextField
          key={`item-${k}-${kk}`}
          defaultValue={pConf[k][kk]}
          helperText={`default: ${defaultProbabilityConf[k][kk]}`}
        />
        <Button
          color="primary"
          onClick={() => {
            // TODO
            // dispatch action
          }}
        >
          OK
        </Button>
      </TreeItem>
    ));
    return (
      <TreeItem key={`${k}`} nodeId={`${k}`} label={`${k}`}>
        {items}
      </TreeItem>
    );
  });

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {tree}
    </TreeView>
  );
}
