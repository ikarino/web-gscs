import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Updates from './Updates';
import RecordLogs from './RecordLogs';

// updates
// record logs


export const Home = () => (
  <Container fluid>
    <Row>
      <Col xs={12} sm={12} lg={6} className="p-0 m-0">
        <RecordLogs />
      </Col>
      <Col xs={12} sm={12} lg={6} className="p-0 m-0">
        <Updates />
      </Col>
    </Row>
  </Container>
);
