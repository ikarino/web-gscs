import React, { useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { SCSFriendInput } from "../../../scs";

import FriendChip from "./FriendChip";
import FriendEditDialogue from "./FriendEditDialogue";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 350
    },
    td: {
      padding: theme.spacing(0.5),
      margin: 0
    },
    tr: {
      padding: theme.spacing(0.5),
      margin: 0
    },
    trh: {
      padding: theme.spacing(0.5),
      margin: 0,
      backgroundColor: "gray"
    }
  })
);

type Props = {
  friends: SCSFriendInput[];
  editable: boolean;
};

export default function FriendTable({ friends, editable }: Props) {
  const classes = useStyles();

  let dialogues: JSX.Element[] = [];
  const [opens, setOpens] = useState(new Array<boolean>(10).fill(false));
  if (editable) {
    for (let order = 0; order < friends.length; order++) {
      const setOpen = (open: boolean) => {
        let newState = new Array<boolean>(10).fill(false);
        newState[order] = open;
        setOpens(newState);
      };
      dialogues.push(
        <FriendEditDialogue
          open={opens[order]}
          setOpen={setOpen}
          f={friends[order]}
          order={order}
          key={`order${order}`}
        />
      );
    }
  }

  const rows = friends.map((f, order) => {
    const openDialogue = editable
      ? () => {
          let newState = new Array<boolean>(10).fill(false);
          newState[order] = true;
          setOpens(newState);
        }
      : () => {};
    return (
      <TableRow
        key={order}
        hover={true}
        className={classes.tr}
        onClick={openDialogue}
      >
        <TableCell
          size="small"
          align="center"
          component="th"
          scope="row"
          className={classes.td}
        >
          <Typography variant="caption">{order}</Typography>
        </TableCell>
        <TableCell size="small" align="center" className={classes.td}>
          <Typography variant="caption">{f.name}</Typography>
        </TableCell>
        <TableCell size="small" align="center" className={classes.td}>
          <Typography variant="caption">{f.lv}</Typography>
        </TableCell>
        <TableCell size="small" align="left" className={classes.td}>
          <FriendChip f={f} />
        </TableCell>
      </TableRow>
    );
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead className={classes.trh}>
            <TableRow>
              <TableCell size="small" align="center" className={classes.td}>
                <Typography variant="button">ID</Typography>
              </TableCell>
              <TableCell size="small" align="center" className={classes.td}>
                <Typography variant="button">種族</Typography>
              </TableCell>
              <TableCell size="small" align="center" className={classes.td}>
                <Typography variant="button">Lv</Typography>
              </TableCell>
              <TableCell size="small" align="center" className={classes.td}>
                <Typography variant="button">その他</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
      {dialogues}
    </>
  );
}
