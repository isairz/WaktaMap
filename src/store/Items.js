import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from 'lib/api'
import { Jobs, ItemType } from 'lib/utility';

const name = 'items';

export const getItems = createAsyncThunk(
    `${name}/getItems`, // 액션 이름을 정의해 주도록 합니다.
    async () => {
      const response = await api.getItems();
      return response.data
    }
)

const itemsSlice = createSlice({
  name,
  initialState :  {
    list: [],
    stats: {},
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getItems.pending.type]: (state, action) => { // 호출 전
      console.log(getItems.pending.type, action);
      state.loading = true;
    },
    [getItems.fulfilled.type]: (state, action) => { // 성공
      console.log(getItems.fulfilled.type, action);
      state.loading = false;
      //state.list = action.payload;

      const itemStats = { };
      ItemType.forEach(type => itemStats[type] = {})

      const characterStats = { };
      Object.keys(Jobs).forEach(key => {
        const grows = Jobs[key];
        grows.forEach(grow => {
          characterStats[key+'_'+grow] = {}
          ItemType.forEach(type => characterStats[key+'_'+grow][type] = [])
        });
      })

      action.payload.forEach(item => {
        const id = item['itemId'];
        const type = item['itemTypeDetail'];

        Object.keys(item['stats']).forEach(key => {
          if (!characterStats[key]) return;
          const stats = item['stats'][key];
          characterStats[key][type].push({
            itemId: id,
            ...stats
          })
        })

        delete item['itemId'];
        delete item['type'];
        delete item['stats'];
        itemStats[type][id] = { ...item, };
      })

      state.list = itemStats;
      state.stats = characterStats;
    },
    [getItems.rejected.type]: (state, action) => {  // 실패
      console.log(getItems.rejected.type, action);
      state.loading = false;
    },
  }
});

export default itemsSlice.reducer