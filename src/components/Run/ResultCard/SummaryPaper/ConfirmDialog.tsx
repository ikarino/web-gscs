import React, { useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

import runScsSlice from "../../../../slices/runScsSlice";
import { RootState } from "../../../../store";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmDialog({ open, setOpen }: Props) {
  const record = useSelector((state: RootState) => state.runScs.record);
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const [snackBar, setSnackBar] = useState({ open: false, message: "" });
  const [comment, setComment] = useState("俺のスモコン");
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const firestore = useFirestore();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    stableDispatch(
      runScsSlice.actions.setWebGscsExtra({
        comment,
        userName: auth.displayName ? auth.displayName : "",
        userId: auth.uid,
        createdAt: Date.now()
      })
    );
  }, [auth, comment, stableDispatch]);

  const postToFirestore = () => {
    firestore
      .collection("records2")
      .add(record)
      .then(doc => {
        setSnackBar({
          open: true,
          message: "投稿に成功しました"
        });
        firestore
          .collection("recordLogs")
          .add({
            comment,
            createdAt: record.webGscsExtra.createdAt,
            recordId: doc.id,
            userId: auth.uid,
            userName: auth.displayName,
            photoURL: auth.photoURL
          })
          .then(doc => {
            console.log("success !");
            console.log(doc.id);
          })
          .catch(e => {
            console.log("Error !");
            console.log(e);
          });
      })
      .catch(e => {
        setSnackBar({
          open: true,
          message: `投稿に失敗しました\n${e}`
        });
      });
    setOpen(false);
    setComment("俺のスモコン");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">投稿前確認</DialogTitle>
        <DialogContent>
          <DialogContentText>コメントを追加して下さい</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            defaultValue={comment}
            fullWidth
            onChange={e => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={postToFirestore} color="primary">
            投稿する
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={() => setSnackBar({ open: false, message: "" })}
        message={snackBar.message}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackBar({ open: false, message: "" })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
}
