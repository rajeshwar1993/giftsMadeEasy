import { ReduxAction } from '../../helpers/types';
import Filter from '../../models/Filter';

const initialState = new Filter();

const filtersReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default filtersReducer;
