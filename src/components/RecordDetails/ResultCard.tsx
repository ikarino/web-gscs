import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirestore, isLoaded, isEmpty } from "react-redux-firebase";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";

import TwitterIcon from "@material-ui/icons/Twitter";

import { WebGscsRecord } from "../../slices/slice.interface";
import { sum } from "../share/mathFunctions";
import { RootState } from "../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    tweetButton: {
      backgroundColor: "#00acee",
      color: "white",
      marginTop: theme.spacing(1),
      textTransform: "none"
    },
    deleteButton: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    comment: {
      whiteSpace: "pre-wrap"
    }
  })
);

type PropsSnackBar = {
  open: boolean;
  content: string;
};

function DeleteSnackBar({ open, content }: PropsSnackBar) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={3000}
      message={content}
    />
  );
}

type Props = {
  docId: string;
  record: WebGscsRecord;
};

export default function ResultCard({ docId, record }: Props) {
  const classes = useStyles();
  const inp = record.scsInput;
  const out = record.scsOutput;
  const extra = record.webGscsExtra;

  const auth = useSelector((state: RootState) => state.firebase.auth);
  const firestore = useFirestore();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string>("");

  const deleteRecord = () => {
    firestore
      .collection("records2")
      .doc(docId)
      .delete()
      .then(() => {
        setContent("削除に成功しました");
        setOpen(true);
        history.push("/");
      })
      .catch(e => {
        setContent(`削除に失敗しました😅${e}`);
        setOpen(true);
      });
  };

  const deleteButton =
    isLoaded(auth) && !isEmpty(auth) && extra.userId === auth.uid ? (
      <Button
        variant="contained"
        color="secondary"
        onClick={deleteRecord}
        size="small"
        className={classes.deleteButton}
      >
        削除
      </Button>
    ) : null;

  const waiting =
    (sum(out.loss.action.mean) /
      sum(
        inp.friends.map(f =>
          f.doubleSpeed ? inp.config.turn * 2 : inp.config.turn
        )
      )) *
    100;

  // 計算結果、投稿者情報関係、シェアボタン等
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader title="Info" />
      <CardContent>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  {extra.userName}さんの投稿
                  <br />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.comment}
                  >
                    {extra.comment.replace("\\n", "\n")}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <b>Config</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">ターン数</TableCell>
                <TableCell align="right">{inp.config.turn}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">試行回数</TableCell>
                <TableCell align="right">{inp.config.trial}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">発生数制限</TableCell>
                <TableCell align="right">{inp.config.numSumoLimit}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <b>計算結果</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">ターン経験値</TableCell>
                <TableCell align="right">
                  {(out.exp.total.mean / inp.config.turn).toFixed(1)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">ターン経過率</TableCell>
                <TableCell align="right">
                  {(
                    (out.result.finishState.success / inp.config.trial) *
                    100
                  ).toFixed(1)}
                  %
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">待機率</TableCell>
                <TableCell align="right">{waiting.toFixed(1)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          size="small"
          href={`https://twitter.com/intent/tweet?text=俺のスモコン&url=${window.location.href}&hashtags=トルネコ3,スモコン,web-gscs`}
          target="_blank"
          className={classes.tweetButton}
        >
          <TwitterIcon fontSize="small" />
          ツイート
        </Button>
        {deleteButton}
      </CardContent>
      <DeleteSnackBar open={open} content={content} />
    </Card>
  );
}
