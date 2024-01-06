import { createAsyncThunk } from '@reduxjs/toolkit';

const triggerCreateModeRoot = createAsyncThunk('categories/triggerCreateModeRoot', async () => {
  return 'create-root';
});

export { triggerCreateModeRoot };