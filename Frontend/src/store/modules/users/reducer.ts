import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { type User } from '../../../types/User';
import { API_URL } from '../../../config/api';

export const initialUser: User = {
  id: 0,
  email: '',
  senha: '',
};

export type UserInitialState = {
  isLoggedIn: boolean;
  fetchStatus: 'SUCCESS' | 'PENDING' | 'FAILURE' | '';
  error: string;
  user: User;
  users: User[];
};

export const initialState: UserInitialState = {
  isLoggedIn: false,
  fetchStatus: '',
  error: '',
  user: initialUser,
  users: [],
};

// Função para registro de usuário
export const register = createAsyncThunk(
  'users/register',
  async (user: User) => {
    const response = await axios.post(`${API_URL}/auth/register`, user);
    return { ...response.data, ...user };
  },
);

// Função para registro de usuário
export const login = createAsyncThunk('users/login', async (user: User) => {
  const response = await axios.post(`${API_URL}/auth/login`, user);
  return { ...response.data, ...user };
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = initialUser;
      state.fetchStatus = 'PENDING';
      state.error = '';
      state.users = [];
    },
  },
  extraReducers(builder) {
    builder
      // register
      .addCase(register.fulfilled, (state, action) => {
        state.fetchStatus = 'SUCCESS';
        state.user = { ...action.payload };
        state.isLoggedIn = true;
        state.error = '';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.pending, (state) => {
        state.fetchStatus = 'PENDING';
      })
      .addCase(register.rejected, (state, action) => {
        state.fetchStatus = 'FAILURE';
        state.error = action.error.message || 'Error';
        state.user = initialUser;
      })
      // login
      .addCase(login.fulfilled, (state, action) => {
        state.fetchStatus = 'SUCCESS';
        state.user = { ...action.payload };
        state.isLoggedIn = true;
        state.error = '';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.pending, (state) => {
        state.fetchStatus = 'PENDING';
      })
      .addCase(login.rejected, (state, action) => {
        state.fetchStatus = 'FAILURE';
        state.error = action.error.message || 'Error';
        state.user = initialUser;
      });
  },
});

export const { logoutUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
