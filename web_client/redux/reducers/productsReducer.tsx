import { ReduxAction } from '../../helpers/types';
import Product from '../../models/Product';

const initialState = new Product();

const productReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productReducer;
