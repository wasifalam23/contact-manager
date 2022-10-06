import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  requestIsSuccess: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    setRequestIsSuccess(state, action) {
      state.requestIsSuccess = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
