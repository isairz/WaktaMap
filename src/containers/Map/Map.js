import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { tileIndex, tileKeys } from 'lib/utility';
import Grid from './Grid';
import GridMoon from './GridMoon';
import GridObject from './GridObject';
import Zone from './Zone';
import GridView from './GridView';

import { changeMap } from 'store/MapList';
import clsx from 'clsx';

const Map = () => {
  const dispatch = useDispatch();
  const selectedMap = useSelector(state => state.MapList.selectedMap);
  const [name, setName] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(()=> {
    setName(selectedMap.name);
    setX(selectedMap.size.x);
    setY(selectedMap.size.y);
  }, [selectedMap]);

  const onChangeMap = () => {
    const map = {
      name: name,
      size: { x: x, y: y },
      grid: Array.from({length: y}, (_, i) => Array.from({length: x}, (_, j) => selectedMap.grid[i] && selectedMap.grid[i][j] || null)),
      grid_object: Array.from({length: y}, (_, i) => Array.from({length: x}, (_, j) => selectedMap.grid[i] && selectedMap.grid_object[i][j] || null)),
      grid_object2: Array.from({length: y}, (_, i) => Array.from({length: x}, (_, j) => selectedMap.grid[i] && selectedMap.grid_object2[i][j] || null)),
      grid_object3: Array.from({length: y}, (_, i) => Array.from({length: x}, (_, j) => selectedMap.grid[i] && selectedMap.grid_object3[i][j] || null)),
      grid_moon: Array.from({length: y}, (_, i) => Array.from({length: x}, (_, j) => selectedMap.grid[i] && selectedMap.grid_moon[i][j] || null)),
      zone_text: selectedMap.zone_text,
    };

    console.log('map', map);
    dispatch(changeMap({ name:selectedMap.name, map:map }));
  }

  return (
    <div className='grid'>
      <div className='grid_title'>
        이름 :
        <input style={{width:150}} value={name} onChange={(e) => setName(e.target.value)} />
        사이즈 : 
        <input style={{width:50}} type={'number'} value={x} onChange={(e) => e.target.value <= 100 && setX(e.target.value)} />
        X
        <input style={{width:50}} type={'number'} value={y} onChange={(e) => e.target.value <= 100 && setY(e.target.value)} />
        <button className="main_searchbutton" onClick={() => onChangeMap()}>수정</button>
        {/* <button className="main_searchbutton" onClick={() => dispatch(addMap({ name: mapName }))}>추가</button>
        <button className="main_searchbutton" onClick={() => dispatch(addMap({ name: mapName }))}>추가</button> */}
      </div>
      <div className='grid_content'>
      <Grid
        key={0}
        gridName={'grid'}
        type={0}
      />
      <GridObject
        key={1}
        gridName={'grid_object'}
        type={1}
      />
      <GridObject
        key={5}
        gridName={'grid_object2'}
        type={5}
      />
      <GridObject
        key={6}
        gridName={'grid_object3'}
        type={6}
      />
      <GridMoon
        key={3}
        gridName={'grid_moon'}
        type={3}
      />
      <Zone
        key={2}
        zoneName={'zone_text'}
        type={2}
      />
      <GridView
        key={4}
        gridName={'grid'}
        type={4}
      />
      </div>
    </div>
  );
}

export default Map;