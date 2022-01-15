import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './user';
import interestsReducer from './interestTags';
import circleUserReducer from './myCircleList';
import appReducer from './appCommon';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    interests: interestsReducer,
    circleUser: circleUserReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
