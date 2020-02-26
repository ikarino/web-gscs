import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { SCSFriendInput } from "torneko3js";
import { useDispatch } from "react-redux";
import scsInputSlice from "../../../slices/scsInputSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  })
);

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  f: SCSFriendInput;
  order: number;
};

export default function FriendEditDialogue({ open, setOpen, order, f }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // TODO
  // friend not changes even if props.f changes
  const [friend, setFriend] = useState(f);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSaveClose = () => {
    dispatch(scsInputSlice.actions.setFriend({ friend, order }));
    setOpen(false);
  };

  const nameOptions = [
    "キラーマシン",
    "スモールグール",
    "ホイミスライム",
    "おばけキノコ",
    "きとうし",
    "ようじゅつし",
    "ミステリードール",
    "いしにんぎょう",
    "メイジももんじゃ",
    "ハエまどう",
    "はねせんにん",
    "フライングデビル",
    "ランガー",
    "キングマーマン",
    "リリパット",
    "ドッグスナイパー",
    "ドラゴン",
    "スライムブレス",
    "ドラゴスライム",
    "ドラゴメタル"
  ].map(name => (
    <option key={name} value={name}>
      {name}
    </option>
  ));

  const isDoubleSpeed =
    friend.doubleSpeed === undefined
      ? false
      : friend.doubleSpeed
      ? true
      : false;
  console.log(friend);
  const isSealed =
    friend.isSealed === undefined ? false : friend.isSealed ? true : false;

  const hpDope = friend.hpDope === undefined ? 0 : friend.hpDope;
  const atkDope = friend.atkDope === undefined ? 0 : friend.atkDope;
  const weakenAtk = friend.weakenAtk === undefined ? 0 : friend.weakenAtk;
  const weakenDef = friend.weakenDef === undefined ? 0 : friend.weakenDef;

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>ID: {order}の仲間設定</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="friend-name">種族</InputLabel>
            <Select
              native
              value={friend.name}
              onChange={e =>
                setFriend({ ...friend, name: e.target.value as string })
              }
              input={<Input id="friend-name" />}
            >
              {nameOptions}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="friend-lv">Lv</InputLabel>
            <Select
              native
              value={friend.lv}
              onChange={e =>
                setFriend({ ...friend, lv: parseInt(e.target.value as string) })
              }
              input={<Input id="friend-lv" />}
            >
              {new Array(99).fill(1).map((_, i) => (
                <option key={`lv${i}`} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={isDoubleSpeed}
                onChange={e =>
                  setFriend({ ...friend, doubleSpeed: e.target.checked })
                }
                value={isDoubleSpeed}
                color="primary"
              />
            }
            label={isDoubleSpeed ? "倍速" : "等速"}
          />

          <FormControlLabel
            control={
              <Switch
                checked={isSealed}
                onChange={e =>
                  setFriend({ ...friend, isSealed: e.target.checked })
                }
                value={isSealed}
                color="primary"
              />
            }
            label={isSealed ? "封印有" : "封印無"}
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="friend-hpDope">HPドーピング</InputLabel>
            <Select
              native
              value={hpDope}
              onChange={e =>
                setFriend({
                  ...friend,
                  hpDope: parseInt(e.target.value as string)
                })
              }
              input={<Input id="friend-hpDope" />}
            >
              {new Array(500).fill(1).map((_, i) => (
                <option key={`hpDope${i}`} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="friend-atkDope">攻撃力ドーピング</InputLabel>
            <Select
              native
              value={atkDope}
              onChange={e =>
                setFriend({
                  ...friend,
                  atkDope: parseInt(e.target.value as string)
                })
              }
              input={<Input id="friend-atkDope" />}
            >
              {new Array(10).fill(1).map((_, i) => (
                <option key={`atkDope${i}`} value={i * 5}>
                  {i * 5}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="friend-weakenAtk">攻撃力弱化</InputLabel>
            <Select
              native
              value={weakenAtk}
              onChange={e =>
                setFriend({
                  ...friend,
                  weakenAtk: parseInt(e.target.value as string)
                })
              }
              input={<Input id="friend-weakenAtk" />}
            >
              {new Array(10).fill(1).map((_, i) => (
                <option key={`weakenAtk${i}`} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="friend-weakenDef">防御力弱化</InputLabel>
            <Select
              native
              value={weakenDef}
              onChange={e =>
                setFriend({
                  ...friend,
                  weakenDef: parseInt(e.target.value as string)
                })
              }
              input={<Input id="friend-weakenDef" />}
            >
              {new Array(10).fill(1).map((_, i) => (
                <option key={`weakenDef${i}`} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          閉じる
        </Button>
        <Button onClick={handleSaveClose} color="primary">
          保存して閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
