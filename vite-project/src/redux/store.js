import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storageFromLibrary from 'redux-persist/lib/storage';

import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';

const storage = storageFromLibrary.default || storageFromLibrary;


function migrateSavedState(savedState) {
  if (!savedState) {
    return savedState;
  }

  if (Array.isArray(savedState.contacts)) {
    return savedState;
  }

  const oldContacts = savedState.contacts && savedState.contacts.contacts;

  return {
    ...savedState,
    contacts: oldContacts || [],
  };
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
  version: 3,
  migrate: createMigrate({
    3: migrateSavedState,
  }),
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    });
  },
});

export const persistor = persistStore(store);
