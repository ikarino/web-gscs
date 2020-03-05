import * as React from "react"; // props の型を定義
import { SCSFieldInput } from "../../../scs";
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
  field: SCSFieldInput;
  fixed: boolean;
};

// コンポーネントを定義
function FieldContainer({ field, fixed }: Props) {
  const classes = useStyles();
  let _field = [];
  for (let row = 0; row < field.row; row++) {
    for (let col = 0; col < field.col; col++) {
      const index = row * field.col + col;
      const data = field.data[index];

      _field.push(
        <FieldCell
          data={data}
          place={{ row, col }}
          width={`${100 / field.col}%`}
          fixed={fixed}
          key={`row${row}-col${col}`}
        />
      );
    }
    _field.push(<br key={`row${row}`} />);
  }
  return <div className={classes.container}>{_field}</div>;
}

export default FieldContainer;
