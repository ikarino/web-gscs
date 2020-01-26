import React, { useState, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { formatDate } from '../share/func';

const RecordLogs = () => {
  const firestore = useFirestore();
  const [recordLogs, setRecordLogs] = useState([]);

  useEffect(() => {
    console.log("loading recordlogs ...");
    firestore.collection("recordlogs")
    .orderBy("created_at", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      let datas = [];
      querySnapshot.forEach(doc => {
        datas.push(doc.data());
      });
      setRecordLogs(datas);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }, []);

  const recordLists = recordLogs.map(record => (
      <ListGroup.Item className="p-1 pl-3" key={record.recordid}>
        <span>{record.username}さんが投稿しました。</span><br />
        <span className="small text-muted">{formatDate(record.created_at.toDate(), 'yyyy/MM/dd HH:mm')}</span>
        <p>{record.comment ? record.comment : ""}</p>
        <p><NavLink to={'/record/'+record.recordid}>投稿を見る</NavLink></p>
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
