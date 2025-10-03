import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch active banners
export const fetchActiveBanners = createAsyncThunk(
  'banner/fetchActiveBanners',
  async (_, { rejectWithValue }) => {
    try {
      // Use environment-based API detection
      const isDevelopment = import.meta.env.DEV;
      const apiBase = isDevelopment 
        ? (import.meta.env.VITE_API_BASE || 'http://localhost:3500')
        : 'https://api.100acress.com';
      
      console.log('BannerSlice: fetchActiveBanners - Environment:', isDevelopment ? 'Development' : 'Production');
      console.log('BannerSlice: fetchActiveBanners - API Base:', apiBase);
      console.log('BannerSlice: fetchActiveBanners - Full URL:', `${apiBase}/api/banners/active`);
      
      const response = await fetch(`${apiBase}/api/banners/active`);
      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }
      const data = await response.json();
      return data.banners || [];
    } catch (error) {
      console.error('BannerSlice: fetchActiveBanners - Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch all banners (admin)
export const fetchAllBanners = createAsyncThunk(
  'banner/fetchAllBanners',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('myToken');

      // Use environment-based API detection
      const isDevelopment = import.meta.env.DEV;
      const apiBase = isDevelopment 
        ? (import.meta.env.VITE_API_BASE || 'http://localhost:3500')
        : 'https://api.100acress.com';
      
      console.log('BannerSlice: fetchAllBanners - Environment:', isDevelopment ? 'Development' : 'Production');
      console.log('BannerSlice: fetchAllBanners - API Base:', apiBase);
      console.log('BannerSlice: fetchAllBanners - Token:', token ? 'Present' : 'Missing');
      
      const response = await fetch(`${apiBase}/api/admin/banners`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }
      const data = await response.json();
      return data.banners || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    activeBanners: [],
    allBanners: [],
    currentBanner: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBanners: (state) => {
      state.activeBanners = [];
      state.allBanners = [];
      state.currentBanner = null;
      state.error = null;
    },
    setCurrentBanner: (state, action) => {
      state.currentBanner = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch active banners
      .addCase(fetchActiveBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.activeBanners = action.payload;
        state.error = null;
      })
      .addCase(fetchActiveBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all banners
      .addCase(fetchAllBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.allBanners = action.payload;
        state.error = null;
      })
      .addCase(fetchAllBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearBanners, setCurrentBanner, clearError } = bannerSlice.actions;
export default bannerSlice.reducer;
