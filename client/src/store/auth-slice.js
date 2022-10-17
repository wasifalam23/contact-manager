import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loggedInSuccess: false,
  signUpSuccess: false,
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

    checkLogInSuccess(state, action) {
      state.loggedInSuccess = action.payload;
    },

    checkSignUpSuccess(state, action) {
      state.signUpSuccess = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
