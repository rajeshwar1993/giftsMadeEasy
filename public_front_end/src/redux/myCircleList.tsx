import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CircleUser from '../models/CircleUser';

const initialState: { list: Array<CircleUser> } = { list: [] };

export const circleUserSlice = createSlice({
  name: 'circleUser',
  initialState,
  reducers: {
    cu_init: (state, action: PayloadAction<Array<CircleUser>>) => {
      state.list = [...action.payload];
    },
    cu_addUser: (state, action: PayloadAction<CircleUser>) => {
      state.list = [...state.list, action.payload];
    },
    cu_removeUser: (state, action: PayloadAction<CircleUser>) => {
      state.list = state.list.filter(s => s.uid !== action.payload.uid);
    }
  }
});

export const { cu_init, cu_addUser, cu_removeUser } = circleUserSlice.actions;

export default circleUserSlice.reducer;
