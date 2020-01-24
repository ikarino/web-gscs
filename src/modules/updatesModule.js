import { createSlice } from '@reduxjs/toolkit';


const updatesModule = createSlice({
  name: "updates",
  initialState : [
    {
      text: "おばけキノコの特技を実装しました。",
      date: "2020.1.20",
      id: "asdfaskdjfad;l"
    },
    {
      text: "運用を開始しました。",
      date: "2020.1.18",
      id: "fjdk;adaklsd"
    },
  ],
  reducers: {
    addUpdate: (state, action) => {
      state.push(action.payload);
    }
  }
});

export default updatesModule;
