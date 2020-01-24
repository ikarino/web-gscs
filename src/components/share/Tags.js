import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { creatable_with_explosion } from './func';


export const MyTooltip = (props) => {
  function renderTooltip(prop) {
    return <Tooltip {...prop} show={prop.show.toString()}>{props.description}</Tooltip>;
  }
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant={props.variant} size="sm" className="p-1 m-1">{props.title}</Button>
    </OverlayTrigger>
  );
};

export const InputTags = ({map, friends}) => {
  const numHs = friends.filter(f => (f.name === "ホイミスライム")).length;
  const numKm = friends.filter(f => (f.name === "キラーマシン")).length;
  const lvKiton = Math.min(friends.filter(f => (f.name === "きとうし")).map(f => f.lv)) === Infinity ? 0 : Math.min(friends.filter(f => (f.name === "きとうし")).map(f => f.lv));
  const lvKinoko = Math.min(friends.filter(f => (f.name === "きとうし")).map(f => f.lv)) === Infinity ? 0 : Math.min(friends.filter(f => (f.name === "おばけキノコ")).map(f => f.lv));
  const doubleSpeed = friends.filter(f => f.double_speed).length === friends.length;
  const singleSpeed = friends.filter(f => !f.double_speed).length === friends.length;

  // tooltips
  let tooltips = [];
  if (creatable_with_explosion(map)) {
    tooltips.push(<MyTooltip variant="success" title="爆" description="爆指で作成可能" key="explosion" />);
  }
  if (singleSpeed) {
    tooltips.push(<MyTooltip variant="success" title="等" description="全キャラ等速" key="single" />);
  }
  if (doubleSpeed) {
    tooltips.push(<MyTooltip variant="success" title="倍" description="全キャラ倍速" key="double" />);
  }
  if (numHs > 0) {
    tooltips.push(<MyTooltip variant="info" title={"ホ"+numHs} description="ホイミスライムの数" key="num_hoimi_slime" />);
  }
  if (numKm > 0) {
    tooltips.push(<MyTooltip variant="info" title={"機"+numKm} description="キラーマシンの数" key="num_killer_machine" />);
  }
  if (lvKiton > 0) {
    tooltips.push(<MyTooltip variant="secondary" title={"祈"} description="きとうし有" key="with_kiton" />);
    if (lvKiton < 6) {
      tooltips.push(<MyTooltip variant="secondary" title={"祈育"} description="Lv5以下のきとうし育成" key="grow_kiton" />);
    }
  }
  if (lvKinoko > 0) {
    tooltips.push(<MyTooltip variant="secondary" title={"茸"} description="おばけキノコ有" key="with_kinoko" />);
    if (lvKinoko < 5) {
      tooltips.push(<MyTooltip variant="secondary" title={"茸育"} description="Lv4以下のおばけキノコ育成" key="grow_kinoko" />);
    }
  }
  return (
    <div className="border border-black bg-light">
      {tooltips}
    </div>
  );
};


export const OutputTags = ({record}) => {
  // tooltips
  let tooltips = [];
  if (record.exp_per_turn > 100 ) {
    tooltips.push(<MyTooltip variant="danger" title="100" description="ターン経験値100以上！" key="exp100" />);
  }
  if (record.turn_passed === 100) {
    tooltips.push(<MyTooltip variant="success" title="完璧" description="仲間死亡無しかつ敵スモの消滅無し" key="perfect" />);
  }
  if (record.stopped_by_enemy_genocide > 0) {
    tooltips.push(<MyTooltip variant="warning" title="ス消" description="敵スモが消滅した試行有り" key="enemy_genocide" />);
  }
  if (record.stopped_by_friend_kill > 0) {
    tooltips.push(<MyTooltip variant="warning" title="仲死" description="仲間が死亡した試行有り" key="friend_kill" />);
  }
  return tooltips.length > 0 ? (
    <div className="border border-black bg-light">
      {tooltips}
    </div>
  ) : null;
};
