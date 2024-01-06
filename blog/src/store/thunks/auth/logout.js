import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const logout = createAsyncThunk('auth/logout', async () => {
  const response = await API.post(`auth/logout`, {});
  return response.data;
});

export { logout };