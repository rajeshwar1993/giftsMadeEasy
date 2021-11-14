import { combineReducers } from 'redux';
import { filtersReducer, productsReducer, userReducer } from './reducers';

const root = combineReducers({
  user: userReducer,
  filters: filtersReducer,
  products: productsReducer
});

export default root;
