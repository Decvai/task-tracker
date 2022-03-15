import localforage from 'localforage';
import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { authReducer } from '../features/auth/authSlice';

const rootPersistConfig = {
  key: 'root',
  storage: localforage,
  whitelist: []
};

const authPersistConfig = {
  key: 'auth',
  storage: localforage,
  whitelist: ['token']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
