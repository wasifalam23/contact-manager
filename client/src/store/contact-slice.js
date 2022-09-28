import { createSlice } from '@reduxjs/toolkit';

const initialState = { contactData: [] };

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    storeData(state, action) {
      state.contactData = action.payload.contacts;
    },
  },
});

export const contactActions = contactSlice.actions;
export default contactSlice;
