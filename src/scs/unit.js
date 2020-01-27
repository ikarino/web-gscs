//
// unit.js
//
import { getStatus, getExpByLv } from "./status";

export class Unit {
  constructor (name, lv, place, pconf) {
    const status = getStatus(name, lv);

    this.name = name;                 // 種族名
    this.lv = lv;                     // レベル
    this.mhp = status.mhp0;           // 最大HP
    this.chp = status.mhp0;           // 現在HP
    this.atk = status.atk0;           // 弱化前攻撃力
    this.def = status.def0;           // 弱化前防御力
    this.recovery = status.recovery;  // 回復定数
    this.place = place;               // 位置座標[row, col]
    this.exp = status.exp;            // 現在の経験値
    this.p_attack = pconf.p_attack;  // 確率設定
  }

  attack(enemy) {
    // 攻撃力0なら攻撃しない
    if (this.atk === 0) {
      return false; 
    }

    // ダメージ計算
    if (Math.random() < this.p_attack) {
      const damage = Math.ceil(this.atk) * 1.3 * Math.pow(35/36, enemy.def) * (112 + Math.floor(Math.random()*32))/128;
      if (Math.round(damage) < 1.0) {
        enemy.chp -= 1.0;
      } else {
        enemy.chp -= Math.round(damage);
      }
      return true;
    } else {
      return false;
    }
  }

  setAtk() {
    // this.weaken_atkを元に攻撃力をセット
    this.atk = getStatus(this.name, this.lv).atk0 * 0.5**this.weaken_atk;
    if (this.weaken_atk === 9) {
      this.atk = 0;
    }
  }

  setDef() {
    // this.weaken_defを元に防御力をセット
    this.def = getStatus(this.name, this.lv).def0;
    if (this.weaken_def === 1) {
      this.def *= 0.8;
    } else if (this.weaken_def === 2) {
      this.def *= 0.7;
    } else if (this.weaken_def === 3) {
      this.def *= 0.5;
    } else if (this.weaken_def === 4) {
      this.def *= 0.4;
    } else if (this.weaken_def === 5) {
      this.def *= 0.2;
    } else if (this.weaken_def === 6) {
      this.def *= 0.001;
    }
  }
}

export class Friend extends Unit {
  constructor(name, lv, place, sealed, double_speed, weaken_atk, weaken_def, hp_dope, pconf) {
    super(name, lv, place, pconf);
    this.sealed = sealed;             // 封印状態
    this.double_speed = double_speed; // 倍速状態
    this.weaken_atk = weaken_atk;     // 攻撃力弱化回数
    this.weaken_def = weaken_def;     // 防御力弱化回数
    this.hp_dope = hp_dope;
    this.mhp += hp_dope;              // HPドーピングを反映
    this.killCount = 0;               // 倒した数
    this.divisionLossCount = 0;       // 攻撃した際に分裂させるスペースが無かった回数
    this.actionLossCount = 0;         // 攻撃対象が無く、無駄にターンを消費した回数

    if (weaken_atk !== 0) { this.setAtk(); }
    if (weaken_def !== 0) { this.setDef(); }
  }

  getExp(exp=22) {
    this.killCount += 1;
    this.exp += exp;
    // TODO 経験値22でレベルが2つ以上上がった場合
    // レベルアップした場合
    if (getExpByLv(this.name, this.lv +1) < this.exp) {
      const status0 = getStatus(this.name, this.lv);
      const status1 = getStatus(this.name, this.lv+1);
      this.lv += 1;
      this.mhp = status1.mhp0 + this.hp_dope;
      this.chp += status1.mhp0 - status0.mhp0;
      this.setAtk();
      this.setDef();
    }
  }

  naturalRecovery() {
    this.chp += this.mhp / this.recovery;
    if (this.chp > this.mhp) { this.chp = this.mhp; }
  }
}

export class Enemy extends Unit {
  constructor(place, number, pconf, name="スモールグール", lv=1) {
    super(name, lv, place, pconf);
    this.sealed = false;              // 封印状態
    this.weaken_atk = 0;              // 攻撃力弱化回数
    this.weaken_def = 0;              // 防御力弱化回数
    this.number = number;             // 番号
  }
}
