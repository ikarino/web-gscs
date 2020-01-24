import React from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';


const Styles = styled.div`
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #f5f5f5;
  }
`;

export const Footer = () => (
  <Styles>
    <footer className="footer mt-auto py-1 text-center">
      <Container>
        <span className="small text-muted">Copyright © 2020 - ikarino99 All Right Reserved.</span>
      </Container>
    </footer>
  </Styles>  
)
