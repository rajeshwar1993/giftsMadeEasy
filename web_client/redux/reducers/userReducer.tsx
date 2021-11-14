import { ReduxAction } from '../../helpers/types';
import User from '../../models/User';

const initialState = new User();

const userReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
