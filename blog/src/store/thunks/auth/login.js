import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await API.post(`auth/login`, { email, password });
  return response.data;
});

export { login };