import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _, { xorBy } from 'lodash';
import { tileIndex, tileKeys } from 'lib/utility';
import Tile from './Tile';

import { saveMap } from 'store/MapList';
import clsx from 'clsx';

const GridView = ({gridName, type}) => {
  const dispatch = useDispatch();
  const selectedGridType = useSelector(state => state.MapList.selectedGridType);
  const x = useSelector(state => state.MapList.selectedMap.size.x);
  const y = useSelector(state => state.MapList.selectedMap.size.y);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(()=> {
    setIsSelected(selectedGridType === type);
  }, [type, selectedGridType]);

  return (
    <div className={clsx('grid_table', isSelected && 'grid_upper')}>
    {
      isSelected && 
        Array.from({length: y}, (_, i) => {return i}).map((_, i) => 
          <div className='grid_row' key={i}>
            {
              Array.from({length: x}, (_, j) => {return j}).map((_, j) => 
                <div className='grid_tile' key={j}>
                  <div className={clsx({
                    'grid_tile_emp':true,
                    'grid_tile_bottom': (i+1)%5 === 0,
                    'grid_tile_right': (j+1)%5 === 0,
                    })} />
                </div>
              )
            }
          </div>
        )
    }
    </div>
  );
}

export default GridView;