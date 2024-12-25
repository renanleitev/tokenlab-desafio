import { persistStore } from 'redux-persist';
import persistedReducers from './modules/reduxPersist';
import { configureStore, ThunkDispatch, Action } from '@reduxjs/toolkit';
import rootReducer, { type RootStateType } from './modules/rootReducer';

const store = configureStore({
  reducer: persistedReducers(rootReducer),
});

export type AppThunkDispatch = ThunkDispatch<RootStateType, void, Action>;

export const persistor = persistStore(store);

export default store;
