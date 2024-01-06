import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const updateComment = createAsyncThunk('comments/update', async ({commentId, enabled}) => {
  const response = await API.put(`comments/${commentId}`, {enabled});
  return response.data;
});

export { updateComment };