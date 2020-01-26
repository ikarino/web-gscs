import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TwitterShareButton, TwitterIcon } from 'react-share';

import runSCSModule from '../modules/runSCSModule';
import { InputTags, OutputTags } from './share/Tags';
import MapContainer from './share/MapContainer';
import FriendTable from './share/FriendTable';
import { formatDate } from './share/func';

const RecordDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useFirestoreConnect('records');
  const [copied, setCopied] = useState(false);
  const records = useSelector(state => state.firestore.data.records);
  
  if (!records) {
    return <div>Loading Records ...</div>;
  }

  const id = props.match.params.id;
  const record = records[id];

  const asTemplate = () => {
    dispatch(runSCSModule.actions.addTemplate({
      recordid: id,
      inp: record.inp
    }));
    history.push('/run');
  };
  return (
    <Card className="my-3">
      <Card.Header>{record.username}さんの投稿 <br />@{formatDate(record.created_at.toDate(), 'yyyy/MM/dd HH:mm')}</Card.Header>
      <Card.Body>
        <Container className="p-1">
          <h6 className="pt-2">タグ</h6>
          <InputTags map={record.inp.map} friends={record.inp.friends} />
          <OutputTags record={record} />
          <h6 className="pt-2">入力と計算結果</h6>
          <Container className="p-2 border border-black bg-light">
            <Row>
              <Col lg={4} sm={12} xs={12} className="pb-2"><MapContainer map={record.inp.map} fixed={true}/></Col>
              <Col lg={4} sm={12} xs={12}><FriendTable friends={record.inp.friends} fixed={true} /></Col>
              <Col lg={4} sm={12} xs={12}>
                <Table striped bordered hover size="sm" className="my-2 result-table">
                  <thead>
                    <tr>
                      <td>結果概要</td>
                      <td>計算結果</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ターン経験値</td>
                      <td>{record.exp_per_turn.toFixed(1)}</td>
                    </tr>
                    <tr>
                      <td>ターン経過率</td>
                      <td>{record.turn_passed.toFixed(1)+"%"}</td>
                    </tr>
                    <tr>
                      <td>仲間死亡率</td>
                      <td>{record.stopped_by_friend_kill.toFixed(1)+"%"}</td>
                    </tr>
                    <tr>
                      <td>敵スモ消滅率</td>
                      <td>{record.stopped_by_enemy_genocide.toFixed(1)+"%"}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
          <h6 className="pt-2">シェア・活用</h6>
          <Container className="p-2 border border-black bg-light">
            <Button className="mx-1" variant="success" size="sm" onClick={asTemplate}>テンプレートとして使用</Button>
            <CopyToClipboard className="mx-1" text={window.location.href} onCopy={() => {setCopied(true); }}>
              <Button size="sm">
                {copied ? "コピーしました" : "リンクをコピー"}
              </Button>
            </CopyToClipboard>
            <TwitterShareButton title={record.comment} className="mx-1" hashtags={["web-gscs", "トルネコ3"]} url={window.location.href}>
              <TwitterIcon size="25" round />
            </TwitterShareButton>
          </Container>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default RecordDetails;
