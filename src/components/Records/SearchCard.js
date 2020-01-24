import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import recordsModule from '../../modules/recordsModule';



const SearchCard = () => {
  const c = useSelector(state => state.records);
  const dispatch = useDispatch();
  return (
    <Card>
      <Card.Header bg="primary">検索条件</Card.Header>
      <Card.Body>
        <Table striped bordered size="sm">
          <tbody>
            <tr>
              <td>並べ替え</td>
              <td>
                <Form.Control as="select" size="sm" onChange={(e) => dispatch(recordsModule.actions.setSortBy(e.target.value)) }>
                  <option value="exp_per_turn">経験値効率</option>
                  <option value="created_at">投稿日</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>キラーマ数</td>
              <td>
                <Form.Control as="select" size="sm" onChange={(e) => dispatch(recordsModule.actions.setNumKm(e.target.value)) }>
                  <option value={-1}>指定なし</option>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>ホイミン数</td>
              <td>
                <Form.Control as="select" size="sm" onChange={(e) => dispatch(recordsModule.actions.setNumHs(e.target.value)) }>
                  <option value={-1}>指定なし</option>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>キノコ</td>
              <td>
                <Form.Control as="select" size="sm" onChange={(e) => dispatch(recordsModule.actions.setKinoko(e.target.value)) } defaultValue={c.kinoko}>
                  <option value={0}>指定なし</option>
                  <option value={1}>無し</option>
                  <option value={2}>有り</option>
                  <option value={3}>育成</option>
                </Form.Control>
              </td>
            </tr>
            <tr><td>キートン</td>
              <td>
                <Form.Control as="select" size="sm" onChange={(e) => dispatch(recordsModule.actions.setKiton(e.target.value)) } defaultValue={c.kiton}>
                  <option value={0}>指定なし</option>
                  <option value={1}>無し</option>
                  <option value={2}>有り</option>
                  <option value={3}>育成</option>
                </Form.Control>
              </td>
            </tr>
            <tr><td>速度</td>
              <td>
                <Form.Control as="select" size="sm" onChange={(e) => dispatch(recordsModule.actions.setSpeed(e.target.value)) } defaultValue={c.speed}>
                  <option value={0}>指定なし</option>
                  <option value={1}>等速</option>
                  <option value={2}>倍速</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>爆指作成可</td>
              <td>
                <Form.Control as="select" size="sm" onChange={(e) => dispatch(recordsModule.actions.setExplosion(e.target.value)) } defaultValue={c.explosion}>
                  <option value={0}>指定なし</option>
                  <option value={1}>可能</option>
                  <option value={2}>不可能</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>自分の投稿</td>
              <td>
                <Form.Control as="select" size="sm" onChange={(e) => dispatch(recordsModule.actions.setMyPost(e.target.value)) } defaultValue={c.my_post}>
                  <option value={0}>指定なし</option>
                  <option value={1}>自分の投稿</option>
                  <option value={2}>他人の投稿</option>
                </Form.Control>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};


export default SearchCard;
