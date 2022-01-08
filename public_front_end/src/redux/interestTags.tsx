import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import InterestTag from '../models/Interest';
import User from '../models/User';
import store from './store';

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
  name: 'interestTags',
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

      // TODO : optimization - save this in tagArray so that it doesn't need to be fetched while displaying
    },
    it_update_subInterestList: (
      state,
      action: PayloadAction<{
        subInterests: Array<InterestTag>;
        parentId: string;
      }>
    ) => {
      const { subInterests, parentId } = action.payload;
      state.tagHierarchyList = state.tagHierarchyList.map(hl => {
        if (hl.it.uid !== parentId) {
          return hl;
        }

        return {
          ...hl,
          subInterests
        };
      });
      // TODO : optimization - save these in tagArray so that it doesn't need to be fetched while displaying
    },
    it_add_tagArray: (state, action: PayloadAction<Array<InterestTag>>) => {
      state.tagArray = [...state.tagArray, ...action.payload];
    }
  }
});

export const {
  it_init_tagArray,
  it_init_HierarchyArray,
  it_add_tagArray,
  it_update_subInterestList
} = interestTagSlice.actions;

export default interestTagSlice.reducer;
