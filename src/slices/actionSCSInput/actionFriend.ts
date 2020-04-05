import { PayloadAction } from "@reduxjs/toolkit";

import { DropResult } from "react-smooth-dnd";
import arrayMove from "array-move";

import { SliceSCSInput } from "../slice.interface";
import { SCSFriendInput } from "../../scs";

type PayLoad = {
  order: number;
  friend: SCSFriendInput;
};

export const actionSetFriend = (
  state: SliceSCSInput,
  action: PayloadAction<PayLoad>
): SliceSCSInput => {
  return {
    ...state,
    inp: {
      ...state.inp,
      friends: state.inp.friends.map((f: SCSFriendInput, order: number) =>
        order === action.payload.order ? action.payload.friend : f
      )
    }
  };
};

/**
 * 指定した行動順のキャラを消す
 * 行動順は詰める
 *
 * @param state RootState
 * @param action Payload(行動順)
 */
export const actionDeleteFriend = (
  state: SliceSCSInput,
  action: PayloadAction<number>
): SliceSCSInput => {
  if (state.inp.friends.length === 1) {
    // UI側でブロックするとは思うが、
    // 仲間の数が1匹の時は消せなくしておく。
    return state;
  }
  // friendsは削除するだけ
  let friends = [...state.inp.friends];
  friends.splice(action.payload, 1);
  // field.dataは削除して番号を詰める
  let fieldData = [...state.inp.field.data];
  fieldData.splice(fieldData.indexOf(action.payload + 10), 1, 0);
  for (let order = action.payload + 1; order < friends.length + 1; order++) {
    fieldData.splice(fieldData.indexOf(order + 10), 1, order + 9);
  }

  return {
    ...state,
    inp: {
      ...state.inp,
      friends,
      field: {
        ...state.inp.field,
        data: fieldData
      }
    }
  };
};

export const actionAddFriend = (
  state: SliceSCSInput,
  action: PayloadAction<SCSFriendInput>
): SliceSCSInput => {
  if (state.inp.friends.length === 10) {
    return state;
  }
  const field = state.inp.field;
  let fieldIndex = 0;
  for (let i = 0; i < field.col * field.row; i++) {
    const col = i % field.col;
    const row = Math.floor(i / field.col);
    if (col === 0 || col === field.col - 1 || row === 0 || row === field.row) {
      continue;
    }
    if (field.data[i] < 10) {
      fieldIndex = i;
      break;
    }
  }
  if (fieldIndex === 0) return state;

  const data = field.data.slice();
  data[fieldIndex] = state.inp.friends.length + 10;
  const friends = [...state.inp.friends];
  friends.push(action.payload);

  return {
    ...state,
    inp: {
      ...state.inp,
      friends,
      field: {
        ...state.inp.field,
        data
      }
    }
  };
};

export const actionChangeOrder = (
  state: SliceSCSInput,
  action: PayloadAction<DropResult>
) => {
  const { removedIndex, addedIndex } = action.payload;
  if (removedIndex && addedIndex) {
    console.log(removedIndex, addedIndex);
    if (removedIndex === addedIndex) return state;

    const friends = arrayMove(state.inp.friends, removedIndex, addedIndex);
    const data = state.inp.field.data.slice();

    const indexs = [...Array(state.inp.friends.length).keys()].map(order => {
      return data.indexOf(order + 10);
    });
    if (removedIndex < addedIndex) {
      data[indexs[removedIndex]] = addedIndex + 10;
      for (let i = removedIndex + 1; i <= addedIndex; i++) {
        data[indexs[i]] = i + 10 - 1;
      }
    } else {
      for (let i = addedIndex; i < removedIndex; i++) {
        data[indexs[i]] = i + 10 + 1;
      }
      data[indexs[removedIndex]] = addedIndex + 10;
    }

    return {
      ...state,
      inp: {
        ...state.inp,
        friends,
        field: {
          ...state.inp.field,
          data
        }
      }
    };
  }
  return state;
};
