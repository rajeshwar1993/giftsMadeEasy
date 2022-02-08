import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserType from '../models/User';

const initialState: {
  userGiftSearchLink: { [key: string]: string };
  userList: { [key: string]: UserType };
} = {
  userGiftSearchLink: {},
  userList: {}
};

export const simpleListsSlice = createSlice({
  name: 'simpleLists',
  initialState,
  reducers: {
    sl_addUserToList: (
      state,
      action: PayloadAction<{ [key: string]: UserType }>
    ) => {
      state.userList = {
        ...state.userList,
        ...action.payload
      };
    },
    sl_removeUserFromList: (state, action: PayloadAction<string>) => {
      delete state.userList[action.payload];
    }
  }
});

export const { sl_addUserToList, sl_removeUserFromList } =
  simpleListsSlice.actions;

export default simpleListsSlice.reducer;
