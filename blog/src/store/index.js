import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/postsSlice';
import { commentsReducer } from './slices/commentSlice';
import { tagsReducer } from './slices/tagSlice';
import { categoriesReducer } from './slices/categorySlice';
import { authReducer } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    categories: categoriesReducer,
    comments: commentsReducer,
    tags: tagsReducer,
    auth: authReducer
  },
});

export * from './thunks/posts/fetchPosts';
export * from './thunks/posts/createPost';
export * from './thunks/posts/deletePost';

export * from './thunks/categories/fetchCategories';
export * from './thunks/categories/getCategory';
export * from './thunks/categories/createCategory';
export * from './thunks/categories/updateCategory';
export * from './thunks/categories/deleteCategory';
export * from './thunks/categories/triggerCreateMode';
export * from './thunks/categories/triggerCreateModeRoot';

export * from './thunks/comments/fetchComments';
export * from './thunks/comments/updateComment';
export * from './thunks/comments/deleteComment';

export * from './thunks/tags/fetchTags';
export * from './thunks/tags/createTag';
export * from './thunks/tags/updateTag';
export * from './thunks/tags/deleteTag';

export * from './thunks/auth/register';
export * from './thunks/auth/login';
export * from './thunks/auth/logout';