import { createSlice } from "@reduxjs/toolkit";
import { fetchComments, updateComment } from "../thunks/comments";
import { FILTER_INITIAL_STATE } from "../../components/comments/Constants";

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    data: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
    filters: FILTER_INITIAL_STATE,
    sortField: '',
    sortOrder: '',
    isLoading: false,
    error: null
  },
  extraReducers(builder) {
    addFetchCommentsCase(builder);
    addUpdateCommentCase(builder);
  }
});

const addFetchCommentsCase = (builder) => {

  builder.addCase(fetchComments.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(fetchComments.fulfilled, (state, action) => {
    state.isLoading = false;
    state.data = action.payload.data;
    state.total = action.payload.total;
    state.totalPages = action.payload.pagination.totalPages;
    state.pageSize = action.payload.pagination.limit;
    state.currentPage = action.payload.pagination.page;
    state.filters = {
      ...FILTER_INITIAL_STATE,
      ...action.payload.filters
    };
    state.sortField = action.payload.sort;
    state.sortOrder = action.payload.order;
  });

  builder.addCase(fetchComments.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

}

const addUpdateCommentCase = (builder) => {

  builder.addCase(updateComment.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(updateComment.fulfilled, (state, action) => {
    state.isLoading = false;
  });

  builder.addCase(updateComment.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

export const commentsReducer = commentsSlice.reducer;