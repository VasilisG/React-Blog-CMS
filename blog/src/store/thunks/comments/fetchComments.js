import { createAsyncThunk } from '@reduxjs/toolkit';
import { createQueryParams } from '../../../utils/queryParamHandler';
import API from '../../../utils/api';

const fetchComments = createAsyncThunk('comments/fetch', async ({ currentPage, filters, limit, sortField, sortOrder }) => {
  const queryParams = createQueryParams(currentPage, filters, limit, sortField, sortOrder);
  const response = await API.get(`comments${queryParams}`);
  return response.data;
});

export { fetchComments };