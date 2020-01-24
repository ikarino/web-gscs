import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import styled from 'styled-components';

import { Nav, Navbar } from 'react-bootstrap';

import logoImage from '../../assets/logo.png';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  .navbar-brand, .navbar-nav, .nav-link, .nav-item {
    color: gray;
    &:hover {
      color: white;
    }
  }
  .active div, .active span {
    color: white;
  }
  .navbar-toggler-icon {
    color: white;
    background-color: gray;
  }
`;

const NavigationBar = (props) => {
  const auth = useSelector(state => state.firebase.auth);
  const links = isLoaded(auth) && !isEmpty(auth) ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <Styles>
      <Navbar collapseOnSelect expand="lg">
        <NavLink to="/">
          <Navbar.Brand>
            <img
              src={logoImage}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="scs-logo"
            />
            web-gscs
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/run">
              <Nav.Item className="pl-4">Run</Nav.Item>
            </NavLink>
            <NavLink to="/playground">
              <Nav.Item className="pl-4">Playground</Nav.Item>
            </NavLink>
            <NavLink to="/records">
              <Nav.Item className="pl-4">Records</Nav.Item>
            </NavLink>
            <NavLink to="/about">
              <Nav.Item className="pl-4">About</Nav.Item>
            </NavLink>
            {links}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles >
  );
};

export default NavigationBar;
