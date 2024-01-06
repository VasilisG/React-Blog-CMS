import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchCategories, 
  getCategory, 
  createCategory, 
  updateCategory, 
  deleteCategory, 
  triggerCreateMode,
  triggerCreateModeRoot 
} from "../thunks/categories";

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    currentCategory: null,
    mode: 'create',
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    addFetchCategoriesCase(builder);
    addGetCategoryCase(builder);
    addCreateCategoryCase(builder);
    addUpdateCategoryCase(builder);
    addDeleteCategoryCase(builder);
    addTriggerCreateModeCase(builder);
    addTriggerCreateModeRootCase(builder);
  }
});

const addFetchCategoriesCase = (builder) => {
  builder.addCase(fetchCategories.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(fetchCategories.fulfilled, (state, action) => {
    state.isLoading = false;
    state.data = action.payload.data;
  });

  builder.addCase(fetchCategories.rejected, (state, action) => {
    state.isLoading = false;
    state.data = [];
    state.error = action.payload;
  });
}

const addGetCategoryCase = (builder) => {
  builder.addCase(getCategory.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(getCategory.fulfilled, (state, action) => {
    state.isLoading = false;
    state.currentCategory = action.payload.data;
    state.mode = 'edit';
  });

  builder.addCase(getCategory.rejected, (state, action) => {
    state.isLoading = false;
    state.currentCategory = null;
    state.error = action.payload;
  });
}

const addCreateCategoryCase = (builder) => {
  builder.addCase(createCategory.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(createCategory.fulfilled, (state, action) => {
    state.isLoading = false;
    state.currentCategory = action.payload.data;
    state.mode = 'edit';
  });

  builder.addCase(createCategory.rejected, (state, action) => {
    state.isLoading = false;
    state.currentCategory = null;
    state.error = action.payload;
  });
}

const addUpdateCategoryCase = (builder) => {
  builder.addCase(updateCategory.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(updateCategory.fulfilled, (state, action) => {
    state.isLoading = false;
    state.currentCategory = action.payload.data;
    state.mode = 'edit';
  });

  builder.addCase(updateCategory.rejected, (state, action) => {
    state.isLoading = false;
    state.currentCategory = null;
    state.error = action.payload;
  });
}

const addDeleteCategoryCase = (builder) => {
  builder.addCase(deleteCategory.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(deleteCategory.fulfilled, (state, action) => {
    state.isLoading = false;
    state.currentCategory = action.payload.data;
    state.mode = 'edit';
  });

  builder.addCase(deleteCategory.rejected, (state, action) => {
    state.isLoading = false;
    state.currentCategory = null;
    state.error = action.payload;
  });
}

const addTriggerCreateModeCase = (builder) => {
  builder.addCase(triggerCreateMode.fulfilled, (state, action) => {
    state.mode = 'create';
  });
}

const addTriggerCreateModeRootCase = (builder) => {
  builder.addCase(triggerCreateModeRoot.fulfilled, (state, action) => {
    state.mode = 'create';
    state.currentCategory = null;
  });
}

export const categoriesReducer = categorySlice.reducer;