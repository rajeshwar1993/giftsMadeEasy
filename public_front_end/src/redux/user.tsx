import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/User';

type UserState = {
  data: User | null;
  loading: boolean;
  error: null | {
    message: string;
  };
};

const initialState: UserState = {
  data: null,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ur_setLoading: (state, action: PayloadAction<boolean>) => {
      state.error = null;
      state.loading = action.payload;
    },
    ur_init: (state, action: PayloadAction<User>) => {
      state.error = null;
      state.loading = false;
      state.data = action.payload;
    },
    ur_setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = {
        message: action.payload
      };
    },
    ur_updateUser: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      const { key, value } = action.payload;
      state.data = state.data ? state.data.updateData(key, value) : state.data;
    },
    ur_updateBookmarks: (
      state,
      action: PayloadAction<{ productID: any; toDo: 'add' | 'remove' }>
    ) => {
      const { productID, toDo } = action.payload;
      state.data = state.data
        ? state.data.updateBookmark(productID, toDo)
        : state.data;
    },
    ur_logout: state => {
      state.error = null;
      state.loading = false;
      state.data = null;
    }
  }
});

export const {
  ur_init,
  ur_setLoading,
  ur_setError,
  ur_updateUser,
  ur_updateBookmarks,
  ur_logout
} = userSlice.actions;

export default userSlice.reducer;
