import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { userGiftSearchLink: { [key: string]: string } } = {
  userGiftSearchLink: {}
};

export const simpleListsSlice = createSlice({
  name: 'simpleLists',
  initialState,
  reducers: {
    sl_addUserGiftSearchLink: (
      state,
      action: PayloadAction<{ [key: string]: string }>
    ) => {
      state.userGiftSearchLink = {
        ...state.userGiftSearchLink,
        ...action.payload
      };
    },
    sl_removeUserGiftSearchLink: (state, action: PayloadAction<string>) => {
      delete state.userGiftSearchLink[action.payload];
    }
  }
});

export const { sl_addUserGiftSearchLink, sl_removeUserGiftSearchLink } =
  simpleListsSlice.actions;

export default simpleListsSlice.reducer;
