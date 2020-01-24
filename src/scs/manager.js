//
// manager.js
//

import { Friend, Enemy } from "./unit";
import { implemented } from "./status";

/**
 * 0～N-1のランダムな整数を返す。
 * @param {Integer} n 自然数N
 */
const randint = n => {
  return Math.floor(Math.random() * Math.floor(n));
};

const addPlace = (place1, place2) => {
  return [place1[0]+place2[0], place1[1]+place2[1]];
};

export class Manager {
  /**
   * scs本体のコンストラクタ。inpの例はsample_inputs.jsを参照。
   * @param {Object} inp 入力
   * @param {Object} pconf 確率入力
   */
  constructor(inp, pconf) {
    this.friends = [];
    this.enemys = [];
    this.config = inp.config;
    this.pconf = pconf;
    this.number = 0;

    // array => nested array
    // this.mapの中身
    // 0:     空き領域
    // 1:     壁
    // 9:     Enemy -> 後で20以降に連番で振る
    // 10-19: Friend
    this.map = [];
    for (let irow = 0; irow < inp.map.row; irow++) {
      this.map.push(inp.map.data.slice(
        irow*inp.map.col,
        (irow+1)*inp.map.col
      ));
    }

    // Friendの読み込み
     for (const [order, friend] of inp.friends.entries()) {
      // placeを探す
      const mapIndex = inp.map.data.findIndex(m => m === order+10);
      const place = [Math.floor(mapIndex/inp.map.col), mapIndex%inp.map.col];
      this.friends.push(new Friend(
        friend.name,
        friend.lv,
        place,
        friend.sealed,
        friend.double_speed,
        friend.weaken_atk,
        friend.weaken_def,
        friend.hp_dope,
        this.pconf
      ));
    }

    // Enemyの読み込み
    const enemyMapIndex = inp.map.data.reduce((accumulator, currentValue, index) => {
      if (currentValue === 9) {
          accumulator.push(index);
      }
      return accumulator;
    }, [])
    for (const mapIndex of enemyMapIndex) {
      const place = [Math.floor(mapIndex/inp.map.col), mapIndex%inp.map.col]
      this.enemys.push(new Enemy(place, this.number, this.pconf));
      this.setMap(place, this.number+20);
      this.number += 1;
    }
  }

  // --------------------------------------------------------------------
  /**
   * 引数Unitの周囲の攻撃可能な敵or移動可能な空白マスに関する配列を返す
   * @param {Unit} me 対象のキャラクター
   * @param {Boolean} kado true/false=角抜けあり/角抜けなし
   * @param {Boolean} empty true/false=敵/空白マス
   * @return {Array[Number]} targets 周囲の敵リスト(Friendの場合は行動順, Enemyの場合はnumber), emptyの場合は空白マスplaceリスト
   */
  findTargets(me, kado=false, empty=false) {
    const rowMe = me.place[0];
    const colMe = me.place[1];

    /**
     * FriendにとってのEnemyなのか、またはEnemyにとってのFriendなのかを返す。
     * 空白マスを探している場合は空白かそれ以外かを返す。
     * @param {Number} number this.mapの値
     * @returns {Boolean} 
     */
    const isTarget = (number) => {
      if (empty) {
        return number === 0;
      }
      if (this.getMap(me.place) >= 20) {
        return (10 <= number && number <= 19);
      } else {
        return number >= 20;
      }
    };

    let targets = [];
    for (let drow of [-1, 0, 1]) {
      for (let dcol of [-1, 0, 1]) {
        const place = [rowMe+drow, colMe+dcol];
        const number = this.getMap(place);
        if (! isTarget(number)) { continue; }       // not target
        if (drow === 0 && dcol === 0) { continue; } // myself

        // 上下左右は無条件で追加
        if (dcol*drow === 0) {
          if (empty) {
            targets.push(place);
          } else {
            targets.push(number);
          }
          continue;
        }

        // 斜めは壁によって角抜けになっているかで場合分け
        const numberUD = this.map[rowMe+drow][colMe];
        const numberLR = this.map[rowMe][colMe+dcol];
        const isPlaceKado = (numberUD === 1 || numberLR === 1);
        if (!isPlaceKado || kado) {
          if (empty) { 
            targets.push(place); 
          } else { 
            targets.push(number);
          }
        }
      }
    }
    return targets;

  }

