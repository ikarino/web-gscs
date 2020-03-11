import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { defaultProbabilityConf } from "../../../scs";
import { RootState } from "../../../store";
import scsInputSlice from "../../../slices/scsInputSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 240,
      flexGrow: 1,
      maxWidth: 400
    },
    defaultButton: {
      margin: theme.spacing(1)
    }
  })
);

export default function PConfTree() {
  const classes = useStyles();
  const tmp = useSelector(
    (state: RootState) => state.scsInput.inp.config.pConf
  );
  const pConf = tmp !== undefined ? tmp : defaultProbabilityConf;
  const dispatch = useDispatch();
  // snackBar
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
          onChange={e => {
            const newValue = parseFloat(e.target.value);
            if (isNaN(newValue)) {
              setOpen(true);
              return;
            }
            setOpen(false);
            const newPConf = JSON.parse(JSON.stringify(pConf));
            newPConf[k][kk] = newValue;
            dispatch(scsInputSlice.actions.setPConf(newPConf));
            /*
            dispatch(
              scsInputSlice.actions.setPConf({
                ...pConf,
                [k]: {
                  ...pConf[k],
                  [kk]: newValue
                }
              })
            );
            */
          }}
        />
      </TreeItem>
    ));
    return (
      <TreeItem key={`${k}`} nodeId={`${k}`} label={`${k}`}>
        {items}
      </TreeItem>
    );
  });

  return (
    <>
      <Button
        className={classes.defaultButton}
        variant="outlined"
        color="primary"
        onClick={() =>
          dispatch(scsInputSlice.actions.setPConf(defaultProbabilityConf))
        }
      >
        set default
      </Button>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {tree}
      </TreeView>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="不正な値が入力されています"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}
