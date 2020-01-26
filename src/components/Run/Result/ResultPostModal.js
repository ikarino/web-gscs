import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { creatable_with_explosion, mean } from '../../share/func';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MapContainer from '../../share/MapContainer';
import FriendTable from '../../share/FriendTable';
import ResultTable from '../../share/ResultTable';
import { InputTags, OutputTags } from '../../share/Tags';


const ResultPostModal = (props) => {
  const [comment, setComment] = useState("俺のスモコン");
  const auth = useSelector(state => state.firebase.auth);
  const inp = useSelector(state => state.runSCS.post_inp);
  const friends = inp ? inp.friends : null;
  const outputs = useSelector(state => state.runSCS.outputs);
  const history = useHistory();

  const firebase = useFirebase();
  const firestore = useFirestore();

  const create_post = () => ({
    username: auth.displayName,
    userid: auth.uid,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
    inp: inp,
    comment,
    creatable_with_explosion: creatable_with_explosion(inp.map),
    with_kiton: Math.min(friends.filter(f => (f.name === "きとうし")).map(f => f.lv)) !== Infinity,
    lv_kiton: Math.min(friends.filter(f => (f.name === "きとうし")).map(f => f.lv)) === Infinity ? 0 : Math.min(friends.filter(f => (f.name === "きとうし")).map(f => f.lv)),
    with_kinoko: Math.min(friends.filter(f => (f.name === "おばけキノコ")).map(f => f.lv)) === Infinity,
    lv_kinoko: Math.min(friends.filter(f => (f.name === "おばけキノコ")).map(f => f.lv)) === Infinity ? 0 : Math.min(friends.filter(f => (f.name === "おばけキノコ")).map(f => f.lv)),
    all_double_speed: friends.filter(f => f.double_speed).length === friends.length,
    all_normal_speed: friends.filter(f => f.double_speed).length === 0,
    num_killer_machine: friends.filter(f => (f.name === "キラーマシン")).length,
    num_hoimi_slime: friends.filter(f => (f.name === "ホイミスライム")).length,
    exp_per_turn: mean(outputs.map(output => output.exp.per_turn)),
    turn_passed: mean(outputs.map(output => output.turn_passed))/inp.config.turn*100,
    stopped_by_enemy_genocide: outputs.filter(o => o.reason === "enemys are genocided").length*100.0/inp.config.trial,
    stopped_by_friend_kill: outputs.filter(o => o.reason === "friends are killed").length*100.0/inp.config.trial,
  });
  const postResult = () => {
    const post = create_post();
    firestore.collection('records').add(post).then(docref => {
      docref.get().then(doc => {
        const recordlog = {
          username: doc.data().username,
          userid: doc.data().userid,
          created_at: doc.data().created_at,
          recordid: doc.id,
          comment: doc.data().comment
        };
        firestore.collection('recordlogs').add(recordlog).then(docref_recordlog => {
          history.push('/');
        });
      });
    }).catch(err => {
      console.log("firebaseにaddできませんでした!");
      console.log(err);
    });
  };
  const outputTags = outputs && inp ? (
    <OutputTags record={create_post()} />
  ) : null;
  
  return (
    <Modal show={props.postShow} onHide={props.handlePostClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>投稿前確認</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="pt-2">投稿者名</h6>
        <div className="p-2 border border-black bg-light"> {auth.displayName} </div>
        <h6 className="pt-2">タグ</h6>
        <InputTags map={inp ? inp.map : null} friends={inp ? inp.friends: null} />
        {outputTags}
        <h6 className="pt-2">入力と計算結果</h6>
        <Container className="p-2 border border-black bg-light">
          <Row>
            <Col lg={6} sm={12} xs={12} className="pb-2"><MapContainer map={inp ? inp.map: null} fixed={true}/></Col>
            <Col lg={6} sm={12} xs={12} className="pb-2"><ResultTable post_inp={inp} outputs={outputs} /></Col>
          </Row>
          <Row>
            <Col lg={12} sm={12} xs={12}><FriendTable friends={inp ? inp.friends : null} fixed={true} /></Col>
          </Row>
        </Container>
        <Form.Group controlId="post-result-comment-textarea">
          <Form.Label>コメント</Form.Label>
          <Form.Control as="textarea" rows="3" defaultValue={comment} onChange={e => setComment(e.target.value)} placeholder="コメントがある場合は記入してください" />
        </Form.Group>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handlePostClose}>
          戻る
        </Button>
        <Button variant="danger" onClick={postResult}>
          内容を確認して投稿する
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultPostModal;
