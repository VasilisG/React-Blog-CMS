import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const createPost = createAsyncThunk('posts/create', async (postData) => {
  //https://axios-http.com/docs/multipart
  const response = await API.postForm(`posts`, postData);
  return response.data;
});

export { createPost };