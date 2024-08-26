import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { REGISTER_URL } from '../utils/apiendpoints';

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json(); 
      return data;
    } catch (error) {
      return rejectWithValue('Failed to register user');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default registerSlice.reducer;
