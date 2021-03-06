import React from 'react';
import { useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import { mean } from '../../share/func';
import { getLvByDexp } from '../../../scs/status';

const Styles = styled.div`
`;


const ResultDetailModal = (props) => {
  const { post_inp, outputs } = useSelector(state => state.runSCS);

  const trs = outputs && post_inp? (
    post_inp.friends.map((f, i) => {
      const exp_per_turn = mean(outputs.map(output => output.exp.per_monster_per_turn[i]));
      const exp_all = mean(outputs.map(output => output.exp.per_monster[i]));
      const lossAction = mean(outputs.map(o => o.loss.action[i]))*100;
      const lossDivision = mean(outputs.map(o => o.loss.division[i]));
      const dead_count = outputs.filter(output => output.friend_order_killed === i).length;
      return (
        <tr key={i}>
          <td className="text-center">{i}</td>
          <td className="text-center">{f.name}</td>
          <td className="text-right">{exp_per_turn.toFixed(1)}</td>
          <td className="text-right">{exp_all.toFixed(0)}</td>
          <td className="text-center">{f.lv}</td>
          <td className="text-center">{getLvByDexp(f.name, f.lv, exp_all)}</td>
          <td className="text-center">{dead_count}</td>
          <td className="text-center">{lossAction.toFixed(1)}</td>
          <td className="text-center">{lossDivision.toFixed(2)}</td>
        </tr>
      );
    })
  ) : null;
  
  return (
    <Styles>
      <Modal show={props.detailShow} onHide={props.handleDetailClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>計算結果詳細</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Container>
              <Table className="result-table" size="sm">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">種類</th>
                    <th className="text-center">ターン<br />経験値</th>
                    <th className="text-center">全経験値</th>
                    <th className="text-center">開始<br />Lv</th>
                    <th className="text-center">終了<br />Lv</th>
                    <th className="text-center">死亡<br />回数</th>
                    <th className="text-center">待機率<br />[%]</th>
                    <th className="text-center">分裂<br />ロス</th>
                  </tr>
                </thead>
                <tbody>
                  {trs}
                </tbody>
              </Table>
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleDetailClose}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </Styles>
  );
};

export default ResultDetailModal;
