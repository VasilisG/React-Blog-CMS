import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const deletePost = createAsyncThunk('posts/delete', async ({postId}) => {
  const response = await API.delete(`posts/${postId}`);
  return response.data;
});

export { deletePost };