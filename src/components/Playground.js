import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import Map from './Run/Map';
import Friend from './Run/Friend';

import { Manager } from "../scs/manager";

const PlaygroundCard = () => {
  const inp = useSelector(state => state.runSCS.inp);
  const Styles = styled.div`
    td {
      width: ${270/inp.map.col}px;
      height: ${270/inp.map.row}px;
      border: 1px #000000 solid;
      text-align: center;
      font-size: 10px;
    }
  `;
  
  const [conf, setConf] = useState({
    p_attack: 0.92,
    p_divide: 0.25,
    p_hoimi: 0.25,
    p_hoimi_attack: 0.3,
    p_kinoko: 0.1,
  });
  
  const [manager, setManager] = useState(new Manager(inp, conf));
  const [isEnemyTurn, setIsEnemyTurn] = useState(true);
  const [turn, setTurn] = useState(0);

  const copyManager = () => {
    const nm = new Manager(inp, conf);
    nm.friends = manager.friends;
    nm.enemys = manager.enemys;
    nm.map = manager.map;
    nm.number = manager.number;
    return nm;
  };

  // ---------------------------------------------------------
  const pass1Turn = () => {
    manager.turn();
    const nm = copyManager();
    setManager(nm);
    setTurn(turn+1);
  };
  
  const pass1EnemyTurn = () => {
    manager.turn_enemy();
    const nm = copyManager();
    setManager(nm);
    setIsEnemyTurn(false);
  };

  const pass1FriendTurn = () => {
    manager.turn_friend();
    const nm = copyManager();
    setManager(nm);
    setIsEnemyTurn(true);
    setTurn(turn+1);
  };

  const resetManager = () => {
    const nm = new Manager(inp, conf);
    setManager(nm);
    setTurn(0);
  };
  

  // ---------------------------------------------------------
  const hpTable = manager.map.map((row, irow) => {
    const tds = row.map((m, im) => {
      const key = `m${irow}-${im}`;
      if(m === 0) {
        return <td key={key} className="bg-white"></td>;
      } else if (m === 1) {
        return <td key={key} className="bg-dark"></td>;
      } else if (10 <= m && m < 20) {
        const hp = manager.friends[m-10].chp.toFixed(0);
        return <td key={key} className="bg-warning text-white">{hp}</td>;
      } else {
        const hp = manager.getEnemyByNumber(m-20).chp.toFixed(0);
        return <td key={key} className="bg-secondary text-white">{hp}</td>;
      }
    });
    return (
      <tr key={`row${irow}`}>{tds}</tr>
    );
  });

  // ---------------------------------------------------------
  const pass1TurnButton = isEnemyTurn ? (
    <Button size="sm" onClick={pass1Turn}>1ターン</Button>
  ) : (
    <Button size="sm" onClick={pass1Turn} disabled>1ターン</Button>
  );
  const pass1EnemyTurnButton = isEnemyTurn ? (
    <Button size="sm" onClick={pass1EnemyTurn}>敵ターン</Button>
  ) : (
    <Button size="sm" onClick={pass1EnemyTurn} disabled>敵ターン</Button>
  );
  const pass1FriendTurnButton = isEnemyTurn ? (
    <Button size="sm" onClick={pass1FriendTurn} disabled>味方ターン</Button>
  ) : (
    <Button size="sm" onClick={pass1FriendTurn}>味方ターン</Button>
  );

  return (
    <Styles>
      <Card className="m-2">
        <Card.Header>Playground</Card.Header>
        <Card.Body>
          <table className="mx-auto">
            <tbody>
              {hpTable}
            </tbody>
          </table>
          <Container>
            <Row>
              現在のターン: {turn}
            </Row>
            <Row>
              倒したスモグル: {manager.number}匹
            </Row>
            <Row className="mt-1">
              <div>{pass1TurnButton}</div>
            </Row>
            <Row className="mt-1">
              <div>{pass1EnemyTurnButton}{pass1FriendTurnButton}</div>
            </Row>
            <Row className="mt-1">
              <div>
                <Button size="sm" onClick={resetManager}>リセット</Button>
              </div>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Styles>
  );
};

const Playground = () => {
  return (
    <Container>
      <Row>
        <Col lg={4} sm={12} xs={12}><Map /></Col>
        <Col lg={4} sm={12} xs={12}><Friend /></Col>
        <Col lg={4} sm={12} xs={12}><PlaygroundCard /></Col>
      </Row>
    </Container>
  );
};

export default Playground;
