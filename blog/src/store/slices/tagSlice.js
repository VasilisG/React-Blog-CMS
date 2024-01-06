import { createSlice } from "@reduxjs/toolkit";
import { fetchTags, createTag, updateTag, deleteTag } from "../thunks/tags";
import { FILTER_INITIAL_STATE } from "../../components/tags/Constants";

const tagSlice = createSlice({
  name: 'tags',
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
    addFetchTagsCase(builder);
    addCreateTagCase(builder);
    addUpdateTagCase(builder);
    addDeleteTagCase(builder);
  }
});

/* Fetch tags case. */
const addFetchTagsCase = (builder) => {

  builder.addCase(fetchTags.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(fetchTags.fulfilled, (state, action) => {
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

  builder.addCase(fetchTags.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

/* Create tag case. */
const addCreateTagCase = (builder) => {

  builder.addCase(createTag.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(createTag.fulfilled, (state, action) => {
    state.isLoading = false;
  });

  builder.addCase(createTag.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

/* Update tag case. */
const addUpdateTagCase = (builder) => {

  builder.addCase(updateTag.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(updateTag.fulfilled, (state, action) => {
    state.isLoading = false;
  });

  builder.addCase(updateTag.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

/* Delete tag case. */
const addDeleteTagCase = (builder) => {

  builder.addCase(deleteTag.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(deleteTag.fulfilled, (state, action) => {
    state.isLoading = false;
  });

  builder.addCase(deleteTag.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

export const tagsReducer = tagSlice.reducer;