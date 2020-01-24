import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Map from './Map';
import Config from './Config';
import Result from './Result/Result';
import Friend from './Friend';

export const Run = () => (
  <Container>
    <Row>
      <Col lg={4} sm={12} xs={12}><Map /></Col>
      <Col lg={4} sm={12} xs={12}><Friend /></Col>
      <Col lg={4} sm={12} xs={12}><Config /></Col>
      <Col lg={4} sm={12} xs={12}><Result /></Col>
    </Row>
    {/* <Friend /> */}
  </Container>
);
