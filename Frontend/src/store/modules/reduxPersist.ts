import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { type RootReducerType } from '../modules/rootReducer';

export default (reducers: RootReducerType) => {
  const persistedReducers = persistReducer(
    {
      key: 'tokenlab',
      storage,
      whitelist: ['users'],
    },
    reducers,
  );
  return persistedReducers;
};
