import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state: number): number => {
      console.log("fuck");
      return state + 1;
    },
    decrement: state => state - 1,
    setCount: (state, action: PayloadAction<{ count: number }>) => {
      console.log(action.payload);
      console.log(action.payload.count);
      return action.payload.count;
    }
  }
});

export const { increment, decrement, setCount } = counterSlice.actions;
export default counterSlice;
