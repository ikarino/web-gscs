import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: "lightgray",
      padding: theme.spacing(1),
      border: "1px solid black"
    }
  })
);

export default function PaperHeader({ title }: { title: string }) {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" className={classes.header}>
      {title}
    </Box>
  );
}
