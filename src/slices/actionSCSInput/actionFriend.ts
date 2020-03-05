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
