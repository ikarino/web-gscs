import { PayloadAction } from "@reduxjs/toolkit";

import { SliceSCSInput } from "../slice.interface";

export const actionMoveField = (
  state: SliceSCSInput,
  action: PayloadAction<string>
): SliceSCSInput => {
  const { row, col, data } = state.inp.field;
  let newdata: number[] = [];
  switch (action.payload) {
    case "up":
      for (let irow = 0; irow < row; irow++) {
        const index = row * 1 + irow;
        if (data[index] > 1) {
          return state;
        }
      }
      newdata = new Array(row).fill(1);
      for (let icol = 2; icol < col; icol++) {
        let newrow = [];
        for (let irow = 0; irow < row; irow++) {
          const index = row * icol + irow;
          newrow.push(data[index]);
        }
        newdata = newdata.concat(newrow);
      }
      newdata = newdata.concat(new Array(col).fill(1));
      break;
    case "down":
      for (let irow = 0; irow < row; irow++) {
        const index = row * (col - 2) + irow;
        if (data[index] > 1) {
          return state;
        }
      }
      newdata = new Array(row).fill(1);
      for (let icol = 0; icol < col - 2; icol++) {
        let newrow = [];
        for (let irow = 0; irow < row; irow++) {
          const index = row * icol + irow;
          newrow.push(data[index]);
        }
        newdata = newdata.concat(newrow);
      }
      newdata = newdata.concat(new Array(col).fill(1));
      break;
    case "left":
      for (let icol = 0; icol < col; icol++) {
        const index = row * icol + 1;
        if (data[index] > 1) {
          return state;
        }
      }
      for (let icol = 0; icol < col; icol++) {
        for (let irow = 0; irow < row; irow++) {
          if (icol === 0) {
            newdata.push(1);
          } else if (icol === col - 1) {
            newdata.push(1);
          } else {
            newdata.push(data[row * icol + irow + 1]);
          }
        }
      }
      break;
    case "right":
      for (let icol = 0; icol < col; icol++) {
        const index = row * icol + col - 2;
        if (data[index] > 1) {
          return state;
        }
      }
      for (let icol = 0; icol < col; icol++) {
        for (let irow = 0; irow < row; irow++) {
          if (icol === 0) {
            newdata.push(1);
          } else if (icol === col - 1) {
            newdata.push(1);
          } else {
            newdata.push(data[row * icol + irow - 1]);
          }
        }
      }
      break;
    default:
      return state;
  }
  return {
    ...state,
    inp: {
      ...state.inp,
      field: {
        ...state.inp.field,
        data: newdata
      }
    }
  };
};

export const actionChangeFieldSize = (
  state: SliceSCSInput,
  action: PayloadAction<boolean>
): SliceSCSInput => {
  const { row, col, data } = state.inp.field;
  if (action.payload) {
    // 小さくする場合
    // 1. check
    for (let icol = 1; icol < col - 1; icol++) {
      const index = row * (col - 2) + icol;
      if (data[index] > 1) {
        return state;
      }
    }
    for (let irow = 1; irow < row - 1; irow++) {
      const index = irow * row + col - 2;
      if (data[index] > 1) {
        return state;
      }
    }
    // 2. make it smaller !
    let newData: number[] = [];
    for (let icol = 0; icol < col - 1; icol++) {
      for (let irow = 0; irow < row - 1; irow++) {
        if (icol === col - 2 || irow === row - 2) {
          newData.push(1);
        } else {
          newData.push(data[icol * row + irow]);
        }
      }
    }

    return {
      ...state,
      inp: {
        ...state.inp,
        field: {
          col: col - 1,
          row: row - 1,
          data: newData
        }
      }
    };
  } else {
    // 大きくする場合
    // 1. checkは不要
    // 2. make it larger !
    let newdata: number[] = [];
    for (let icol = 0; icol < col; icol++) {
      for (let irow = 0; irow < row; irow++) {
        newdata.push(data[icol * row + irow]);
      }
      newdata.push(1);
    }
    for (let irow = 0; irow < row + 1; irow++) {
      newdata.push(1);
    }

    return {
      ...state,
      inp: {
        ...state.inp,
        field: {
          col: col + 1,
          row: row + 1,
          data: newdata
        }
      }
    };
  }
};

export const actionChangeField = (
  state: SliceSCSInput,
  action: PayloadAction<{ row: number; col: number }>
): SliceSCSInput => {
  const { col, row } = action.payload;
  const field = state.inp.field;
  const tappedIndex = row * field.col + col;
  const tappedData = field.data[tappedIndex];

  if (
    col === 0 ||
    row === 0 ||
    col === field.col - 1 ||
    row === field.row - 1
  ) {
    return state;
  }

  // ここから先はfield.dataの変更有り
  let data = Array.from(field.data);

  // activeとなっているセルがある場合
  if (state.activePlace.row !== -1) {
    const activeIndex =
      state.activePlace.row * field.col + state.activePlace.col;

    data[activeIndex] = tappedData;
    data[tappedIndex] = state.inp.field.data[activeIndex];
    return {
      ...state,
      activePlace: { row: -1, col: -1 },
      inp: {
        ...state.inp,
        field: {
          ...state.inp.field,
          data
        }
      }
    };
  }

  switch (tappedData) {
    case 0:
      data[tappedIndex] = 1;
      break;
    case 1:
      data[tappedIndex] = 9;
      break;
    case 9:
      data[tappedIndex] = 0;
      break;
    default:
      return {
        ...state,
        activePlace: action.payload
      };
  }

  return {
    ...state,
    inp: {
      ...state.inp,
      field: {
        ...state.inp.field,
        data
      }
    }
  };
};
