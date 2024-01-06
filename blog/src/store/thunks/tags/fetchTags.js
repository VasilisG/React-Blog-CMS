import { createAsyncThunk } from '@reduxjs/toolkit';
import { createQueryParams } from '../../../utils/queryParamHandler';
import API from '../../../utils/api';

const fetchTags = createAsyncThunk('tags/fetch', async ({ currentPage, filters, limit, sortField, sortOrder }) => {
  const queryParams = createQueryParams(currentPage, filters, limit, sortField, sortOrder);
  const response = await API.get(`tags${queryParams}`);
  return response.data;
});

export { fetchTags };