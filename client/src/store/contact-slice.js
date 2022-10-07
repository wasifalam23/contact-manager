import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactData: [],
  deleteContactId: null,
  reqHasChanged: false,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    storeData(state, action) {
      state.contactData = action.payload;
    },

    setDeleteContactId(state, action) {
      state.deleteContactId = action.payload;
    },

    setReqHasChanged(state, action) {
      state.reqHasChanged = !state.reqHasChanged;
    },
  },
});

export const contactActions = contactSlice.actions;
export default contactSlice;
