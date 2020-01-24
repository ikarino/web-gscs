import { createSlice } from '@reduxjs/toolkit';
import { sample_inputs } from '../scs/sample_inputs';
import run_scs from '../scs/run_scs';

const initialTemplate = '4キラーマ倍速';

const runSCSModule = createSlice({
  name: "runSCS",
  initialState : {
    template: initialTemplate,
    inp: sample_inputs[initialTemplate],
    activeIndex: null,
    outputs: null,
    running: false,
    progress: 0,
    post_inp: null
  },
  reducers: {
    addTemplate: (state, action) => {
      return {
        ...state,
        template: action.payload.recordid,
        inp: action.payload.inp
      };
    },
    changeTemplate: (state, action) => {
      return {
        ...state,
        template: action.payload,
        inp: sample_inputs[action.payload]
      };
    },
    mapMove: (state, action) => {
      const {row, col, data} = state.inp.map;
      let newdata = [];
      switch(action.payload) {
      case "up":
        for (let irow = 0; irow < row; irow++) {
          const index = row*1 + irow;
          if (data[index] > 9) {
            return state;
          }
        }
        newdata = new Array(row).fill(1);
        for (let icol = 2; icol < col; icol++) {
          let newrow = [];
          for (let irow = 0; irow < row; irow++) {
            const index = row*icol + irow;
            newrow.push(data[index]);
          }
          newdata = newdata.concat(newrow);
        }
        newdata = newdata.concat(new Array(col).fill(1));
        return {
          ...state,
          inp: {
            ...state.inp,
            map: {
              ...state.inp.map,
              data: newdata
            }
          }
        };
      case "down":
        for (let irow = 0; irow < row; irow++) {
          const index = row*(col-2) + irow;
          if (data[index] > 9) {
            return state;
          }
        }
        newdata = new Array(row).fill(1);
        for (let icol = 0; icol < col-2; icol++) {
          let newrow = [];
          for (let irow = 0; irow < row; irow++) {
            const index = row*icol + irow;
            newrow.push(data[index]);
          }
          newdata = newdata.concat(newrow);
        }
        newdata = newdata.concat(new Array(col).fill(1));
        return {
          ...state,
          inp: {
            ...state.inp,
            map: {
              ...state.inp.map,
              data: newdata
            }
          }
        };
      case "left":
        for (let icol = 0; icol < col; icol++) {
          const index = row*icol + 1;
          if (data[index] > 9) {
            return state;
          }
        }
        for (let icol = 0; icol < col; icol++) {
          for (let irow = 0; irow < row; irow++) {
            if(icol === 0) {
              newdata.push(1);
            } else if (icol === col-1) {
              newdata.push(1);
            } else {
              newdata.push(data[row*icol+irow+1]);
            }
          }
        }
        return {
          ...state,
          inp: {
            ...state.inp,
            map: {
              ...state.inp.map,
              data: newdata
            }
          }
        };
      case "right":
        for (let icol = 0; icol < col; icol++) {
          const index = row*icol + col-2;
          if (data[index] > 9) {
            return state;
          }
        }
        for (let icol = 0; icol < col; icol++) {
          for (let irow = 0; irow < row; irow++) {
            if(icol === 0) {
              newdata.push(1);
            } else if (icol === col-1) {
              newdata.push(1);
            } else {
              newdata.push(data[row*icol+irow-1]);
            }
          }
        }
        return {
          ...state,
          inp: {
            ...state.inp,
            map: {
              ...state.inp.map,
              data: newdata
            }
          }
        };
      default:
        return state;
      }
    },
    changeMapSize: (state, action) => {
      const size_diff = action.payload;
      const {row, col, data} = state.inp.map;

      if (size_diff === -1) {
        // 小さくできるかチェック
        for (let icol = 1; icol < col-1; icol++) {
          const index = row*(col-2) + icol;
          if (data[index] > 9) {
            return state;
          }
        }
        for (let irow = 1; irow < row-1; irow++) {
          const index = irow*row + col - 2;
          if (data[index] > 9) {
            return state;
          }
        }

        // 小さくする
        let newdata = [];
        for(let icol = 0; icol < col-1; icol++) {
          for(let irow = 0; irow < row-1; irow++) {
            if (icol === col-2 || irow === row-2) {
              newdata.push(1);
            } else {
              newdata.push(data[icol*row+irow]);
            }
          }
        }

        return {
          ...state,
          inp: {
            ...state.inp,
            map: {
              col: col-1,
              row: row-1,
              data: newdata
            }
          }
        };
      } else {
        let newdata = [];
        for(let icol = 0; icol < col; icol++) {
          for(let irow = 0; irow < row; irow++) {
            newdata.push(data[icol*row+irow]);
          }
          newdata.push(1);
        }
        for(let irow = 0; irow < row+1; irow++) {
          newdata.push(1);
        }

        return {
          ...state,
          inp: {
            ...state.inp,
            map: {
              col: col+1,
              row: row+1,
              data: newdata
            }
          }
        };
      }
    },
    changeMap: (state, action) => {
      const index = action.payload;
      const {row, col, data} = state.inp.map;
      const idata = data[index];
      const icol = Math.floor(index/row);
      const irow = index%row;

      if (icol === 0 || irow === 0 || icol+1 === col || irow+1 === row) {
        return state;
      }
      let newdata = Array.from(data);

      if (state.activeIndex) {
        newdata[state.activeIndex] = idata;
        newdata[index] = state.inp.map.data[state.activeIndex];
        return {
          ...state,
          inp: {
            ...state.inp,
            map: {
              ...state.inp.map,
              data: newdata
            }
          },
          activeIndex: null,
        };
      }

      switch(idata) {
      case 0:
        newdata[index] = 1;
        break;
      case 1:
        newdata[index] = 9;
        break;
      case 9:
        newdata[index] = 0;
        break;
      default:
        return {
          ...state,
          activeIndex: index
        };
      }
      return {
        ...state,
        inp: {
          ...state.inp,
          map: {
            ...state.inp.map,
            data: newdata
          }
        },
      };
    },
    changeFriend(state, action) {
      const {id, friend} = action.payload;
      return {
        ...state,
        inp: {
          ...state.inp,
          friends: state.inp.friends.map(
            (f, i) => i === id ? friend : f
          )
        }
      };
    },
    setTurn(state, action) {
      return {
        ...state,
        inp: {
          ...state.inp,
          config: {
            ...state.inp.config,
            turn: action.payload
          }
        },
      };
    },
    setTrial(state, action) {
      return {
        ...state,
        inp: {
          ...state.inp,
          config: {
            ...state.inp.config,
            trial: action.payload
          }
        },
      };
    },
    scsFinish(state, action) {
      return {
        ...state,
        outputs: action.payload,
        running: false
      };
    },
    scsStart(state, action) {
      const { inp } = state;
      return {
        ...state,
        outputs: null,
        running: true,
        post_inp: inp
      };
    },
    setProgress(state, action) {
      return {
        ...state,
        progress: action.payload
      };
    }
  }
});

