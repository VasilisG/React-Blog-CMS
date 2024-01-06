import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const register = createAsyncThunk('auth/register', async ({email, password}) => {
  const response = await API.post(`auth/register`, { email, password });
  return response.data.token;
});

export { register };