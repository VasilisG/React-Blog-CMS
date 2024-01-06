import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const updatePost = createAsyncThunk('posts/update', async ({postId, postData}) => {
  const response = await API.putForm(`posts/${postId}`, postData);
  return response.data;
});

export { updatePost };