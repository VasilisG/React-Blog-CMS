import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../utils/api';

const deleteCategory = createAsyncThunk('categories/delete', async({categoryId}) => {
  const response = await API.delete(`categories/${categoryId}`);
  return response.data;
});

export { deleteCategory };