  /**
   * sumoの周囲に分裂方向を考慮して分裂させる
   * kompota君の成果(https://twitter.com/neko3mpota/status/970271526703349760/photo/1)
   * @param {Unit} sumo 攻撃されたスモグル（敵味方問わず）
   */
  divide(sumo) {
    const dplaceList = [
      [-1, 0],  // 0: 上
      [-1, -1], // 1: 左上
      [0, -1],  // 2: 左
      [1, -1],  // 3: 左下
      [1, 0],   // 4: 下
      [1, 1],   // 5: 右下
      [0, 1],   // 6: 右
      [-1, 1]   // 7: 右上
    ];
    
    const initialIndex = randint(4)*2;  // 0, 2, 4, 6 = 上, 左, 下, 右
    for(let relativeIndex = 0; relativeIndex < 8; relativeIndex++ ) {
      let index = relativeIndex + initialIndex;
      index = index > 7 ? index - 8 : index;

      const place = addPlace(sumo.place, dplaceList[index]);
      if (this.getMap(place) === 0) {
        this.addEnemy(place);
        return;
      }
    }
  };

  setMap(place, number) {
    this.map[place[0]][place[1]] = number;
  }

  getMap(place) {
    return this.map[place[0]][place[1]];
  }

  getEnemyByNumber(number) {
    for (const enemy of this.enemys) {
      if (enemy.number === number) {
        return enemy;
      }
    }
    console.assert(false, `wrong enemy number: ${number}`);
    return null;
  };

  addEnemy(place) {
    console.assert(
      this.getMap(place) === 0, 
      `enemy was added to invalid place${place}`);
    if (Math.random() < this.pconf.p_divide) {
      this.enemys.push(new Enemy(place, this.number, this.pconf));
      this.setMap(place, this.number+20);
      this.number += 1;
    }
  }

  // --------------------------------------------------------------------
  /*
   *  trial
   *   └── turn
   *        ├── turnEnemy
   *        └── turnFriend
   */
  trial() {
    this.turn_now = 0;
    for (let turn = 0; turn < this.config.turn; turn++) {
      // 1ターン経過
      this.turn();
      // 仲間が倒れていないかチェック
      for (const friend of this.friends) {
        if (friend.chp < 0) {
          return;
        }
      }
      // スモールグールが消えていないかチェック
      if (this.enemys.length === 0) { return; }

      this.turn_now += 1;
    }
  }

  turn() {
    this.turnEnemy();
    this.turnFriend();
  }

  turnEnemy() {
    // 敵の行動
    for (let enemy of this.enemys) {
      // 1. 攻撃を試みる
      const targets = this.findTargets(enemy);
      if (targets.length !== 0) {
        const target = targets[randint(targets.length)];
        console.assert(10 <= target && target <= 19, `wrong target ${target}`);
        const friend = this.friends[target-10]
        const result = enemy.attack(friend);

        // 対象がスモールグールだった場合は分裂処理
        if (friend.name === "スモールグール" && ! friend.sealed && result) {
          this.divide(this.friends[target-10]);
        }
        continue; // 攻撃したら終了
      }

      // 2. 移動を試みる
      const emptyPlaces = this.findTargets(enemy, false, true);
      if (emptyPlaces.length !== 0) {
        const place = emptyPlaces[randint(emptyPlaces.length)];
        this.setMap(enemy.place, 0);
        this.setMap(place, enemy.number+20);
        enemy.place = place;
      }

    }
  }

  turnFriend() {
    // 仲間の行動
    for (const speed of [true, false]) {
      for (let friend of this.friends) {
        if (speed || friend.double_speed) {
          this.actionFriend(friend);
          friend.naturalRecovery();
        }
      }
    }
  }

  actionFriend(f) {
    if (implemented.indexOf(f.name) === -1 || f.sealed) {
      this.actionNormal(f);
    } else if (f.name === "キラーマシン") {
      this.actionKillerMachine(f);
    } else if (f.name === "ホイミスライム") {
      this.actionHoimiSlime(f);
    } else if (f.name === "おばけキノコ") {
      this.actionObakeKinoko(f);
    } else {
      throw new Error(`action implemented but not used: ${f.name}`)
    }
  }

  /**
   * 単純な殴り攻撃の実装
   * @param {Friend} friend 攻撃するFriend
   * @param {Enemy} enemy 攻撃されるスモグル
   * @returns {string} 攻撃の終了判定, killed/survived/missed
   */
  attack(friend, enemy) {
    const result = friend.attack(enemy);

    if (enemy.chp <= 0) {
      // 攻撃後に倒れた場合
      friend.getExp();
      this.setMap(enemy.place, 0);
      this.enemys = this.enemys.filter(e => e !== enemy);
      return "killed";
    } else if (result) {
      // 攻撃後に生き残った場合（分裂処理）
      this.divide(enemy);
      return "survived";
    }
    return "missed";
  }

