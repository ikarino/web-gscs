import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

export const About = () => (
  <div className="border mt-2 p-2">
    <h3><span className="text-danger">web-gscs</span>とは</h3>
    <p>ブラウザ上でスモコンシミュレーションを実行し、結果をシェアできるサービスです。</p>


    <Accordion>
      <Card>
        <Card.Header className="p-0 m-0">
          <Accordion.Toggle as={Button} variant="link" eventKey="0">用語の説明</Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <h5>ターン経験値</h5>
            <p className="small">1ターンあたりに得られた経験値です。仲間が死亡したり、敵スモグルが消滅してシミュレーションが止まっているターンは無視されています。</p>
            <h5>ターン経過率</h5>
            <p className="small">仲間が死亡したり、敵スモグルが消滅せずに経過したターンの割合です。100%が望ましい状態です。</p>
            <h5>仲間死亡率</h5>
            <p className="small">試行のうち、仲間が死亡してシミュレーションが終了した割合です。0%が望ましい状態です。</p>
            <h5>敵スモ消滅率</h5>
            <p className="small">敵スモグルが消滅してシミュレーション終了した割合です。0%が望ましい状態です。</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      
      <Card>
        <Card.Header className="p-0 m-0">
          <Accordion.Toggle as={Button} variant="link" eventKey="1">実装内容</Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <h5>特技が実装されているモンスター</h5>
            <p className="small">キラーマシン,ホイミスライム,おばけキノコのみです。</p>
            <h5>特技の発動確率</h5>
            <p className="small">
              現在は以下の設定となっています。<br />
              ホイミ発動率は2020/01/24から変更しています。ご了承ください。<br />
              ホイミ発動率と分裂方向は<a href="https://twitter.com/neko3mpota">@neko3mpota</a>さんの調査結果を利用させていただいています。
            </p>
            <Table striped bordered hover size="sm">
              <tbody>
                <tr><td>攻撃ヒット率</td><td>92%</td></tr>
                <tr><td>ホイミ発動率</td><td className="text-danger">35.53%</td></tr>
                <tr><td>ホイミスライム攻撃確率</td><td>30%</td></tr>
                <tr><td>スモールグール分裂確率</td><td>25%</td></tr>
                <tr><td>スモールグール分裂方向</td><td><a href="https://twitter.com/neko3mpota/status/970271526703349760/photo/1">kompotaさんの発見した法則による</a></td></tr>
              </tbody>
            </Table>
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      
      <Card>
        <Card.Header className="p-0 m-0">
          <Accordion.Toggle as={Button} variant="link" eventKey="2">開発・連絡</Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <h5>開発</h5>
            <p className="small">以下のgithubレポジトリで開発しています。<br />
              <a href="https://github.com/ikarino/web-gscs">github.com/ikarino/web-gscs</a>
            </p>
            
            <h5>連絡</h5>
            <p className="small">
              バグ報告やコメントは<a href="mailto:ggrks218@gmail.com?subject=web-gscsについて">こちら</a>にお願いいたします。
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </div>
);

