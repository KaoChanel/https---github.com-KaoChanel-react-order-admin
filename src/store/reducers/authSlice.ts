import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../Interfaces/AuthState';

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('status'),
  token: localStorage.getItem('token'),
  currentUser: {
    email: 'mail@example.com',
    picture: null
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, {payload}) => {
      state.isLoggedIn = true;
      state.token = payload;
      localStorage.setItem('status', "Y");
      localStorage.setItem('token', payload);
    },
    logoutUser: (state) => {
      state.currentUser = {};
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('status');
      localStorage.removeItem('token');
    },
    loadUser: (state, {payload}) => {
      state.currentUser = payload;
    }
  }
});

export const {loginUser, logoutUser, loadUser} = authSlice.actions;

export default authSlice.reducer;
