import React from 'react';
// import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

import Nav from 'react-bootstrap/Nav';

const SignedInLinks = () => {
  const firebase = useFirebase();
  // const photo = useSelector(state => state.firebase.auth.photoURL);
  return (

    <Nav.Item className="pl-4" onClick={ () => { firebase.logout(); } }>Log out</Nav.Item>
  );
};

export default SignedInLinks;
