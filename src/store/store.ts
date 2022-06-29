import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { createWrapper } from 'next-redux-wrapper';

import authReducer, { logout } from './authSlice';
import shiftInfoReducer from './shiftInfoSlice';
import taxInfoReducer from './taxInfoSlice';
import categoryReducer from './categoriesSlice';
import productReducer from './productsSlice';
import newOrderReducer from './newOrderSlice';
import saleReducer from './salesSlice';
import generalInfoReducer from './generalInfoSlice';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [
    'auth',
    'category',
    'product',
    'newOrder',
    'taxInfo',
    'shiftInfo',
    'generalInfo',
    'sale',
  ],
  timeout: undefined,
};

const appReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  newOrder: newOrderReducer,
  taxInfo: taxInfoReducer,
  shiftInfo: shiftInfoReducer,
  sale: saleReducer,
  generalInfo: generalInfoReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === 'RESET') {
    return appReducer(undefined, { type: undefined });
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
export const wrapper = createWrapper(makeStore);
