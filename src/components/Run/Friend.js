import React from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';

import FriendTable from '../share/FriendTable';

const Friend = () => {
  const friends = useSelector(state => state.runSCS.inp.friends);
  return (
    <Card className="m-2">
      <Card.Header>Friends</Card.Header>
      <Card.Body className="m-0 p-1">
        <FriendTable friends={friends} fixed={false}/>
      </Card.Body>
    </Card>
  );
};


export default Friend;
