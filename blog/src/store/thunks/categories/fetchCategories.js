import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/api';

const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const response = await API.get(`categories/tree`);
  return response.data;
});

export { fetchCategories };