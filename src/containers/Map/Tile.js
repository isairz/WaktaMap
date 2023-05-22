import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTilePoint } from 'lib/utility';
import _ from 'lodash';

const Tile = ({img, index, size, temp, reversal}) => {
	const x = parseInt(index / 5);
	const y = index % 5;

  const width = 16*size;
	const top = -(1+x*17)*size;
  const left = -(1+y*17)*size

  return (
    <div className='tile' style={{ width, height:width, opacity: temp?0.5:1, transform: `scaleX(${reversal?-1:1})` }}>
      <img style={{ top, left, width: 90*size, height: 130*size }}
        src={`/img/tile/${img}.png`}/>
    </div>
  );
}

export default Tile;