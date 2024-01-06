import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/api';

const updateCategory = createAsyncThunk('categories/update', async ({categoryId, categoryData}) => {
  //https://axios-http.com/docs/multipart
  const response = await API.putForm(`categories/${categoryId}`, categoryData);
  return response.data;
});

export { updateCategory };