import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  message: string;
  type: 'info' | 'error';
  duration?: number;
}

const initialState: {
  isDesktop: boolean;
  signUpOpen: 'login' | 'signup' | false;
  inviteDialogOpen: boolean;
  toast: Toast | null;
} = {
  isDesktop: true,
  signUpOpen: false,
  inviteDialogOpen: false,
  toast: null
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
    },
    app_toggle_inviteDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.inviteDialogOpen = action.payload;
    },
    app_sendToast: (state, action: PayloadAction<Toast | null>) => {
      state.toast = action.payload;
    }
  }
});

export const {
  app_toggle_isDesktop,
  app_toggle_isSigupOpen,
  app_toggle_inviteDialogOpen,
  app_sendToast
} = appCommonSlice.actions;

export default appCommonSlice.reducer;
