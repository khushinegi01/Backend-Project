import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../services/UserService';

// Fetch current user from backend (cookie-based session)
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getUserProfile(); // use your service
      return user; // goes into action.payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
