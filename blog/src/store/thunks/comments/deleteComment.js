import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const deleteComment = createAsyncThunk('comments/delete', async ({commentId}) => {
  const response = await API.delete(`comments/${commentId}`);
  return response.data;
});

export { deleteComment };