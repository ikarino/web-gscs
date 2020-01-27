import React from 'react';
import Table from 'react-bootstrap/Table';
import { mean, std, std_bd } from './func';



const ResultTable = ({ outputs, post_inp }) => {
  const mean_exp_per_turn = outputs ? mean(outputs.map(output => output.exp.per_turn)) : 0;
  const std_exp_per_turn = outputs ? std(outputs.map(output => output.exp.per_turn)) : 0;
  const mean_turn_passed = outputs ? mean(outputs.map(output => output.turn_passed))/post_inp.config.turn*100 : 0;
  const std_turn_passed = outputs ? std(outputs.map(output => output.turn_passed))/post_inp.config.turn*100 : 0;
  const mean_stopped_by_friend_kill = outputs ? outputs.filter(o => o.reason === "friends are killed").length*100.0/post_inp.config.trial : 0;
  const std_stopped_by_friend_kill = outputs ? std_bd(outputs.filter(o => o.reason === "friends are killed").length, post_inp.config.trial) : 0;
  const mean_stopped_by_enemy_genocide = outputs ? outputs.filter(o => o.reason === "enemys are genocided").length*100.0/post_inp.config.trial : 0;
  const std_stopped_by_enemy_genocide = outputs ? std_bd(outputs.filter(o => o.reason === "enemys are genocided").length, post_inp.config.trial) : 0;
  const mean_loss_action = outputs ? mean(outputs.map(o => mean(o.loss.action)))*100 : 0;
  const std_loss_action = outputs ? std(outputs.map(o => mean(o.loss.action)))*100 : 0;
  return (
    <Table striped bordered hover size="sm" className="mb-3 result-table">
      <thead>
        <tr>
          <td></td>
          <td>平均</td>
          <td>偏差</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ターン経験値</td>
          <td>{mean_exp_per_turn.toFixed(1)}</td>
          <td>{std_exp_per_turn.toFixed(1)}</td>
        </tr>
        <tr>
          <td>ターン経過率</td>
          <td>{mean_turn_passed.toFixed(1)+"%"}</td>
          <td>{std_turn_passed.toFixed(1)+"%"}</td>
        </tr>
        <tr>
          <td>仲間死亡率</td>
          <td>{mean_stopped_by_friend_kill.toFixed(1)+"%"}</td>
          <td>{std_stopped_by_friend_kill.toFixed(1)+"%"}</td>
        </tr>
        <tr>
          <td>敵スモ消滅率</td>
          <td>{mean_stopped_by_enemy_genocide.toFixed(1)+"%"}</td>
          <td>{std_stopped_by_enemy_genocide.toFixed(1)+"%"}</td>
        </tr>
        <tr>
          <td>待機率</td>
          <td>{mean_loss_action.toFixed(1)+"%"}</td>
          <td>{std_loss_action.toFixed(1)+"%"}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ResultTable;
