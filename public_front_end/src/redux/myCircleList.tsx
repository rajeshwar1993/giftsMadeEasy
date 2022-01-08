import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CircleUser from '../models/CircleUser';

const initialState: Array<CircleUser> = [];

export const circleUserSlice = createSlice({
  name: 'circleUser',
  initialState,
  reducers: {
    cu_init: (state, action: PayloadAction<Array<CircleUser>>) => {
      state = action.payload;
    },
    cu_addUser: (state, action: PayloadAction<CircleUser>) => {
      state = [...state, action.payload];
    },
    cu_removeUser: (state, action: PayloadAction<CircleUser>) => {
      state = state.filter(s => s.uid !== action.payload.uid);
    }
  }
});

export const { cu_init, cu_addUser, cu_removeUser } = circleUserSlice.actions;

export default circleUserSlice.reducer;
