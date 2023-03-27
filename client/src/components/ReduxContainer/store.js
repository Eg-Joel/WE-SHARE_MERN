import { combineReducers,configureStore } from '@reduxjs/toolkit'
import   userReducer  from './useReducer'
import adminReducer from './adminReducer'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'




const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const userPersistedReducer = persistReducer(persistConfig, userReducer)
const adminLoginPersistedReducer = persistReducer(persistConfig, adminReducer);

const rootReducer = combineReducers({
  user: userPersistedReducer,
  admin: adminLoginPersistedReducer,
  
});

export let store= configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)