import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  dataPostedSuccess: false,
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
      state.dataPostedSuccess = false;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setDataPostedSuccess(state, action) {
      state.dataPostedSuccess = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
