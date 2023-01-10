import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    idToken: null,
    isLoggedIn: false,
    isEmailVerified: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.email = null;
      state.idToken = null;
      state.isLoggedIn = !!state.idToken;
      state.error = null;
      localStorage.removeItem("auth");
    },
    setAuth: (state, action) => {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
      state.isLoggedIn = !!state.idToken;
      state.error = null;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          email: state.email,
          idToken: state.idToken,
        })
      );
    },
    setEmailVerified: (state, action) => {
      state.isEmailVerified = action.payload;
    },
    getAuth: (state) => {
      const AUTH = localStorage.getItem("auth");
      if (AUTH) {
        const parsedAuth = JSON.parse(AUTH);
        state.email = parsedAuth.email;
        state.idToken = parsedAuth.idToken;
        state.isLoggedIn = !!parsedAuth.idToken;
      }
    },

    setResErr: (state, action) => {
      state.error = action.payload;
    },
    clearResErr: (state) => {
      state.error = null;
    },
  },
});

export const {
  logout,
  setAuth,
  getAuth,
  setEmailVerified,
  setResErr,
  clearResErr,
} = authSlice.actions;
export default authSlice.reducer;
