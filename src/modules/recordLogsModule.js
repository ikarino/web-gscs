import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
      user: "ikarino99",
      date: "2020.1.18 10:15",
      id: "basdfasdfasfa"
    },
    {
      user: "asfasd",
      date: "2020.1.18 10:13",
      id: "aasdsafdasfa"
    },
    {
      user: "fuckyou",
      date: "2020.1.18 10:11",
      id: "cassfdadfasfa"
    },
    {
      user: "ikarino99",
      date: "2020.1.18 10:09",
      id: "dasdfassafasfa"
    },
];


const recordLogsModule = createSlice({
  name: "recordLogs",
  initialState,
  reducer: {
    addRecorLog: (state, action) => {
      state.push(action.payload);
    }
  }
});

export default recordLogsModule;
