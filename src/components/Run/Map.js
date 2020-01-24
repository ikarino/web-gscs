import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import MapContainer from '../share/MapContainer';
import runSCSModule from '../../modules/runSCSModule';

const Map = () => {
  const dispatch = useDispatch();
  const { map } = useSelector(state => state.runSCS.inp);

  const handleOnClick = (diff) => {
    dispatch(runSCSModule.actions.changeMapSize(diff));
  };
  const handleMapMove = (direction) => {
    dispatch(runSCSModule.actions.mapMove(direction));
  };

  return (
    <Card className="m-2">
      <Card.Header>Map</Card.Header>
      <Card.Body className="m-0 p-1">
        <MapContainer map={map} />
        <Container className="d-flex flex-column">
          <ButtonGroup size="sm" className="p-1">
            <Button size="sm m-1" onClick={() => handleOnClick(-1) }><small><i className="fas fa-minus"></i></small></Button>
            <Button size="sm m-1" onClick={() => handleOnClick(+1) }><small><i className="fas fa-plus"></i></small></Button>
            <Button size="sm m-1" onClick={() => handleMapMove("left") }><small><i className="fas fa-arrow-left"></i></small></Button>
            <Button size="sm m-1" onClick={() => handleMapMove("right") }><small><i className="fas fa-arrow-right"></i></small></Button>
            <Button size="sm m-1" onClick={() => handleMapMove("up") }><small><i className="fas fa-arrow-up"></i></small></Button>
            <Button size="sm m-1" onClick={() => handleMapMove("down") }><small><i className="fas fa-arrow-down"></i></small></Button>
          </ButtonGroup>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Map;
