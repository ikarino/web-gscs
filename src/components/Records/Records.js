// import React, { useState, useEffect } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
// import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useFirestoreConnect } from 'react-redux-firebase';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import SearchCard from './SearchCard';
import RecordCard from './RecordCard';

export const Records = () => {
  // const records = sampleRecords;
  const auth = useSelector(state => state.firebase.auth);
  useFirestoreConnect('records');
  const records = useSelector(state => state.firestore.data.records);
  const c = useSelector(state => state.records);

  if (!records) {
    return <div>Loading Records ...</div>;
  }
  let record_array = [];
  Object.entries(records).forEach(([id, record]) => {
    record_array.push({id, record});
  });
  const recordCards = record_array
        .filter(rec => {
          if(c.numKm !== -1) {
            return rec.record.num_killer_machine === c.numKm;
          }
          return true;
        })
        .filter(rec => {
          if(c.numHs !== -1) {
            return rec.record.num_hoimi_slime === c.numHs;
          }
          return true;
        })
        .filter(rec => {
          if(c.kinoko === 3) {  // 育成
            return rec.record.lv_kinoko  <= 4 && rec.record.with_kinoko;
          } else if (c.kinoko === 2) { // 有り
            return rec.record.with_kinoko;
          } else if (c.kinoko === 1) { // 無し
            return !rec.record.with_kinoko;
          }
          return true;
        })
        .filter(rec => {
          if(c.kiton === 3) {  // 育成
            return rec.record.lv_kiton  <= 4 && rec.record.with_kiton;
          } else if (c.kiton === 2) { // 有り
            return rec.record.with_kiton;
          } else if (c.kiton === 1) { // 無し
            return !rec.record.with_kiton;
          }
          return true;
        })
        .filter(rec => {
          if (c.speed === 2) { // 倍速
            return rec.record.all_double_speed;
          } else if (c.speed === 1) { // 等速
            return rec.record.all_normal_speed;
          }
          return true;
        })
        .filter(rec => {
          if (c.explosion === 2) { // 不可能
            return !rec.record.creatable_with_explosion;
          } else if (c.explosion === 1) { // 可能
            return rec.record.creatable_with_explosion;
          }
          return true;
        })
        .filter(rec => {
          if (c.my_post === 2) { // 他人の投稿
            return rec.record.userid !== auth.uid;
          } else if (c.my_post === 1) { // 可能
            return rec.record.userid === auth.uid;
          }
          return true;
        })
        .sort((rec1, rec2) => {
          let r1 = rec1.record[c.sort_by];
          let r2 = rec2.record[c.sort_by];
          if (r1 > r2) {
            return -1;
          }
          if (r2 > r1) {
            return 1;
          }
          return 0;
        })
        .map(rec => (
          <Col className="pt-2" lg={4} sm={12} xs={12} key={rec.id}><RecordCard docid={rec.id} record={rec.record}/></Col>
        ));

  // const [recordCards, setRecordCards] = useState([]);
  // const c = useSelector(state => state.records);
  // const firestore = useFirestore();
  // useEffect(() => {
  //   console.log("effect");
  //   let col = firestore.collection("records").orderBy(c.sort_by, "desc");
  //   if (c.numKm !== -1) {
  //     col = col.where("num_killer_machine", "==", c.numKm);
  //   }
  //   col.limit(10)
  //     .get()
  //     .then(ss => {
  //       let cards = [];
  //       ss.forEach(doc => {
  //         const id = doc.id;
  //         const record = doc.data();
  //         cards.push(
  //           <Col className="pt-2" lg={4} sm={12} xs={12} key={id}><RecordCard docid={id} record={record}/></Col>
  //         );
  //       });
  //       setRecordCards(cards);
  //     });
  // }, [c]);
  // console.log("fuck");
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col className="pt-2" lg={4} sm={12} xs={12}><SearchCard/></Col>
          {recordCards}
        </Row>
      </Container>
    </React.Fragment>
  );
};
