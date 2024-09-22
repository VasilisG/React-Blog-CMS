import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, updateProfile } from "../thunks/profile";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    fullname: '',
    description: '',
    image: '',
    isLoading: false,
    error: null
  },
  extraReducers(builder){
    addFetchProfileCase(builder);
    addUpdateProfileCase(builder);
  }
});

const addFetchProfileCase = (builder) => {
  builder.addCase(fetchProfile.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(fetchProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.fullname = action.payload.data.fullname;
    state.description = action.payload.data.description;
    state.image = action.payload.data.image;
    state.error = null;
  });

  builder.addCase(fetchProfile.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

const addUpdateProfileCase = (builder) => {
  builder.addCase(updateProfile.pending, (state, action) => {
    state.isLoading = true;
  });

  builder.addCase(updateProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.fullname = action.payload.data.fullname;
    state.description = action.payload.data.description;
    state.image = action.payload.data.image;
    state.error = null;
  });

  builder.addCase(updateProfile.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
}

export const profileReducer = profileSlice.reducer;