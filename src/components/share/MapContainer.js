import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

import runSCSModule from '../../modules/runSCSModule';
import rectImage from  '../../assets/z.png';
import rect0Image from '../../assets/0.png';
import rect1Image from '../../assets/1.png';
import rect2Image from '../../assets/2.png';
import rect3Image from '../../assets/3.png';
import rect4Image from '../../assets/4.png';
import rect5Image from '../../assets/5.png';
import rect6Image from '../../assets/6.png';
import rect7Image from '../../assets/7.png';
import rect8Image from '../../assets/8.png';
import rect9Image from '../../assets/9.png';

const fImages = [
  rect0Image,
  rect1Image,
  rect2Image,
  rect3Image,
  rect4Image,
  rect5Image,
  rect6Image,
  rect7Image,
  rect8Image,
  rect9Image,
];

const getStyles = (row) => (styled.div`
  .scsmap {
    border: solid 1px green;
    width: ${100.0/row}%;
  }
  .scsmap-empty {
    background-color: white;
  }
  .scsmap-enemy {
    background-color: gray;
  }
  .scsmap-wall {
    background-color: black;
  }
  .scsmap-friend {
    background-color: white;
  }
  .scsmap-active {
    background-color: red;
  }
  .map-container {
    line-height: 0;
  }
`);

export const Cell = (props) => {
  // props.fixed
  //   undefined => run map
  //   true      => fixed map
  const activeIndex = useSelector(state => state.runSCS.activeIndex);
  const dispatch = useDispatch();
  const handleOnClick = props.fixed ? () => {} : (index) => {
    dispatch(runSCSModule.actions.changeMap(index));
  };

  let src = null;
  let alt = null;
  let classname = 'scsmap ';
  switch(props.data) {
  case 0:
    src = rectImage;
    alt = 'empty';
    classname += 'scsmap-empty';
    break;
  case 1:
    src = rectImage;
    alt = 'wall';
    classname += 'scsmap-wall';
    break;
  case 9:
    src = rectImage;
    alt = 'enemy';
    classname += 'scsmap-enemy';
    break;
  default:
    src = fImages[props.data-10];
    alt = 'f'+String(props.data-10);
    if (props.index === activeIndex) {
      classname += 'scsmap-active';
    } else {
      classname += 'scsmap-freind';
    }
  }

  return (
    <img
      className={classname}
      src={src}
      alt={alt}
      onClick={() => { handleOnClick(props.index); }}
    />
  );
};

const MapContainer = (props) => {
  const map = props.map;
  let _rows = [];
  for (let row = 0; row < map.row; row++) {
    for (let col = 0; col < map.col; col++) {
      const index = row * map.col + col;
      const data = map.data[index];
      _rows.push(<Cell data={data} key={index} index={index} fixed={props.fixed} />);
    }
    _rows.push(<br key={"row"+row}/>);
  }

  const Styles = getStyles(map.row);

  return (
    <Styles>
      <Container fluid className="map-container">
        {_rows}
      </Container>
    </Styles>
  );
};

export default MapContainer;
