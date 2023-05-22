import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { tileIndex, tileKeys } from 'lib/utility';
import Tile from './Tile';

import { saveMap } from 'store/MapList';
import clsx from 'clsx';

const Zone = ({zoneName, type}) => {
  const dispatch = useDispatch();
  const selectedMapSize = useSelector(state => state.MapList.selectedMap.size);
  const selectedZones = useSelector(state => state.MapList.selectedMap[zoneName]);
  const selectedTile = useSelector(state => state.TilePallet.selected);
  const selectedGridType = useSelector(state => state.MapList.selectedGridType);
  
  const [isSelected, setIsSelected] = useState(false);
  // 1: 배경 클릭, 2: zone 이동
  const [mouseMode, setMouseMode] = useState(0);

  const [startPoint, setStartPoint] = useState({x:-1, y:-1});
  const [endPoint, setEndPoint] = useState({x:-1, y:-1});
  const [selectedZone, setSelectedZone] = useState(undefined);

  const [isModal, setIsModal] = useState(false);


  useEffect(()=> {
    setIsSelected(selectedGridType === type);
  }, [type, selectedGridType]);

  const mouseMove = (e, i, j) => {
    if (e.buttons === 1) {
      const { offsetX, offsetY } = e.nativeEvent;
      if (mouseMode === 1) {
        if (e.target.id === 'zone') {
          const left = parseInt(e.target.style.left.replace('px', ''));
          const top = parseInt(e.target.style.top.replace('px', ''));
          setEndPoint({x: left+offsetX, y: top+offsetY});
        } else {
          setEndPoint({x: offsetX, y: offsetY});
        }
      } else if (mouseMode === 2) {
        const { x, y } = e.nativeEvent;
        const { left, top } = selectedZone.style;
        setEndPoint({
          x: startPoint.x - x, 
          y: startPoint.y - y
        });
      }
    }
  }
  const mouseDown = (e, i, j) => {
    if (e.buttons === 1) {
      const { offsetX, offsetY } = e.nativeEvent;
      setMouseMode(1);
      setStartPoint({x: offsetX, y: offsetY});
      setEndPoint({x: -1, y: -1});
    }
  }
  const mouseUp = (e, i, j) => {
    if (e.buttons === 0) {
      if (mouseMode === 1 && startPoint.x > 0 && startPoint.y > 0 && endPoint.x > 0 && endPoint.y > 0) {
        console.log('addZone');
        addZone();
  
        setMouseMode(0);
        setStartPoint({x: -1, y: -1});
        setEndPoint({x: -1, y: -1});
      } else if (mouseMode === 2) {
        let zones = _.cloneDeep(selectedZones);
        const index = _.findIndex(zones, zone => zone.id === selectedZone.id);
        const zone = {...selectedZones[index]};
        
        zone.style = {
          ...selectedZone.style,
          left: selectedZone.style.left - endPoint.x,
          top: selectedZone.style.top - endPoint.y,
        };
        zones.splice(index, 1, zone);

        dispatch(saveMap({ gridName: 'zone_text', grid: zones }));
        setSelectedZone(undefined);
        setMouseMode(0);
      }
    }
  }

  const addZone = () => {
    let zone = _.cloneDeep(selectedZones);
    zone.push({
      id: (_.last(selectedZones)?.id ?? 0)+1,
      texts: [],
      style: {
        left: Math.min(startPoint.x, endPoint.x),
        top: Math.min(startPoint.y, endPoint.y),
        width: endPoint.x>0 ? Math.abs(startPoint.x-endPoint.x) : 0,
        height: endPoint.y>0 ? Math.abs(startPoint.y-endPoint.y) : 0,
      }
    });

    dispatch(saveMap({ gridName: 'zone_text', grid: zone }));
  }

  const zoneMouseDown = (e, zone) => {
    e.stopPropagation();
    const { x, y } = e.nativeEvent;
    
    if (e.buttons === 1) {
      setMouseMode(2);
      setSelectedZone(zone);
      setStartPoint({x: x, y: y});
      setEndPoint({x: -1, y: -1});
    } else if (e.buttons === 2) {
      console.log('modalOpen');
      setMouseMode(0);
      setIsModal(true);
      setSelectedZone(_.cloneDeep(zone));
    }
  }

  const addText = () => {
    const lastZone = _.last(selectedZone.texts);
    selectedZone.texts.push({
      id: (lastZone?.id ?? 0)+1,
      order: (lastZone?.order ?? 0)+1,
      face: '',
      text: '',
    });
    
    setSelectedZone({...selectedZone});
  }
  const saveTexts = () => {
    console.log('saveTexts');
    let zones = _.cloneDeep(selectedZones);
    const index = _.findIndex(zones, zone => zone.id === selectedZone.id);
    const zone = {...selectedZones[index], texts: selectedZone.texts};

    console.log('zone.texts', zone.texts);
    zones.splice(index, 1, zone);

    setMouseMode(0);
    setSelectedZone(undefined);
    setIsModal(false);
    dispatch(saveMap({ gridName: 'zone_text', grid: zones }));
  }
  const cancelTexts = () => {
    setMouseMode(0);
    setSelectedZone(undefined);
    setIsModal(false);
  }
  

  return (
    <div className={clsx('zone_content', isSelected && 'grid_upper')} id='zone_content'
      style={{ width: selectedMapSize.x*16, height: selectedMapSize.y*16 }}
      onMouseMove={mouseMove}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      >
      {
        selectedZones && selectedZones.map((zone, i) =>
          <div className={'zone'} key={i} id='zone'
            style={zone.style}
            onMouseDown={(e) => zoneMouseDown(e, zone)}
            />
        )
      }
      { 
        mouseMode === 1 && 
          <div className={'zone'} 
            style={{
              left: Math.min(startPoint.x, endPoint.x),
              top: Math.min(startPoint.y, endPoint.y),
              width: endPoint.x>0 ? Math.abs(startPoint.x-endPoint.x) : 0,
              height: endPoint.y>0 ? Math.abs(startPoint.y-endPoint.y) : 0,
            }}
            />
      }
      { 
        mouseMode === 2 && 
          <div className={'zone'} 
            style={{
              ...selectedZone.style,
              left: selectedZone.style.left - endPoint.x,
              top: selectedZone.style.top - endPoint.y,
            }}
            />
      }
      {
        isModal &&
          <div className={'modal_background'} 
            onMouseMove={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            >
            <div className={'modal'}>
              <div className={'modal_header'}>
                <button className="modal_button" onClick={() => cancelTexts()}>취소</button>
                <button className="modal_button" onClick={() => saveTexts()}>저장</button>
                <button className="modal_button" onClick={() => addText()}>대사 추가</button>
              </div>
              <div className={'modal_content'}>
                {
                  selectedZone && selectedZone.texts.map((text, i) => 
                    <div className={'text_row'} key={i}>
                      <span>{text.id}</span>
                      <input value={text.face} onChange={(e) => {text.face = e.target.value; setSelectedZone({...selectedZone})}} />
                      <textarea cols="50" rows="5" value={text.text} onChange={(e) => {text.text = e.target.value; setSelectedZone({...selectedZone})}} />
                    </div>
                  )
                }
              </div>
            </div>
          </div>
      }
    </div>
  );
}

export default Zone;