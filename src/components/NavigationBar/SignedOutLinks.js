import React from 'react';
import { NavLink } from 'react-router-dom';

import { Nav } from 'react-bootstrap';

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <NavLink to="/signin">
        <Nav.Item className="pl-4">Sign in</Nav.Item>
      </NavLink>
    </React.Fragment>
  );
};

export default SignedOutLinks;
