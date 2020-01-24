import React from 'react';
import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { InputTags, OutputTags } from '../share/Tags';

import MapContainer from '../share/MapContainer';
import { formatDate } from '../share/func';


const RecordCard = ({docid, record}) => {
  const comment = record.comment !== "" ? (
    <div className="border border-black bg-light small">
      {record.comment}
    </div>
  ) : null;
  return (
    <Card>
      <Card.Header>{record.username}さんの投稿 <br />@{formatDate(record.created_at.toDate(), 'yyyy/MM/dd HH:mm')}</Card.Header>
      {/* <Card.Header>{record.username}さんの投稿 @</Card.Header> */}
      <Card.Body>
        <MapContainer map={record.inp.map} fixed={true} />
        <Container className="pt-2">
          <InputTags map={record.inp.map} friends={record.inp.friends}/>
          <OutputTags record={record} className="mt-5" />
          {comment}
          <NavLink to={'/record/'+docid}>
            <Button variant="outline-primary" size="sm" className="mt-2">詳細</Button>
          </NavLink>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default RecordCard;
