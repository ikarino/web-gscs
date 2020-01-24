import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import ResultDetailModal from './ResultDetailModal';
import ResultPostModal from './ResultPostModal';
import ResultTable from '../../share/ResultTable';
import { InputTags } from '../../share/Tags';

const Result = () => {
  const { inp, post_inp, outputs } = useSelector(state => state.runSCS);
  const auth = useSelector(state => state.firebase.auth);

  // detail modal
  const [detailShow, setDetailShow] = useState(false);
  const handleDetailClose = () => setDetailShow(false);
  const handleDetailShow = () => setDetailShow(true);
  // postl modal
  const [postShow, setPostShow] = useState(false);
  const handlePostClose = () => setPostShow(false);
  const handlePostShow = () => setPostShow(true);

  const buttons = outputs ? (
    (isLoaded(auth) && !isEmpty(auth)) ? (
      <div className="p-0 m-0">
        <Button className="m-1" variant="outline-danger" onClick={handlePostShow}><i className="far fa-share-square"></i> 投稿</Button>
        <Button className="m-1" variant="outline-secondary" onClick={handleDetailShow}><i className="fas fa-info-circle"></i> 詳細</Button>
      </div>
    ) : (
      <div className="p-0 m-0">
        <Button className="m-1" variant="outline-danger" disabled><i className="far fa-share-square"></i> 投稿するにはログインして下さい</Button>
        <Button className="m-1" variant="outline-secondary" onClick={handleDetailShow}><i className="fas fa-info-circle"></i> 詳細</Button>
      </div>
    )
  ) : (
    <div className="p-0 m-0">
      <Button className="m-1" variant="outline-danger" disabled><i className="far fa-share-square"></i> 投稿</Button>
      <Button className="m-1" variant="outline-secondary" disabled><i className="fas fa-info-circle"></i> 詳細</Button>
    </div>
  );
  return (
    <Card className="m-2">
      <Card.Header>Result</Card.Header>
      <Card.Body className="m-0 p-3">
        <div className="p-0 m-0">
          <h6>タグ</h6>
          <InputTags map={inp.map} friends={inp.friends} />
          <h6 className="pt-2">計算結果</h6>
          <ResultTable outputs={outputs} post_inp={post_inp ? post_inp : null} />
        </div>
        { buttons }
        <ResultDetailModal detailShow={detailShow} handleDetailClose={handleDetailClose}/>
        <ResultPostModal postShow={postShow} handlePostClose={handlePostClose}/>
      </Card.Body>
    </Card>
  );
};


export default Result;
