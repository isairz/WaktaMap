import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const name = 'tilePallet';

const tilePalletSlice = createSlice({
  name,
  initialState :  {
    tiles: window['runConfig']['tiles'],
    button: window['runConfig']['button'],
    moon: window['runConfig']['moon'],
    objects: window['runConfig']['objects'],
    selected: undefined,
  },
  reducers: {
    selectTile: (state, action) => {
      const { tile } = action.payload;
      state.selected = tile;
    }
  },
  extraReducers: {
  }
});

export const { selectTile } = tilePalletSlice.actions;

export default tilePalletSlice.reducer