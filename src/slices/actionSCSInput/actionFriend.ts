import { PayloadAction } from "@reduxjs/toolkit";

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
      friends: state.inp.friends.map((f, order) =>
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
  console.log(friends);
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
  return {
    ...state,
    inp: {
      ...state.inp
      // friends:
    }
  };
};
