import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { tileIndex, tileKeys } from 'lib/utility';
import TileObject from './TileObject';

import { saveMap } from 'store/MapList';
import { selectTile } from 'store/TilePallet';
import clsx from 'clsx';

const GridMoon = ({gridName, type}) => {
  const dispatch = useDispatch();
  const button = useSelector(state => state.TilePallet.button);
  const moon = useSelector(state => state.TilePallet.moon);
  const selectedGrid = useSelector(state => state.MapList.selectedMap[gridName]);
  const selectedTile = useSelector(state => state.TilePallet.selected);
  const selectedGridType = useSelector(state => state.MapList.selectedGridType);
  
  const [grid, setGrid] = useState([[]]);
  const [gridOver, setGridOver] = useState({i:-1, j:-1, w:-1, h:-1});
  const [buttonPoint, setButtonPoint] = useState({i:-1, j:-1});
  const [isSelected, setIsSelected] = useState(false);
  const [timer, setTimer] = useState(undefined);

  useEffect(()=> {
    if (grid === selectedGrid) return;
    setGrid(selectedGrid);
  }, [selectedGrid]);
  useEffect(()=> {
    setIsSelected(selectedGridType === type);
    if (selectedGridType === type) dispatch(selectTile({ tile: button }));
  }, [type, selectedGridType]);
  useEffect(()=> {
    clearTimeout(timer);

    const _timer = setTimeout(() =>{
      dispatch(saveMap({ gridName: gridName, grid: grid }));
    }, 1000);

    setTimer(_timer);
  }, [grid]);

  const mouseMove = (e, i, j) => {
    if (e.buttons === 0) {
      const { width, height } = selectedTile.size;

      setGridOver({i, j, w:width-1, h:height-1});
    }
  }
  const mouseDown = (e, i, j) => {
    if (e.buttons === 1 && (grid[i][j]?.id??0) !== selectedTile.id) {
      setTile(i, j);
      if (selectedTile === button) {
        setButtonPoint({i, j});
        dispatch(selectTile({ tile: moon }));
      } else {
        dispatch(selectTile({ tile: button }));
      }
    } else if (e.buttons === 2) {
      deleteTile(i, j);
    }
  }

  const setTile = (i, j) => {
    let _grid = _.cloneDeep(grid);
    const { width, height } = selectedTile.size;
    Array.from({length: height}, (_, h) => 
      Array.from({length: width}, (_, w) => 
        _grid[i+h][j+w] = {
          ...selectedTile,
          point: { x: w, y: h },
          size: { width: 1, height: 1 },
        }
    ));
    _grid[i][j] = {
      ...selectedTile,
      size: { width: 1, height: 1 },
      buttonPoint: selectedTile === moon && buttonPoint
    };
    
    setGrid(_grid);
  }
  const deleteTile = (i, j) => {
    let _grid = _.cloneDeep(grid);
    _grid[i][j] = null;

    setGrid(_grid);
  }

  return (
    <div className={clsx('grid_table', isSelected && 'grid_upper')} onMouseLeave={() => isSelected && setGridOver({i:-1, j:-1, w:-1, h:-1})}>
    {
      isSelected ?
        grid.map((row, i) => 
          <div className='grid_row' key={i}>
            {
              row && row.map((tile, j) => 
                <div className='grid_tile' key={j}
                  onMouseMove={(e) => selectedTile && mouseMove(e, i, j)}
                  onMouseDown={(e) => selectedTile && mouseDown(e, i, j)}
                  >
                  {
                    gridOver.i === i && gridOver.j === j && selectedTile ?
                      <TileObject
                        img={selectedTile.img}
                        imgSize={selectedTile.imgSize}
                        tileSize={selectedTile.tileSize}
                        offset={selectedTile.offset}
                        point={selectedTile.point}
                        size={selectedTile.size}
                        />
                      :
                      tile && tile.type !== 'temp' ?
                        <TileObject
                          img={tile.img}
                          imgSize={tile.imgSize}
                          tileSize={tile.tileSize}
                          offset={tile.offset}
                          point={tile.point}
                          size={tile.size}

                          temp={tile.temp}
                          reversal={tile.reversal}
                          />
                        :
                        (gridOver.i <= i && i <= gridOver.i + gridOver.h && gridOver.j <= j && j <= gridOver.j + gridOver.w) /*|| (tile && tile.type === 'temp')*/ ?
                          ''
                          :
                          <div className='grid_tile_temp' />
                  }
                  {
                    tile && tile.type === 'moon' && tile.buttonPoint &&
                      <>
                        <div className='line_red' style={{ 
                          left: j*16 + (tile.buttonPoint.j <= j ? (tile.buttonPoint.j-j)*16+6 : 6), 
                          top: i*16 - (i-tile.buttonPoint.i)*16+6,
                          width: Math.abs(tile.buttonPoint.j-j)*16
                          }} />
                        <div className='line_red' style={{ 
                          left: j*16 + 6, 
                          top: i*16 - (tile.buttonPoint.i <= i ? (i-tile.buttonPoint.i)*16-6 : -6),
                          height: Math.abs(tile.buttonPoint.i-i)*16,
                          }} />
                      </>
                  }
                </div>
              )
            }
          </div>
        )
        :
        grid.map((row, i) => 
          <div className='grid_row' key={i}>
            {
              row && row.map((tile, j) => 
                <div className='grid_tile' key={j}>
                  {
                    tile &&
                      <TileObject
                        img={tile.img}
                        imgSize={tile.imgSize}
                        tileSize={tile.tileSize}
                        offset={tile.offset}
                        point={tile.point}
                        size={tile.size}

                        temp={tile.temp}
                        reversal={tile.reversal}
                        />
                  }
                </div>
              )
            }
          </div>
        )
    }
    </div>
  );
}

export default GridMoon;