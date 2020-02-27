import * as React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { changeField } from "../../../slices/scsInputSlice";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import rectImage from "../../../assets/z.png";
import rect0Image from "../../../assets/0.png";
import rect1Image from "../../../assets/1.png";
import rect2Image from "../../../assets/2.png";
import rect3Image from "../../../assets/3.png";
import rect4Image from "../../../assets/4.png";
import rect5Image from "../../../assets/5.png";
import rect6Image from "../../../assets/6.png";
import rect7Image from "../../../assets/7.png";
import rect8Image from "../../../assets/8.png";
import rect9Image from "../../../assets/9.png";

const fImages = [
  rect0Image,
  rect1Image,
  rect2Image,
  rect3Image,
  rect4Image,
  rect5Image,
  rect6Image,
  rect7Image,
  rect8Image,
  rect9Image
];

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
    fieldCellActive: props => ({
      border: "solid 1px green",
      width: props.width,
      backgroundColor: "red"
    })
  })
);

// props の型を定義
type Props = {
  data: number;
  place: { row: number; col: number };
  width: string;
  fixed: boolean;
};

// コンポーネントを定義
function FieldCell({ data, place, width, fixed }: Props) {
  // redux
  const activePlace = useSelector(
    (state: RootState) => state.scsInput.present.activePlace
  );
  const dispatch = useDispatch();

  // material-ui
  const classes = useStyles({ width });

  let src: typeof rectImage;
  let alt: string;
  let className: typeof classes.fieldCellEmpty;
  switch (data) {
    case 0:
      src = rectImage;
      alt = "empty";
      className = classes.fieldCellEmpty;
      break;
    case 1:
      src = rectImage;
      alt = "wall";
      className = classes.fieldCellWall;
      break;
    case 9:
      src = rectImage;
      alt = "enemy";
      className = classes.fieldCellEnemy;
      break;
    default:
      src = fImages[data - 10];
      alt = "f" + String(data - 10);
      if (place === activePlace) {
        className = classes.fieldCellActive;
      } else {
        className = classes.fieldCellFriend;
      }
  }

  const handleOnClick = fixed
    ? () => {}
    : (payload: { row: number; col: number }) => {
        dispatch(changeField(payload));
      };

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onClick={() => {
        handleOnClick(place);
      }}
    />
  );
}

export default FieldCell;
