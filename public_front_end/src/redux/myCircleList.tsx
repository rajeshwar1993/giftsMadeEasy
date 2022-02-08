import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CircleUserType from '../models/CircleUser';

const initialState: { list: Array<CircleUserType> } = { list: [] };

export const circleUserSlice = createSlice({
  name: 'circleUser',
  initialState,
  reducers: {
    cu_init: (state, action: PayloadAction<Array<CircleUserType>>) => {
      state.list = [...action.payload];
    },
    cu_addUser: (state, action: PayloadAction<CircleUserType>) => {
      state.list = [...state.list, action.payload];
    },
    cu_removeUser: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(s => s.docid !== action.payload);
    }
  }
});

export const { cu_init, cu_addUser, cu_removeUser } = circleUserSlice.actions;

export default circleUserSlice.reducer;
