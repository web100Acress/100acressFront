import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchActiveSideBanners = createAsyncThunk(
  'sideBanner/fetchActiveSideBanners',
  async (_, { rejectWithValue }) => {
    try {
      const isDevelopment = import.meta.env.DEV;
      const apiBase = isDevelopment
        ? (import.meta.env.VITE_API_BASE || 'http://localhost:3500')
        : 'https://api.100acress.com';

      const response = await fetch(`${apiBase}/api/side-banners/active`);
      if (!response.ok) {
        throw new Error('Failed to fetch side banners');
      }
      const data = await response.json();
      return data.sideBanners || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllSideBanners = createAsyncThunk(
  'sideBanner/fetchAllSideBanners',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('myToken');
      console.log('fetchAllSideBanners called with token:', token ? 'exists' : 'missing');

      const isDevelopment = import.meta.env.DEV;
      const apiBase = isDevelopment
        ? (import.meta.env.VITE_API_BASE || 'http://localhost:3500')
        : 'https://api.100acress.com';

      console.log('Fetching side banners from:', `${apiBase}/api/admin/side-banners`);

      const response = await fetch(`${apiBase}/api/admin/side-banners`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Side banners fetch response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Side banners fetch error:', errorText);
        throw new Error('Failed to fetch side banners');
      }

      const data = await response.json();
      console.log('Side banners data received:', data);
      return data.sideBanners || [];
    } catch (error) {
      console.error('fetchAllSideBanners error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const sideBannerSlice = createSlice({
  name: 'sideBanner',
  initialState: {
    activeSideBanners: [],
    allSideBanners: [],
    currentSideBanner: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSideBanners: (state) => {
      state.activeSideBanners = [];
      state.allSideBanners = [];
      state.currentSideBanner = null;
      state.error = null;
    },
    setCurrentSideBanner: (state, action) => {
      state.currentSideBanner = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveSideBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveSideBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.activeSideBanners = action.payload;
        state.error = null;
      })
      .addCase(fetchActiveSideBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllSideBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSideBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.allSideBanners = action.payload;
        state.error = null;
      })
      .addCase(fetchAllSideBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSideBanners, setCurrentSideBanner, clearError } = sideBannerSlice.actions;
export default sideBannerSlice.reducer;
