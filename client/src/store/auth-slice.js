import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      localStorage.setItem('token', token);
      if (token) state.isLoggedIn = true;
    },

    stayLoggedIn(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
        state.token = '';
      }
    },

    logout(state) {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
