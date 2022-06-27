import { getAuthUser, removeAuthUser } from '@/services/AuthenticationService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IAuthResponse,
  ILoggedUser,
} from 'src/models/Authentication/Authentication.models';

import store, { RootState } from './store';

export const logginOut = () => {
  removeAuthUser();
  store.dispatch(logout());
};

const initialState: ILoggedUser = getAuthUser();

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IAuthResponse>) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.logged = true;
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.logged = false;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
