import * as React from "react"; // props の型を定義
import { SCSInput } from "../../../scs";
import FieldCell from "./FieldCell";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      lineHeight: 0,
      width: "100%"
    }
  })
);
type Props = {
  inp: SCSInput;
};

// コンポーネントを定義
export default function NameFieldContainer({ inp }: Props) {
  const classes = useStyles();
  const field = inp.field;
  let _field = [];
  for (let row = 0; row < field.row; row++) {
    for (let col = 0; col < field.col; col++) {
      const index = row * field.col + col;
      const data = field.data[index];

      _field.push(
        <FieldCell
          data={data > 9 ? inp.friends[data - 10] : data}
          width={`${100 / field.col}%`}
          key={`row${row}-col${col}`}
        />
      );
    }
    _field.push(<br key={`row${row}`} />);
  }
  return <div className={classes.container}>{_field}</div>;
}
