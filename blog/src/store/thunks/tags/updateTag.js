import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const updateTag = createAsyncThunk('tags/update', async ({tagData, tagId}) => {
  const response = await API.put(`tags/${tagId}`, tagData);
  return response.data;
});

export { updateTag };