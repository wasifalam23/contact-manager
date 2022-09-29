import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoading: false, error: null, isSuccess: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },

    setError(state, action) {
      state.error = action.payload.error;
    },

    setIsSuccess(state, action) {
      state.isSuccess = action.payload.isSuccess;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
