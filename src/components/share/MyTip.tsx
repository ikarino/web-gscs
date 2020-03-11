import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tip: {
      margin: "1px"
    }
  })
);

type MyTipProps = {
  title: string;
  label: string;
  color: "default" | "primary" | "secondary";
};

export default function MyTip({ title, label, color }: MyTipProps) {
  const classes = useStyles();
  return (
    <Tooltip
      enterDelay={200}
      leaveDelay={200}
      title={title}
      arrow
      placement="top"
      className={classes.tip}
    >
      <Chip size="small" label={label} color={color} />
    </Tooltip>
  );
}
