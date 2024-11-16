import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const storedData = state.user;
      if (
        storedData &&
        storedData.email === email &&
        storedData.password === password
      ) {
        state.isLoggedIn = true;
        state.error = null;
      } else {
        state.error = "Invalid email or password.";
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = counterSlice.actions;
export default counterSlice.reducer;
