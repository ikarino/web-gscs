import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const SignIn = () => {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);
  const history = useHistory();

  const loginWithGoogle = () => {
    return firebase.login({
      provider: 'google',
      type: 'redirect'
    });
  };
  const loginWithTwitter = () => {
    return firebase.login({
      provider: 'twitter',
      type: 'redirect'
    });
  };

  // DOM描画前にログイン状態ならばRedirect
  // Life cylcle method
  // - class component: componentWillMout
  // - function component: useEffect
  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      history.push('/');
    }
  });
  
  let content = isLoaded(auth) ? (
    <Card.Body>
      <button className="btn-lg btn-block" onClick={loginWithGoogle}><i className="fab fa-google  mr-2"></i> Googleログイン</button>
      <button className="btn-lg btn-block" onClick={loginWithTwitter}><i className="fab fa-twitter mr-2"></i> Twitterログイン</button>
    </Card.Body>
  ) : (
    <div className="mx-auto p-1">ログイン状態を確認中です。</div>
  );
  
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={6}>
          <Card className="my-5">
            <Card.Header className="text-center">
              <h3>ログイン</h3>
            </Card.Header>
            {content}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
