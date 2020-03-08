import {
  configureStore,
  combineReducers,
  Action,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
// import undoable from "redux-undo";
import { ThunkAction } from "redux-thunk";

import { firebaseReducer, actionTypes } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import counterSlice from "./slices/counterSlice";
import scsInputSlice from "./slices/scsInputSlice";
import runScsSlice from "./slices/runScsSlice";

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  // scsInput: undoable(scsInputSlice.reducer, { limit: 10 }),
  scsInput: scsInputSlice.reducer,
  runScs: runScsSlice.reducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const store = configureStore({
  reducer: rootReducer,
  // DISABLE WARNING: A non-serializable value was detected in an action
  // https://github.com/prescottprue/react-redux-firebase/issues/761
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [actionTypes.LOGIN]
    }
  })
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
