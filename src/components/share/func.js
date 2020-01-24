
export const creatable_with_explosion = map => {
  for (let irow=0; irow < map.row; irow++) {
    for (let icol=0; icol < map.col; icol++) {
      if (icol === 0 || icol+1 === map.col || irow === 0 || irow+1 === map.row) {
        continue;
      }
      if (map.data[irow*map.col+icol] !== 1) {
        let nw = map.data[(irow-1)*map.col+(icol-1)] !== 1;
        let nn = map.data[(irow-1)*map.col+(icol+0)] !== 1;
        let ne = map.data[(irow-1)*map.col+(icol+1)] !== 1;
        let ww = map.data[(irow+0)*map.col+(icol-1)] !== 1;
        let ee = map.data[(irow+0)*map.col+(icol+1)] !== 1;
        let sw = map.data[(irow+1)*map.col+(icol-1)] !== 1;
        let ss = map.data[(irow+1)*map.col+(icol+0)] !== 1;
        let se = map.data[(irow+1)*map.col+(icol+1)] !== 1;
        if (!((ww && nw && nn) || (ee && ne && nn) || (ww && sw && ss) || (ee && se && ss))) {
          return false;
        }
      }
    }
  }
  return true;
};

export const sum = arr => arr.reduce( ( p, c ) => p + c + 0.0, 0 );
export const mean = arr => sum(arr)  / arr.length;
export const std = (arr) => {
  const m = mean(arr);
  return (sum(arr.map(a => (a-m)**2))/arr.length)**0.5;
};
export const std_bd = (count, total) => {
  return (count*(1-count*1.0/total))**0.5;
};

export const formatDate = (date, format) => {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
  return format;
};

