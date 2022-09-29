import { configureStore } from '@reduxjs/toolkit';
import contactSlice from './contact-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: { contact: contactSlice.reducer, ui: uiSlice.reducer },
});

export default store;
