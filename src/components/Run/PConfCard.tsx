import * as React from "react";
import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import JSONTree from "react-json-tree";

import { Manager } from "torneko3js";

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

const theme = {
  scheme: "monokai",
  author: "wimer hazenberg (http://www.monokai.nl)",
  base00: "#272822",
  base01: "#383830",
  base02: "#49483e",
  base03: "#75715e",
  base04: "#a59f85",
  base05: "#f8f8f2",
  base06: "#f5f4f1",
  base07: "#f9f8f5",
  base08: "#f92672",
  base09: "#fd971f",
  base0A: "#f4bf75",
  base0B: "#a6e22e",
  base0C: "#a1efe4",
  base0D: "#66d9ef",
  base0E: "#ae81ff",
  base0F: "#cc6633"
};

export default function PConfCard() {
  const inp = useSelector((state: RootState) => state.scsInput.present.inp);
  const pconf = new Manager(inp).pConf;
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Probability Config" className={classes.header} />

      <CardContent>
        <JSONTree theme={theme} data={pconf} hideRoot={true} />
      </CardContent>
    </Card>
  );
}