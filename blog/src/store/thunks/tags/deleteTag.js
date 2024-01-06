import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const deleteTag = createAsyncThunk('tags/delete', async ({tagId}) => {
  const response = await API.delete(`tags/${tagId}`);
  return response.data;
});

export { deleteTag };