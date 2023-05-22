import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTilePoint } from 'lib/utility';
import _ from 'lodash';

const TileObject = ({img, imgSize, tileSize, point, offset, size, temp, reversal}) => {
  const xZoom = 16 / tileSize.width;
  const yZoom = 16 / tileSize.height;

	const imgSize_width = imgSize.width*xZoom;
	const imgSize_height = imgSize.height*yZoom;

	const tileSize_width = tileSize.width*xZoom;
	const tileSize_height = tileSize.height*yZoom;

	const point_x = point?.x ?? 0;
	const point_y = point?.y ?? 0;
	const size_width = size?.width ?? 1;
	const size_height = size?.height ?? 1;

  const width = size_width*tileSize_width;
  const height = size_height*tileSize_height;
  const left = -point_x*tileSize_width-offset.x*xZoom;
	const top = -point_y*tileSize_height-offset.y*yZoom;
  const rotate = offset?.rotate ?? 0;

  return (
    <div className='tile' style={{ width, height, opacity: temp?0.5:1, transform: `scaleX(${reversal?-1:1}) rotate(${rotate}deg)` }}>
      <img style={{ top, left, width: imgSize_width, height: imgSize_height }}
        src={`/img/object/${img}.png`}/>
    </div>
  );
}

export default TileObject;