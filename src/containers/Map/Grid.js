import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { tileIndex, tileKeys } from 'lib/utility';
import Tile from './Tile';
import TileObject from './TileObject';

import { saveMap } from 'store/MapList';
import clsx from 'clsx';

const Grid = ({gridName, type}) => {
  const dispatch = useDispatch();
  const selectedGrid = useSelector(state => state.MapList.selectedMap[gridName]);
  const selectedTile = useSelector(state => state.TilePallet.selected);
  const selectedGridType = useSelector(state => state.MapList.selectedGridType);
  
  const [grid, setGrid] = useState([[]]);
  const [gridOver, setGridOver] = useState({i:-1, j:-1});
  const [isSelected, setIsSelected] = useState(false);
  const [timer, setTimer] = useState(undefined);

  useEffect(()=> {
    if (grid === selectedGrid) return;
    setGrid(selectedGrid);
  }, [selectedGrid]);
  useEffect(()=> {
    setIsSelected(selectedGridType === type);
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
      setGridOver({i, j});
    } else if (e.buttons === 1 && (grid[i][j]?.id??0) !== selectedTile.id) {
      setTile(i, j);
    } else if (e.buttons === 2) {
      deleteTile(i, j);
    }
  }
  const mouseDown = (e, i, j) => {
    if (e.buttons === 1 && (grid[i][j]?.id??0) !== selectedTile.id) {
      setTile(i, j);
    } else if (e.buttons === 2) {
      deleteTile(i, j);
    }
  }

  const setTile = (i, j) => {
    let _grid = _.cloneDeep(grid);
    if (selectedTile.type === 'tile') {
      _grid[i][j] = {
        ...selectedTile,
        reversal: false,
        ...getIndex(i, j, selectedTile.id, _grid)
      };
      
      const adjacency = [
        { isNull: _grid?.[i-1]?.[j-1]??false ? true : false, i: i-1, j: j-1 },
        { isNull: _grid?.[i-1]?.[j  ]??false ? true : false, i: i-1, j: j   },
        { isNull: _grid?.[i-1]?.[j+1]??false ? true : false, i: i-1, j: j+1 },
        { isNull: _grid?.[i  ]?.[j-1]??false ? true : false, i: i  , j: j-1 },
        { isNull: _grid?.[i  ]?.[j+1]??false ? true : false, i: i  , j: j+1 },
        { isNull: _grid?.[i+1]?.[j-1]??false ? true : false, i: i+1, j: j-1 },
        { isNull: _grid?.[i+1]?.[j  ]??false ? true : false, i: i+1, j: j   },
        { isNull: _grid?.[i+1]?.[j+1]??false ? true : false, i: i+1, j: j+1 }
      ];
  
      adjacency.forEach(other => {
        if (other.isNull) {
          let tile = _grid[other.i][other.j];
          _grid[other.i][other.j] = { ...tile, reversal: false, ...getIndex(other.i, other.j, tile.id, _grid) }
        }
      })
    } else {
      _grid[i][j] = {
        ...selectedTile,
      };
    }
    setGrid(_grid);
  }
  const deleteTile = (i, j) => {
    let _grid = _.cloneDeep(grid);
    _grid[i][j] = null;
    
    const adjacency = [
      { isNull: _grid?.[i-1]?.[j-1]??false ? true : false, i: i-1, j: j-1 },
      { isNull: _grid?.[i-1]?.[j  ]??false ? true : false, i: i-1, j: j   },
      { isNull: _grid?.[i-1]?.[j+1]??false ? true : false, i: i-1, j: j+1 },
      { isNull: _grid?.[i  ]?.[j-1]??false ? true : false, i: i  , j: j-1 },
      { isNull: _grid?.[i  ]?.[j+1]??false ? true : false, i: i  , j: j+1 },
      { isNull: _grid?.[i+1]?.[j-1]??false ? true : false, i: i+1, j: j-1 },
      { isNull: _grid?.[i+1]?.[j  ]??false ? true : false, i: i+1, j: j   },
      { isNull: _grid?.[i+1]?.[j+1]??false ? true : false, i: i+1, j: j+1 }
    ];

    adjacency.forEach(other => {
      if (other.isNull) {
        let tile = _grid[other.i][other.j];
        _grid[other.i][other.j] = { ...tile, reversal: false, ...getIndex(other.i, other.j, tile.id, _grid) }
      }
    })

    setGrid(_grid);
  }

  const getIndex = (i, j, id, _grid) => {
    const n = _grid[i].length;
    const m = _grid.length;

    const tl = i-1 >= 0 && j-1 >= 0 ? (_grid[i-1][j-1]?.id??0) === id ? '1' : '0' : '0';
    const t  = i-1 >= 0             ? (_grid[i-1][j  ]?.id??0) === id ? '1' : '0' : '0';
    const tr = i-1 >= 0 && j+1 <  n ? (_grid[i-1][j+1]?.id??0) === id ? '1' : '0' : '0';
    const l  =             j-1 >= 0 ? (_grid[i  ][j-1]?.id??0) === id ? '1' : '0' : '0';
    const r  =             j+1 <  n ? (_grid[i  ][j+1]?.id??0) === id ? '1' : '0' : '0';
    const bl = i+1 <  m && j-1 >= 0 ? (_grid[i+1][j-1]?.id??0) === id ? '1' : '0' : '0';
    const b  = i+1 <  m             ? (_grid[i+1][j  ]?.id??0) === id ? '1' : '0' : '0';
    const br = i+1 <  m && j+1 <  n ? (_grid[i+1][j+1]?.id??0) === id ? '1' : '0' : '0';

    const str = tl + t + tr + l + r + bl+ b + br;
    
    const key = tileKeys.find(key => new RegExp(key).test(str));

    return tileIndex[key] || { "index": 0 };
  }

  return (
    <div className={clsx('grid_table', isSelected && 'grid_upper')} onMouseLeave={() => isSelected && setGridOver({i:-1, j:-1})}>
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
                    gridOver.i === i && gridOver.j === j && selectedTile && (tile?.id??0) !== selectedTile.id ?
                      (
                        selectedTile.type === 'tile' ?
                          <Tile
                            img={selectedTile.img}
                            index={0}
                            size={1}
                            />
                          :
                          <TileObject
                            img={selectedTile.img}
                            imgSize={{width:32, height:32}}
                            tileSize={{width:32, height:32}}
                            offset={{x: 0, y: 0, rotate:selectedTile.rotate}}
                            point={{x: 0, y: 0}}
                            size={{width: 1, height: 1}}
                            />
                      )
                      :
                      tile && tile.type === 'tile' ?
                        <Tile
                          img={tile.img}
                          index={tile.index}
                          size={1}
                          temp={tile.temp}
                          reversal={tile.reversal}
                          />
                        :
                        tile && tile.type === 'object' ?
                          <TileObject
                            img={tile.img}
                            imgSize={{width:32, height:32}}
                            tileSize={{width:32, height:32}}
                            offset={{x: 0, y: 0, rotate:tile.rotate}}
                            point={{x: 0, y: 0}}
                            size={{width: 1, height: 1}}
                            />
                          :
                          <div className='grid_tile_temp' />
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
                    tile && tile.type === 'tile' ?
                      <Tile
                        img={tile.img}
                        index={tile.index}
                        size={1}
                        temp={tile.temp}
                        reversal={tile.reversal}
                        />
                      :
                      tile && tile.type === 'object' ?
                        <TileObject
                          img={tile.img}
                          imgSize={{width:32, height:32}}
                          tileSize={{width:32, height:32}}
                          offset={{x: 0, y: 0, rotate:tile.rotate}}
                          point={{x: 0, y: 0}}
                          size={{width: 1, height: 1}}
                          />
                        :
                        ''
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

export default Grid;