  actionNormal(f) {
    const targets = this.findTargets(f);
    if (targets.length !== 0) {
      const target = targets[randint(targets.length)];
      const enemy = this.getEnemyByNumber(target - 20);
      this.attack(f, enemy);
    }
  }

  /**
   * おばけキノコの行動
   * @param {Friend} f おばけキノコ
   */
  actionObakeKinoko(f) {
    const targets = this.findTargets(f);
    if (targets.length !== 0) {
      // 対象を決定するところまでは同じ
      const target = targets[randint(targets.length)];
      const enemy = this.getEnemyByNumber(target - 20);

      // 特技を使う場合
      if (Math.random() < this.pconf.p_kinoko ) {
        enemy.weaken_atk += 1;
        enemy.setAtk();
        return; // ここで抜ける
      }

      // 攻撃する場合
      this.attack(f, enemy);
    }
  }

  /**
   * キラーマシンの行動
   * @param {Friend} f キラーマシン
   */
  actionKillerMachine(f) {
    const targets = this.findTargets(f);
    if (targets.length !== 0) {
      const target = targets[randint(targets.length)];
      const enemy = this.getEnemyByNumber(target - 20);

      const result = this.attack(f, enemy); // 攻撃1回目
      if (result === "killed") return;      // 一回目で倒したら終了
      this.attack(f, enemy);                // 攻撃2回目
    }
  }

  /**
   * ホイミスライムの行動
   * 1. 周囲の傷ついたキャラの数を取得
   * 2. ホイミ発動を判断
   * 3. 攻撃可能なキャラの数を取得  <= ホイミと同じように攻撃可能なキャラごとに判定するモデルとする
   * 4. 攻撃を判断
   * @param {Friend} f ホイミスライム
   */
  actionHoimiSlime(f) {
    // 1.
    let hoimiTargets = [];
    for (let drow of [-1, 0, 1]) {
      for (let dcol of [-1, 0, 1]) {
        const place = addPlace(f.place, [drow, dcol]);
        const number = this.getMap(place);
        if (drow === 0 && dcol === 0) { continue; }  // me

        if (10 <= number && number <= 19) {          // friends
          let unit = this.friends[number-10];
          if (unit.chp < unit.mhp) { hoimiTargets.push(unit); }
        } else if (number >= 20) {                   // enemys
          let unit = this.getEnemyByNumber(number-20);
          if (unit.chp < unit.mhp) { hoimiTargets.push(unit); }
        }
      }
    }

    // 2.
    let execSkill = false;
    for (let t = 0; t < hoimiTargets.length; t++) {
      if (Math.random() < this.pconf.p_hoimi) {
        execSkill = true;
        break;
      }
    }
    if (execSkill) {
      for (let target of hoimiTargets) {
        target.chp += 25;
        if (target.chp > target.mhp) { target.chp = target.mhp; }
      }
      return;  // ホイミを発動した場合はここで抜ける
    }

    // 3.
    const attackTargets = this.findTargets(f);
    // 4.
    for (let enemyId of attackTargets) {
      if (Math.random() < this.pconf.p_hoimi_attack) {
        let enemy = this.getEnemyByNumber(enemyId - 20);
        this.attack(f, enemy);
        return;
      }
    }
  }

  // --------------------------------------------------------------------
  showMap() {
    let string = "";
    for (const row of this.map) {
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
  // --------------------------------------------------------------------
  toJson() {
    // exp/monster
    let exp_per_monster = [];
    let exp_per_monster_per_turn = [];
    for (const f of this.friends) {
      exp_per_monster.push(f.kill_count*22);
      exp_per_monster_per_turn.push(f.kill_count*22/this.config.turn);
    }

    // result
    let result = true;
    let reason = "";
    let friend_order_killed = -1;
    if (this.turn_now < this.config.turn) {
      result = false;
      if (this.enemys.length === 0) {
        reason = "enemys are genocided";
      } else {
        reason = "friends are killed";
        for (let order = 0; order < this.friends.length; order++) {
          if (this.friends[order].chp <= 0) {
            friend_order_killed = order;
            break;
          }
        }
      }
    }

    return {
      result: result,
      reason: reason,
      friend_order_killed: friend_order_killed,
      exp: {
        total: this.number*22,
        per_turn: this.number*22/this.turn_now,
        per_monster: exp_per_monster,                    // TODO
        per_monster_per_turn: exp_per_monster_per_turn,  // TODO
      },
      turn_passed: this.turn_now,
    };
  }
}
