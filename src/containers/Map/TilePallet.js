import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onJSONDownload } from 'lib/utility';
import _ from 'lodash';
import Tile from './Tile';
import TileObject from './TileObject';

import { getMap } from 'store/MapList';
import { selectTile } from 'store/TilePallet';

const TilePallet = () => {
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const selectedMap = useSelector(state => state.MapList.selectedMap);
  const tileList = useSelector(state => state.TilePallet.tiles);
  const objectList = useSelector(state => state.TilePallet.objects);
  const selectedTile = useSelector(state => state.TilePallet.selected);
  const selectedGridType = useSelector(state => state.MapList.selectedGridType);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();    
    reader.onload = () => {
      dispatch(getMap({ map: reader.result }));
    };
    reader.readAsText(file, /* optional */ "utf-8");
  }

  return (
    <div className='tile_content'>
      <div>
        <input
          ref={fileInput}
          className="input"
          // files={[uploadFile]}
          type='file'
          accept='application/json'
          onChange={handleChangeFile}
          />
        <button className="tile_button" onClick={() => fileInput && fileInput.current && fileInput.current.click()}>불러오기</button>
        <button className="tile_button" onClick={() => onJSONDownload('export', selectedMap)}>내보내기</button>
      </div>
      <div className='tile_grid'>
        { 
          selectedGridType === 0 ?
            tileList && tileList.map((tile, i) => 
              <div className='tile_tile' key={i} 
                title={tile.name||tile.img}
                style={selectedTile && selectedTile.id === tile.id ? { borderColor: '#f0e10c' } : {}}
                onClick={() => dispatch(selectTile({ tile: tile }))}>
                {
                  tile.type === 'tile' ?
                    <Tile
                      img={tile.img}
                      index={0}
                      size={2}
                      />
                    :
                    <TileObject
                      img={tile.img}
                      imgSize={{width:32, height:32}}
                      tileSize={{width:16, height:16}}
                      offset={{x: 0, y: 0, rotate:tile.rotate}}
                      point={{x: 0, y: 0}}
                      size={{width: 2, height: 2}}
                      />
                }
              </div>
            )
            :
            [1, 5, 6].includes(selectedGridType) ?
              objectList && objectList.map((object, i) => 
                <div className='tile_tile' key={i} 
                  title={object.name||object.img}
                  style={selectedTile && selectedTile.id === object.id ? { borderColor: '#f0e10c' } : {}}
                  onClick={() => dispatch(selectTile({ tile: object }))}>
                  <TileObject
                    img={object.img}
                    imgSize={object.imgSize}
                    tileSize={object.tileSize}
                    offset={object.offset}
                    size={object.size}
                    />
                </div>
              )
              :
              ''
        }
      </div>
    </div>
  );
}

export default TilePallet;