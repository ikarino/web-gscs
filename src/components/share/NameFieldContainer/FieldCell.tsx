import * as React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import rectImage from "../../../assets/z.png";
import rectKamakichi from "../../../assets/kamakichi.png";
import rectHoimin from "../../../assets/hoimin.png";
import rectKiton from "../../../assets/kiton.png";
import rectFriend from "../../../assets/friend.png";
import rectKillerma from "../../../assets/killerma.png";
import rectKinoko from "../../../assets/kinoko.png";
import rectSumoguru from "../../../assets/sumoguru.png";

import { SCSFriendInput } from "../../../scs";

// https://stackoverflow.com/questions/56111294/how-to-use-theme-and-props-in-makestyles
const useStyles = makeStyles<Theme, { width: string }>((theme: Theme) =>
  createStyles({
    fieldCellEmpty: props => ({
      border: "solid 1px green",
      backgroundColor: "white",
      width: props.width
    }),
    fieldCellEnemy: props => ({
      border: "solid 1px green",
      width: props.width,
      backgroundColor: "gray"
    }),
    fieldCellWall: props => ({
      border: "solid 1px green",
      width: props.width,
      backgroundColor: "black"
    }),
    fieldCellFriend: props => ({
      border: "solid 1px green",
      width: props.width,
      backgroundColor: "white"
    }),
    fieldCellFriendWeakend: props => ({
      border: "solid 1px green",
      width: props.width,
      backgroundColor: "lightblue"
    }),
    fieldCellFriendSealed: props => ({
      border: "solid 1px green",
      width: props.width,
      backgroundColor: "lightpink"
    })
  })
);

// props の型を定義
type Props = {
  data: SCSFriendInput | number;
  width: string;
};

// コンポーネントを定義
function FieldCell({ data, width }: Props) {
  // redux

  // material-ui
  const classes = useStyles({ width });

  let src: typeof rectImage;
  let alt: string = "empty";
  let className: typeof classes.fieldCellEmpty;
  if (data === 0) {
    src = rectImage;
    alt = "empty";
    className = classes.fieldCellEmpty;
  } else if (data === 1) {
    src = rectImage;
    alt = "wall";
    className = classes.fieldCellWall;
  } else if (data === 9) {
    src = rectImage;
    alt = "enemy";
    className = classes.fieldCellEnemy;
  } else {
    const f = data as SCSFriendInput;
    alt = f.name;
    className = classes.fieldCellFriend;
    if (f.weakenAtk && f.weakenAtk > 0) {
      className = classes.fieldCellFriendWeakend;
    }
    if (f.isSealed) {
      className = classes.fieldCellFriendSealed;
    }

    switch (f.name) {
      case "キラーマシン":
        src = rectKillerma;
        break;
      case "おばけキノコ":
        src = rectKinoko;
        break;
      case "スモールグール":
        src = rectSumoguru;
        break;
      case "きとうし":
        src = rectKiton;
        break;
      case "ホイミスライム":
        src = rectHoimin;
        break;
      case "さそりかまきり":
        src = rectKamakichi;
        break;
      default:
        src = rectFriend;
    }
  }

  return <img className={className} src={src} alt={alt} />;
}

export default FieldCell;
