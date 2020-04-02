import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Fab from "@material-ui/core/Fab";

import ImportExportIcon from "@material-ui/icons/ImportExport";
import TuneIcon from "@material-ui/icons/Tune";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tuneFab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    controller: {
      width: "80%",
      padding: theme.spacing(1),
      // backgroundColor: "gray",
      maxWidth: "200pt",
      position: "fixed",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)"
    },
    formControl: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      margin: 0
    },
    orderBox: {},
    buttonSet: {
      margin: theme.spacing(0.5)
    },
    select: {
      fontSize: "10pt",
      width: "60pt"
    },
    activeButton: {
      color: "black!important"
    },
    inactiveButton: {
      color: "gray!important"
    }
  })
);

export type Control = {
  sortBy: "exp" | "createdAt";
  order: "descend" | "ascend";
  speed: "single" | "double" | "either";
  numHoimin: number;
  numKillerma: number;
  withKinoko: boolean;
  growKinoko: boolean;
  withKiton: boolean;
  growKiton: boolean;
};

type PropsControlCard = {
  control: Control;
  setControl: React.Dispatch<React.SetStateAction<Control>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ControlCard({
  control,
  setControl,
  open,
  setOpen
}: PropsControlCard) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Fab
        color="secondary"
        className={classes.tuneFab}
        hidden={!open}
        onClick={() => setOpen(!open)}
      >
        <TuneIcon />
      </Fab>

      <Card
        className={classes.controller}
        component={Paper}
        elevation={5}
        hidden={open}
      >
        <Button size="small" onClick={() => setOpen(!open)}>
          <CloseIcon />
        </Button>
        <Grid container>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              className={classes.orderBox}
            >
              <ButtonGroup size="small" aria-label="speed button group">
                <Button
                  size="small"
                  variant="outlined"
                  disabled={control.sortBy === "createdAt"}
                  onClick={() =>
                    setControl({
                      ...control,
                      sortBy: "createdAt"
                    })
                  }
                  className={
                    control.sortBy === "createdAt"
                      ? classes.activeButton
                      : classes.inactiveButton
                  }
                >
                  投稿日順
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={control.sortBy === "exp"}
                  onClick={() =>
                    setControl({
                      ...control,
                      sortBy: "exp"
                    })
                  }
                  className={
                    control.sortBy === "exp"
                      ? classes.activeButton
                      : classes.inactiveButton
                  }
                >
                  経験値順
                </Button>
                <Button
                  size="small"
                  onClick={() =>
                    setControl({
                      ...control,
                      order: control.order === "descend" ? "ascend" : "descend"
                    })
                  }
                >
                  <ImportExportIcon />
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              className={classes.buttonSet}
              justifyContent="center"
              display="flex"
            >
              <ButtonGroup size="small" aria-label="speed button group">
                <Button
                  disabled={control.speed === "either"}
                  onClick={() => setControl({ ...control, speed: "either" })}
                  className={
                    control.speed === "either"
                      ? classes.activeButton
                      : classes.inactiveButton
                  }
                >
                  指定なし
                </Button>
                <Button
                  disabled={control.speed === "double"}
                  onClick={() => setControl({ ...control, speed: "double" })}
                  className={
                    control.speed === "double"
                      ? classes.activeButton
                      : classes.inactiveButton
                  }
                >
                  倍速
                </Button>
                <Button
                  disabled={control.speed === "single"}
                  onClick={() => setControl({ ...control, speed: "single" })}
                  className={
                    control.speed === "single"
                      ? classes.activeButton
                      : classes.inactiveButton
                  }
                >
                  等速
                </Button>
              </ButtonGroup>
            </Box>
            <Box
              className={classes.buttonSet}
              justifyContent="center"
              display="flex"
            >
              <ButtonGroup size="small" aria-label="kinoko button group">
                <Button
                  onClick={() => {
                    if (control.withKinoko) {
                      setControl({
                        ...control,
                        withKinoko: false,
                        growKinoko: false
                      });
                    } else {
                      setControl({ ...control, withKinoko: true });
                    }
                  }}
                  className={
                    control.withKinoko
                      ? classes.activeButton
                      : classes.inactiveButton
                  }
                >
                  茸有
                </Button>
                <Button
                  onClick={() => {
                    if (control.growKinoko) {
                      setControl({ ...control, growKinoko: false });
                    } else {
                      setControl({
                        ...control,
                        withKinoko: true,
                        growKinoko: true
                      });
                    }
                  }}
                  className={
                    control.growKinoko
                      ? classes.activeButton
                      : classes.inactiveButton
                  }
                >
                  茸育
                </Button>
                <Button
                  onClick={() => {
                    if (control.withKiton) {
                      setControl({
                        ...control,
                        withKiton: false,
                        growKiton: false
                      });
                    } else {
                      setControl({ ...control, withKiton: true });
                    }
                  }}
                  className={
                    control.withKiton
                      ? classes.activeButton
                      : classes.inactiveButton
                  }
                >
                  祈有
                </Button>
                <Button
                  onClick={() => {
                    if (control.growKiton) {
                      setControl({ ...control, growKiton: false });
                    } else {
                      setControl({
                        ...control,
                        withKiton: true,
                        growKiton: true
                      });
                    }
                  }}
                  className={
                    control.growKiton
                      ? classes.activeButton
                      : classes.inactiveButton
                  }
                >
                  祈育
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box justifyContent="center" display="flex">
              <FormControl className={classes.formControl}>
                <Select
                  labelId="numKillerma-label"
                  id="numKillerma"
                  value={control.numKillerma}
                  onChange={e =>
                    setControl({
                      ...control,
                      numKillerma: e.target.value as number
                    })
                  }
                  className={classes.select}
                >
                  <MenuItem value={-1}>指定なし</MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
                <FormHelperText>キラーマ数</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="numHoimin-label"
                  id="numHoimin"
                  value={control.numHoimin}
                  onChange={e =>
                    setControl({
                      ...control,
                      numHoimin: e.target.value as number
                    })
                  }
                  className={classes.select}
                >
                  <MenuItem value={-1}>指定なし</MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
                <FormHelperText>ホイミン数</FormHelperText>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}
