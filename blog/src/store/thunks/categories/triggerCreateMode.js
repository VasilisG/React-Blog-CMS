import { createAsyncThunk } from '@reduxjs/toolkit';

const triggerCreateMode = createAsyncThunk('categories/triggerCreateMode', async () => {
  return 'create';
});

export { triggerCreateMode };