export default runSCSModule;

export function runSCSAsync(inp) {
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // const sleep = ms => new Promise(resolve => setTimeout(resolve(ms), ms));
  const sleep = (lim) => new Promise(resolve => {
    setTimeout(() => {
      let outputs = [];
      for(let trial=0; trial < lim; trial++) {
        outputs.push(run_scs(inp));
      }
      resolve(outputs);
    }, 10);
  });
  return async function(dispatch) {
    dispatch(runSCSModule.actions.setProgress(0));
    dispatch(runSCSModule.actions.scsStart());
    let outputs = [];
    for(let i=0; i < 10; i++) {
      outputs = outputs.concat(await sleep(inp.config.trial/10));
      dispatch(runSCSModule.actions.setProgress((i+1)*10));
    }
    dispatch(runSCSModule.actions.scsFinish(outputs));
  };

  // return async function(dispatch) {
  //   dispatch(runSCSModule.actions.setProgress(0));
  //   dispatch(runSCSModule.actions.scsStart());
  //   setTimeout(() => {
  //     const points = Array.from(new Array(10)).map((v, i) => (i+1)*inp.config.trial/10-1);
  //     let outputs = [];
  //     for(let trial=0; trial < inp.config.trial; trial++) {
  //       outputs.push(run_scs(inp));
  //       points.map((p, i) => {
  //         if(p === trial) {
  //           dispatch(runSCSModule.actions.setProgress((i+1)*10));
  //         }
  //       });
  //     }
  //     dispatch(runSCSModule.actions.scsFinish(outputs));
  //   }, 10);
  // };
};
