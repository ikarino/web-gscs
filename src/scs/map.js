export class Map {
  constructor({col, row, data}) {
    console.assert(data.length === col*row, "fucking data length !");
    console.assert(data.filter(
      d => ![0, 1, 9, ...[...Array(10)].map((_, i) => i+10)].includes(d)
    ).length === 0, "invalid number in data !");
    
    this.col = col;
    this.row = row;

    this.data = [];
    for (let irow = 0; irow < row; irow++) {
      this.data.push(data.slice(
        irow*col,
        (irow+1)*col
      ));
    }
  }

  setMap(place, number) {
    this.data[place[0]][place[1]] = number;
  }

  getMap(place) {
    return this.data[place[0]][place[1]];
  }

  /**
   * 攻撃対象または移動先の空白の配列を返す
   * @param {Number[]} place 始点
   * @param {Boolean} findEmpty 攻撃対象ではなく空白を探す
   * @param {Boolean} includeKado 角抜け位置を対象とするかどうか
   * @returns {Number[]} 
   */
  findTargets(place, findEmpty=false, includeKado=false) {
    const myNumber = this.getMap(place);
    const rowMe = place[0];
    const colMe = place[1];
    
    const isTarget = findEmpty ? (
      (number) => (number === 0)
    ) : myNumber >= 20 ? (
      (number) => [...Array(10)].map((_, i) => i+10).includes(number)
    ) : (
      (number) => (number >= 20)
    );

    let targets = [];
    for (let drow of [-1, 0, 1]) {
      for (let dcol of [-1, 0, 1]) {
        const place = [rowMe+drow, colMe+dcol];
        const number = this.getMap(place);
        if (! isTarget(number)) { continue; }       // not target
        if (drow === 0 && dcol === 0) { continue; } // myself

        // 上下左右は無条件で追加
        if (dcol*drow === 0) {
          if (findEmpty) {
            targets.push(place);
          } else {
            targets.push(number);
          }
          continue;
        }

        // 斜めは壁によって角抜けになっているかで場合分け
        const numberUD = this.data[rowMe+drow][colMe];
        const numberLR = this.data[rowMe][colMe+dcol];
        const isPlaceKado = (numberUD === 1 || numberLR === 1);
        if (!isPlaceKado || includeKado) {
          if (findEmpty) { 
            targets.push(place); 
          } else { 
            targets.push(number);
          }
        }
      }
    }
    return targets;
  }

  show() {
    let string = "";
    for (const row of this.data) {
      for (const mass of row) {
        if (mass === 0) { string += " "; }
        else if (mass === 1) { string += "#"; }
        else if (mass < 20) { string += (mass-10).toString(10); }
        else { string += "*"; }
      }
      string += "\n";
    }
    console.log(string);
  }

}
