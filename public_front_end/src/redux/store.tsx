import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './user';
import circleUserReducer from './myCircleList';
import appReducer from './appCommon';
import productsReducer from './productList';
import simpleListsReducer from './simpleLists';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    circleUser: circleUserReducer,
    products: productsReducer,
    simpleLists: simpleListsReducer
  },
  devTools: process.env.NODE_ENV === 'development'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
