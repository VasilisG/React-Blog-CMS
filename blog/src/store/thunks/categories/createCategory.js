import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/api';

const createCategory = createAsyncThunk('categories/create', async (categoryData) => {
  const response = await API.postForm(`categories`, categoryData);
  return response.data;
});

export { createCategory };