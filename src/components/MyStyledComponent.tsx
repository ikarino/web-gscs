import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { RootState } from "../store";
import { increment, setCount } from "../slices/counterSlice";

// スタイルを定義
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    },
    title: {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    }
  })
);

// props の型を定義
type Props = {
  title?: string;
};

// コンポーネントを定義
function MyStyledComponent({ title }: Props) {
  // redux
  const count = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  // ここでクラス名を取得
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h4 className={classes.title}>{title || "My Styled Component"}</h4>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>aaaa</button>
      <button onClick={() => dispatch(setCount({ count: 0 }))}>bbbb</button>
    </div>
  );
}

export default MyStyledComponent;
