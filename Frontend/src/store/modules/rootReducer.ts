import { combineReducers } from 'redux';

import { usersReducer } from './users/reducer';
import { UserInitialState } from './users/reducer';

const rootReducer = combineReducers({
  users: usersReducer,
});

export type RootReducerType = typeof rootReducer;

export type RootStateType = {
  users: UserInitialState;
};

export default rootReducer;
