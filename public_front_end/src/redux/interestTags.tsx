import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import InterestTag from '../models/Interest';
import User from '../models/User';

const initialState: {
  tagArray: Array<InterestTag>;
  tagHierarchyList: Array<{
    it: InterestTag;
    subInterests: Array<InterestTag>;
  }>;
} = {
  tagArray: [],
  tagHierarchyList: []
};

export const interestTagSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    it_init_tagArray: (state, action: PayloadAction<Array<InterestTag>>) => {
      state.tagArray = action.payload;
    },
    it_init_HierarchyArray: (
      state,
      action: PayloadAction<
        Array<{
          it: InterestTag;
          subInterests: Array<InterestTag>;
        }>
      >
    ) => {
      state.tagHierarchyList = action.payload;
    },
    it_add_tagArray: (state, action: PayloadAction<Array<InterestTag>>) => {
      state.tagArray = [...state.tagArray, ...action.payload];
    }
  }
});

export const { it_init_tagArray, it_init_HierarchyArray, it_add_tagArray } =
  interestTagSlice.actions;

export default interestTagSlice.reducer;
