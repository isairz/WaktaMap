import { createAction, createSlice } from '@reduxjs/toolkit'
import { setCookie, getCookie } from 'lib/utility';
import _ from 'lodash';

const name = 'mapList';

const mapListSlice = createSlice({
  name,
  initialState :  {
    // mapList: [],
    selectedMap: {
      name: 'name',
      size: { x: 100, y: 25 },
      grid: Array.from({length: 25}, () => Array.from({length: 100}, () => null)),
      grid_object: Array.from({length: 25}, () => Array.from({length: 100}, () => null)),
      grid_object2: Array.from({length: 25}, () => Array.from({length: 100}, () => null)),
      grid_object3: Array.from({length: 25}, () => Array.from({length: 100}, () => null)),
      grid_moon: Array.from({length: 25}, () => Array.from({length: 100}, () => null)),
      zone_text: [],
    },
    selectedGridType: 0,
  },
  reducers: {
    getMapList: (state, action) => {
      try {
        state.mapList = JSON.parse(getCookie('mapList') || '[]');
      } catch {
        state.mapList = [];
      }
    },
    setMapList: (state, action) => {
      const { mapList } = action.payload;
      console.log(mapList, JSON.stringify(mapList));
      setCookie('mapList', JSON.stringify(mapList));
    },
    getMap: (state, action) => {
      const { map } = action.payload;
      const mapobject = JSON.parse(map);
      const { x, y } = mapobject.size;
      state.selectedMap = {
        name: 'name',
        size: { x: x, y: y },
        grid: Array.from({length: y}, () => Array.from({length: x}, () => null)),
        grid_object: Array.from({length: y}, () => Array.from({length: x}, () => null)),
        grid_object2: Array.from({length: y}, () => Array.from({length: x}, () => null)),
        grid_object3: Array.from({length: y}, () => Array.from({length: x}, () => null)),
        grid_moon: Array.from({length: y}, () => Array.from({length: x}, () => null)),
        zone_text: [],
        ...mapobject,
      };
    },
    setMap: (state, action) => {
      const { mapList } = action.payload;
      console.log(mapList, JSON.stringify(mapList));
      setCookie('mapList', JSON.stringify(mapList));
    },
    addMap: (state, action) => {
      const { name } = action.payload;

      if (!name || _.isEmpty(name) || state.mapList.find(map => map.name === name)) return;

      const grid = Array.from({length: 50}, () => Array.from({length: 50}, () => null));

      state.mapList.push({
        name: name,
        grid: grid,
      });
    },
    changeMap: (state, action) => {
      const { name, map } = action.payload;

      console.log('map', map);
      //const _map = state.mapList.find(map => map.name === name);
      state.selectedMap = map;
    },
    deleteMap: (state, action) => {
      const { map } = action.payload;

      _.remove(state.mapList, (_map) => _map.name === map.name);
      if (map.name === state.selectedMap.name) state.selectedMap = undefined;
    },
    selectMap: (state, action) => {
      const { map } = action.payload;
      state.selectedMap = map;
    },
    saveMap: (state, action) => {
      const { gridName, grid } = action.payload;
      state.selectedMap[gridName] = grid;
    },
    setGridType: (state, action) => {
      const { type } = action.payload;
      state.selectedGridType = parseInt(type);
    }
  },
  extraReducers: {
  }
});

export const { getMap, setMap, saveMap, getMapList, setMapList, addMap, changeMap, selectMap, deleteMap, setGridType } = mapListSlice.actions;

export default mapListSlice.reducer