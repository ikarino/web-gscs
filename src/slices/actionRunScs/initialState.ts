import { SliceRunScs } from "../slice.interface";

export const initialState: SliceRunScs = {
  record: {
    scsInput: {
      friends: [],
      field: { col: 0, row: 0, data: [] },
      config: { trial: 0, turn: 0 }
    },
    scsOutput: {
      result: {
        finishState: {
          success: 0,
          killed: 0,
          genocided: 0
        },
        turnPassed: { mean: 0, std: 0 },
        countOfKilledFriends: []
      },
      exp: {
        total: { mean: 0, std: 0 },
        perMonster: { mean: [], std: [] }
      },
      loss: {
        action: { mean: [], std: [] },
        division: { mean: [], std: [] }
      }
    },
    webGscsExtra: {
      comment: "",
      createdAt: { seconds: 0, nanoseconds: 0 },
      userName: "",
      userId: "",
      allDoubleSpeed: false,
      allSingleSpeed: false,
      creatableWithExplosion: false,
      lvKinoko: 0,
      lvKiton: 0,
      numHoimiSlime: 0,
      numKillerMachine: 0,
      withKinoko: false,
      withKiton: false
    }
  },
  progress: 0,
  isRunning: false,
  outputs: []
};
