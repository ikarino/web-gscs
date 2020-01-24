import { createSlice } from '@reduxjs/toolkit';


const recordsModule = createSlice({
  name: "records",
  initialState : {
    sort_by: 'exp_per_turn',
    numKm: -1,
    numHs: -1,
    kinoko: 0,
    kiton: 0,
    speed: 0,
    explosion: 0,
    my_post: 0,
  },
  reducers: {
    setSortBy: (state, action) => ({
      ...state,
      sort_by: action.payload
    }),
    setNumKm: (state, action) => ({
      ...state,
      numKm: Number(action.payload)
    }),
    setNumHs: (state, action) => ({
      ...state,
      numHs: Number(action.payload)
    }),
    setKinoko: (state, action) => ({
      ...state,
      kinoko: Number(action.payload)
    }),
    setKiton: (state, action) => ({
      ...state,
      kiton: Number(action.payload)
    }),
    setSpeed: (state, action) => ({
      ...state,
      speed: Number(action.payload),
    }),
    setExplosion: (state, action) => ({
      ...state,
      explosion: Number(action.payload)
    }),
    setMyPost: (state, action) => ({
      ...state,
      my_post: Number(action.payload)
    })
  }
});

export default recordsModule;
