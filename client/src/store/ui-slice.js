import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  requestIsSuccess: false,
  toastMessage: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    hideToastBar(state, action) {
      state.error = null;
      state.requestIsSuccess = false;
      state.toastMessage = null;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setRequestIsSuccess(state, action) {
      state.requestIsSuccess = action.payload.isSuccess;
      state.toastMessage = action.payload.message;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
