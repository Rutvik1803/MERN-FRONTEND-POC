import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: '',
  snackbarStatus: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInReset: (state) => {
      state.snackbarStatus = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.snackbarStatus = false;
    },
    OAuthSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.snackbarStatus = true;
      state.error = action.payload;
      // we can do like state.error = action.payload to store the error
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  signInSuccess,
  signInFailure,
  signInReset,
  updateUserSuccess,
  signOutSuccess,
  OAuthSuccess,
} = userSlice.actions;

export default userSlice.reducer;
