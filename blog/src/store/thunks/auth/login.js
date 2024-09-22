import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await API.post(`auth/login`, { email, password });
    return response.data;
  } catch (err) {
    if(err.response && err.response.data) {
      return rejectWithValue({data: err.response.data});
    }
    return rejectWithValue({
      success: false,
      error: 'Something went wrong'
    });
  }
});

export { login };