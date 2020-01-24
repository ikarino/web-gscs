import React from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



const RecordLogs = () => {
  const records = useSelector(state  => state.recordLogs);
    
  const recordLists = records.map(record => (
    <ListGroup.Item className="p-1 pl-3" key={record.id}>
      <span>{record.user}さんが投稿しました。</span><br />
      <span className="small text-muted">{record.date}</span>
      <p>{record.id}</p>
    </ListGroup.Item>
  ));
  
  return (
    <Card className="m-2">
      <Card.Header>最近の投稿</Card.Header>
      <Card.Body className="p-2">
        <ListGroup>
          {recordLists}
        </ListGroup>          
      </Card.Body>
    </Card>
  );
};

export default RecordLogs;
