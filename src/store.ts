import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import counterSlice from "./slices/counterSlice";
import scsInputSlice from "./slices/scsInputSlice";
import runScsSlice from "./slices/runScsSlice";

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  scsInput: scsInputSlice.reducer,
  runScs: runScsSlice.reducer
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
