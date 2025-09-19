import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simple async thunk for testing
export const fetchActiveSmallBanners = createAsyncThunk(
  'smallBanner/fetchActiveSmallBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/small-banners/active`);
      if (!response.ok) {
        throw new Error('Failed to fetch small banners');
      }
      const data = await response.json();
      return data.banners || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllSmallBanners = createAsyncThunk(
  'smallBanner/fetchAllSmallBanners',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('myToken');
      
      // Try admin endpoint first
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/small-banners`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          return data.banners || [];
        }
      } catch (adminError) {
        console.log('Admin endpoint failed, trying public endpoint:', adminError);
      }
      
      // Fallback to public endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/small-banners/active`);
      if (!response.ok) {
        throw new Error('Failed to fetch small banners');
      }
      const data = await response.json();
      return data.banners || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const smallBannerSlice = createSlice({
  name: 'smallBanner',
  initialState: {
    activeSmallBanners: [],
    allSmallBanners: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSmallBanners: (state) => {
      state.activeSmallBanners = [];
      state.allSmallBanners = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveSmallBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
            .addCase(fetchActiveSmallBanners.fulfilled, (state, action) => {
              state.loading = false;
              state.activeSmallBanners = action.payload;
              state.error = null;
            })
      .addCase(fetchActiveSmallBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllSmallBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSmallBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.allSmallBanners = action.payload;
        state.error = null;
      })
      .addCase(fetchAllSmallBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSmallBanners, clearError } = smallBannerSlice.actions;
export default smallBannerSlice.reducer;