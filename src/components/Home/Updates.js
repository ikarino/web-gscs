import React from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Updates = () => {
  const updates = useSelector(state => state.updates);

  const updateLists = updates.map(update => (
    <ListGroup.Item className="p-1 pl-3" key={update.id}>
      <span>{update.text}</span><br />
      <span className="small text-muted">{update.date}</span>
    </ListGroup.Item>
  ));


  return (
    <React.Fragment>
      <Card className="m-2">
        <Card.Header>SCS更新情報</Card.Header>
        <Card.Body className="p-2">
          <ListGroup>
            {updateLists}
          </ListGroup>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Updates;
