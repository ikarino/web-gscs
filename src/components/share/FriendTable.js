import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

import runSCSModule from '../../modules/runSCSModule';

const Styles = styled.div`
  th{
    text-align: center;
  }
  .mycenter {
    text-align: center;
  }
`;

const FriendTrWithModal = ({f, index, fixed}) => {
  const dispatch = useDispatch();
  const speed = f.double_speed ? <span className="text-light bg-primary">倍</span> : null;
  const dope = f.hp_dope ? <span className="text-light bg-primary">HP+{f.hp_dope}</span> : null;
  const watk = f.weaken_atk ? <span className="text-light bg-danger">攻-{f.weaken_atk}</span> : null;
  const wdef = f.weaken_def ? <span className="text-light bg-danger">防-{f.weaken_def}</span> : null;
  const seal = f.sealed ? <span className="text-light bg-danger">封</span> : null;

  const [show, setShow] = useState(false);
  const handleOpen = fixed ? () => {} : () => setShow(true);
  const handleClose = () => setShow(false);

  const [fstate, setFstate] = useState(JSON.parse(JSON.stringify(f)));
  const handleCloseWithSave = (e) => {
    e.preventDefault();
    dispatch(runSCSModule.actions.changeFriend({
      id: index,
      friend: fstate,
    }));
    setShow(false);
  };
  const monsterNames = ["キラーマシン", "スモールグール", "ホイミスライム", "おばけキノコ", "きとうし"].map(monster => (
    <option key={monster}>{monster}</option>
  ));

  return (
    <React.Fragment>
      <tr onClick={handleOpen}>
        <td className="mycenter"><small>{index}</small></td>
        <td><small >{f.name}</small></td>
        <td className="mycenter"><small>{f.lv}</small></td>
        <td><small >{speed} {dope} {watk} {wdef} {seal}</small></td>
      </tr>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>No.{index} モンスター設定</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="form-config-name">
              <Form.Label>モンスターの種類</Form.Label>
              <Form.Control
                as="select"
                defaultValue={fstate.name}
                onChange={e => setFstate({...fstate, name: e.target.value})}
              >
                {monsterNames}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="form-config-lv">
              <Form.Label>Lv</Form.Label>
              <Form.Control
                type="number"
                defaultValue={fstate.lv}
                min={1}
                max={99}
                onChange={e => setFstate({...fstate, lv: Number(e.target.value) })}
              />
            </Form.Group>

            <Form.Group controlId="form-config-dope">
              <Form.Label>ドーピングHP</Form.Label>
              <Form.Control
                type="number"
                defaultValue={fstate.hp_dope}
                min={0}
                max={500}
                onChange={e => setFstate({...fstate, hp_dope: Number(e.target.value) })}
              />
              <Form.Text className="text-muted">
                最大HPではなく、命の草等で増加させたHPです。
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="form-config-weakenATK">
              <Form.Label>攻撃力弱化回数</Form.Label>
              <Form.Control
                type="number"
                defaultValue={fstate.weaken_atk}
                min={0} max={8}
                onChange={e => setFstate({...fstate, weaken_atk: Number(e.target.value) })}
              />
              <Form.Text className="text-muted">
                水や毒草で弱化した回数です。
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="form-config-weakenDEF">
              <Form.Label>防御力弱化回数</Form.Label>
              <Form.Control
                type="number"
                defaultValue={fstate.weaken_def}
                min={0}
                max={6}
                onChange={e => setFstate({...fstate, weaken_def: Number(e.target.value) })}
              />
              <Form.Text className="text-muted">
                防御力が弱化された回数です。装備外しの場合は2段階、ルカナンの場合は1段階です。
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="form-config-speed">
              <Form.Check
                type="checkbox"
                label="倍速"
                defaultChecked={fstate.double_speed}
                onChange={e => {setFstate({...fstate, double_speed: e.target.checked }); }}
              />
            </Form.Group>
            <Form.Group controlId="form-config-seal">
              <Form.Check
                type="checkbox"
                label="封印"
                defaultChecked={fstate.sealed}
                onChange={e => setFstate({...fstate, sealed: e.target.checked })}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            変更せずに閉じる
          </Button>
          <Button variant="primary" onClick={handleCloseWithSave}>
            保存して閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

const FriendTable = ({ friends, fixed }) => {
  const friendTrs = friends.map((f, i) => {
    return (
      <React.Fragment key={i}>
        <FriendTrWithModal f={f} index={i} fixed={fixed} />
      </React.Fragment>
    );
  });
  return (
    <Styles>
      <Table striped bordered hover size="sm" className="mb-0">
        <thead>
          <tr><th><small>ID</small></th><th><small>種類</small></th><th><small>LV</small></th><th><small>その他</small></th></tr>
        </thead>
        <tbody>
          {friendTrs}
        </tbody>
      </Table>
    </Styles>
  );
};


export default FriendTable;
