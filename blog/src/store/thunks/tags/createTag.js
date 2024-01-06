import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const createTag = createAsyncThunk('tags/create', async (tagData) => {
  const response = await API.post(`tags`, tagData);
  return response.data;
});

export { createTag };