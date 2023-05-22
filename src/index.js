import { createRoot } from 'react-dom/client';
import App from 'App';
import 'index.css';
import { Provider } from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Items from 'store/Items';
import MapList from 'store/MapList';
import TilePallet from 'store/TilePallet';

const rootReducer = combineReducers({
  MapList,
  TilePallet,
});
const store = configureStore({
  reducer : rootReducer, // 리듀서 들을 정의합니다.
  // middleware: [ // 미들웨어를 정의해주도록 합니다.
  //   promiseMiddleware({ promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE'] })
  // ],
  devTools: process.env.NODE_ENV !== 'production', // devTool 의 옵션을 선택합니다.
})

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Provider store={store}><App /></Provider>);