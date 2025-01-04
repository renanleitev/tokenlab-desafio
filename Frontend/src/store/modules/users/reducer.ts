import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';

import { type User } from '../../../types/User';
import { API_URL } from '../../../config/api';

export const initialUser: User = {
  id: 0,
  email: '',
};

export type UserInitialState = {
  isLoggedIn: boolean;
  isRegistered: boolean;
  fetchStatus: 'SUCCESS' | 'PENDING' | 'FAILURE' | '';
  errorLogin: string;
  errorRegister: string;
  user: User;
  users: User[];
};

export const initialState: UserInitialState = {
  isLoggedIn: false,
  isRegistered: false,
  fetchStatus: '',
  errorLogin: '',
  errorRegister: '',
  user: initialUser,
  users: [],
};

// Função para registro de usuário
export const register = createAsyncThunk(
  'users/register',
  async (user: User) => {
    const { email, senha, confirmarSenha } = user;
    // Validação dos campos (email, senha e confirmar senha)
    if (!email || !senha || !confirmarSenha) {
      throw new Error('Por favor, preencha todos os campos.');
    }
    if (senha !== confirmarSenha) {
      throw new Error('As senhas não coincidem.');
    }
    try {
      const response = await axios.post(`${API_URL}/auth/register`, user);
      return {
        id: response.data?.id,
        token: response.data?.token,
        email: user.email,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        throw new Error(errorMessage);
      } else {
        throw new Error('Erro ao efetuar cadastro. Tente novamente.');
      }
    }
  },
);

// Função para login de usuário
export const login = createAsyncThunk('users/login', async (user: User) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, user);
    return {
      id: response.data?.id,
      token: response.data?.token,
      email: user.email,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      throw new Error(errorMessage);
    } else {
      throw new Error('Erro ao realizar login. Tente novamente.');
    }
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.isRegistered = false;
      state.user = initialUser;
      state.fetchStatus = 'PENDING';
      state.errorLogin = '';
      state.errorRegister = '';
      state.users = [];
    },
  },
  extraReducers(builder) {
    builder
      // register
      .addCase(register.fulfilled, (state, action) => {
        state.fetchStatus = 'SUCCESS';
        state.user = { ...action.payload };
        state.isLoggedIn = false;
        state.isRegistered = true;
        state.errorRegister = '';
        state.errorLogin = '';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.pending, (state) => {
        state.fetchStatus = 'PENDING';
      })
      .addCase(register.rejected, (state, action) => {
        state.fetchStatus = 'FAILURE';
        state.isRegistered = false;
        state.errorRegister = action.error.message || 'Error';
        state.user = initialUser;
      })
      // login
      .addCase(login.fulfilled, (state, action) => {
        state.fetchStatus = 'SUCCESS';
        state.user = { ...action.payload };
        state.isLoggedIn = true;
        state.isRegistered = true;
        state.errorRegister = '';
        state.errorLogin = '';
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.pending, (state) => {
        state.fetchStatus = 'PENDING';
      })
      .addCase(login.rejected, (state, action) => {
        state.fetchStatus = 'FAILURE';
        state.errorLogin = action.error.message || 'Error';
        state.user = initialUser;
      });
  },
});

export const { logoutUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
