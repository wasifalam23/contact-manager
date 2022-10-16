import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
      if (token) state.isLoggedIn = true;
      if (!token) state.isLoggedIn = false;
    },

    logout(state) {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
