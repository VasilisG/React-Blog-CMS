import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from '../thunks/auth';
import { getCookie } from "../../utils/cookies";
import { 
  BLOG_COOKIE_EMAIL, 
  BLOG_COOKIE_LAST_LOGIN, 
  BLOG_COOKIE_NAME, 
  BLOG_COOKIE_PASSWORD_RESET_EXPIRE, 
  BLOG_COOKIE_PASSWORD_RESET_TOKEN 
} from "../../config/env";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: getCookie(BLOG_COOKIE_EMAIL),
    token: getCookie(BLOG_COOKIE_NAME),
    resetPasswordToken: getCookie(BLOG_COOKIE_PASSWORD_RESET_TOKEN),
    resetPasswordTokenExpire: getCookie(BLOG_COOKIE_PASSWORD_RESET_EXPIRE),
    isLoggedIn: getCookie(BLOG_COOKIE_EMAIL) && getCookie(BLOG_COOKIE_NAME),
    lastLogin: getCookie(BLOG_COOKIE_LAST_LOGIN),
    isLoading: false,
    error: null
  },
  extraReducers(builder){
    addRegisterCase(builder);
    addLoginCase(builder);
    addLogoutCase(builder);
  }
});

const addRegisterCase = (builder) => {
  builder.addCase(register.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(register.fulfilled, (state, action) => {
    state.isLoading = false;
    state.email = action.payload.email;
    state.token = action.payload.token;
    state.lastLogin = action.payload.last_login;
    state.isLoggedIn = true;
  });

  builder.addCase(register.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

const addLoginCase = (builder) => {
  builder.addCase(login.pending, (state, action) => {
    state.isLoading = true;
    state.error = null;
  });

  builder.addCase(login.fulfilled, (state, action) => {
    state.isLoading = false;
    state.email = action.payload.email;
    state.token = action.payload.token;
    state.lastLogin = action.payload.last_login;
    state.isLoggedIn = true;
  });

  builder.addCase(login.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload.error || action.payload.data.error;
  });
}

const addLogoutCase = (builder) => {
  builder.addCase(logout.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(logout.fulfilled, (state, action) => {
    state.isLoading = false;
    state.email = null;
    state.token = null;
    state.last_login = null;
    state.isLoggedIn = false;
  });

  builder.addCase(logout.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

export const authReducer = authSlice.reducer;