import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const updateProfile = createAsyncThunk('profile/update', async (profileData) => {
  const response = await API.putForm(`profile`, profileData);
  return response.data;
});

export { updateProfile };