import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setGridType } from 'store/MapList';
import { selectTile } from 'store/TilePallet';

const Category = () => {
  const dispatch = useDispatch();
  const selectedGridType = useSelector(state => state.MapList.selectedGridType);

  const change = (index) => {
    dispatch(setGridType({ type: index }));
    dispatch(selectTile({ tile: null }));
  }

  return (
    <div className="category_banner">
      <div className="category_banner_tabtable">
        <span className={clsx('category_banner_tab', selectedGridType===0 && 'actived')} onClick={() => change(0)}>타일</span>
        <span className={clsx('category_banner_tab', selectedGridType===1 && 'actived')} onClick={() => change(1)}>오브젝트1</span>
        <span className={clsx('category_banner_tab', selectedGridType===5 && 'actived')} onClick={() => change(5)}>오브젝트2</span>
        <span className={clsx('category_banner_tab', selectedGridType===6 && 'actived')} onClick={() => change(6)}>오브젝트3</span>
        <span className={clsx('category_banner_tab', selectedGridType===3 && 'actived')} onClick={() => change(3)}>문</span>
        <span className={clsx('category_banner_tab', selectedGridType===2 && 'actived')} onClick={() => change(2)}>대사</span>
        <span className={clsx('category_banner_tab', selectedGridType===4 && 'actived')} onClick={() => change(4)}>타일 확인</span>
      </div>
    </div>
  );
}

export default Category;