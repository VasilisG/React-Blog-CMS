import { createSlice } from "@reduxjs/toolkit";
import { createPost, updatePost, deletePost, fetchPosts } from "../thunks/posts";
import { FILTER_INITIAL_STATE } from "../../components/posts/Constants";

const postsSlice = createSlice({
  name: 'posts',
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
    addFetchPostsCase(builder);
    addCreatePostCase(builder);
    addUpdatePostCase(builder);
    addDeletePostCase(builder);
  }
});

/* Fetch posts case. */
const addFetchPostsCase = (builder) => {

  builder.addCase(fetchPosts.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(fetchPosts.fulfilled, (state, action) => {
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

  builder.addCase(fetchPosts.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

/* Create post case. */
const addCreatePostCase = (builder) => {

  builder.addCase(createPost.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(createPost.fulfilled, (state, action) => {
    state.isLoading = false;
  });

  builder.addCase(createPost.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

/* Update post case. */
const addUpdatePostCase = (builder) => {

  builder.addCase(updatePost.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(updatePost.fulfilled, (state, action) => {
    state.isLoading = false;
  });

  builder.addCase(updatePost.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

/* Delete post case. */
const addDeletePostCase = (builder) => {

  builder.addCase(deletePost.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(deletePost.fulfilled, (state, action) => {
    state.isLoading = false;
  });

  builder.addCase(deletePost.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

export const postsReducer = postsSlice.reducer;