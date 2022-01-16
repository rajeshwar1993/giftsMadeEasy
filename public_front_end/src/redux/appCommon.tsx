import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isDesktop: boolean;
  signUpOpen: 'login' | 'signup' | false;
} = {
  isDesktop: true,
  signUpOpen: false
};

export const appCommonSlice = createSlice({
  name: 'appCommon',
  initialState,
  reducers: {
    app_toggle_isDesktop: (state, action: PayloadAction<boolean>) => {
      state.isDesktop = action.payload;
    },
    app_toggle_isSigupOpen: (
      state,
      action: PayloadAction<'login' | 'signup' | false>
    ) => {
      state.signUpOpen = action.payload;
    }
  }
});

export const { app_toggle_isDesktop, app_toggle_isSigupOpen } =
  appCommonSlice.actions;

export default appCommonSlice.reducer;
