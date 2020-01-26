import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import runSCSModule from './modules/runSCSModule';
import updatesModule from './modules/updatesModule';
import recordsModule from './modules/recordsModule';


const reducer = combineReducers({
  runSCS: runSCSModule.reducer,
  updates: updatesModule.reducer,
  records: recordsModule.reducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const store = configureStore({
  reducer,
  // https://github.com/prescottprue/react-redux-firebase/issues/761
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),

});

export default store;
