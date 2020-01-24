import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import { Line as ProgressLine } from 'rc-progress';

import { sample_inputs } from '../../scs/sample_inputs';
import runSCSModule, { runSCSAsync } from '../../modules/runSCSModule';

const Config = () => {
  // props and dispatch
  const inp = useSelector(state => state.runSCS.inp);
  const running = useSelector(state => state.runSCS.running);
  const template = useSelector(state => state.runSCS.template);
  const progress = useSelector(state => state.runSCS.progress);
  const dispatch = useDispatch();

  const handleChangeTemplate = (e) => {
    dispatch(runSCSModule.actions.changeTemplate(e.target.value));
  };
  const handleChangeTurn = (e) => {
    dispatch(runSCSModule.actions.setTurn(e.target.value));
  };
  const handleChangeTrial = (e) => {
    dispatch(runSCSModule.actions.setTrial(e.target.value));
  };
  const handleCalcButton = () => {
    dispatch(runSCSAsync(inp));
  };

  const button = running ? (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      {progress}%
    </Button>
  ) : (
    <Button variant="danger" onClick={handleCalcButton}><i className="fas fa-play-circle"></i> 計算開始</Button>
  );


  let templates = [];
  Object.keys(sample_inputs).forEach(name => {
    templates.push(<option key={name}>{name}</option>);
  });

  return (
    <Card className="m-2">
      <Card.Header>Config</Card.Header>
      <Card.Body className="m-0 p-3">
        <Form>
          <Form.Group controlId="form-config-turn">
            <Form.Label>ターン数</Form.Label>
            <Form.Control type="number" defaultValue={inp.config.turn} onChange={handleChangeTurn} />
            <Form.Text className="text-muted">
              一度の試行で計算するターン数です。
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="form-config-trials">
            <Form.Label>試行回数</Form.Label>
            <Form.Control as="select" defaultValue={inp.config.trial} onChange={handleChangeTrial}>
              <option key={100}>{100}</option>
              <option key={500}>{500}</option>
              <option key={1000}>{1000}</option>
            </Form.Control>
            <Form.Text className="text-muted">
              試行回数が多いほど誤差が小さくなります。
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="form-config-template">
            <Form.Label>テンプレート</Form.Label>
            <Form.Control as="select" defaultValue={template} onChange={handleChangeTemplate}>
              {templates}
            </Form.Control>
          </Form.Group>

        </Form>
        {button}
      </Card.Body>
    </Card>
  );
};


export default Config;
