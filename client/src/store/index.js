import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import contactSlice from './contact-slice';

const store = configureStore({
  reducer: { contact: contactSlice.reducer, auth: authSlice.reducer },
});

export default store;
