import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const fetchProfile = createAsyncThunk('profile/fetch', async () => {
  const response = await API.get(`profile`);
  return response.data;
});

export { fetchProfile };