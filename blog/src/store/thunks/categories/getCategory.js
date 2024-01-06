import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/api';

const getCategory = createAsyncThunk('categories/get', async ({id}) => {
  const response = await API.get(`categories/${id}`);
  return response.data;
});

export { getCategory };