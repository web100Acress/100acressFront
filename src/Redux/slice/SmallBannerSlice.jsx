import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch active small banners
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

// Async thunk to fetch all small banners (admin)
export const fetchAllSmallBanners = createAsyncThunk(
  'smallBanner/fetchAllSmallBanners',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('myToken');
      // Use local API for testing, production API for live
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiBase = isLocalhost 
        ? (import.meta.env.VITE_API_BASE || 'http://localhost:3500')
        : 'https://api.100acress.com';
      console.log('SmallBannerSlice: fetchAllSmallBanners - API Base:', apiBase);
      console.log('SmallBannerSlice: fetchAllSmallBanners - Token:', token ? 'Present' : 'Missing');
      
      const response = await fetch(`${apiBase}/api/admin/small-banners`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('SmallBannerSlice: fetchAllSmallBanners - Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('SmallBannerSlice: fetchAllSmallBanners - Error response:', errorText);
        throw new Error(`Failed to fetch small banners: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log('SmallBannerSlice: fetchAllSmallBanners - Response data:', data);
      return data.banners || [];
    } catch (error) {
      console.error('SmallBannerSlice: fetchAllSmallBanners - Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to create small banner (admin)
export const createSmallBanner = createAsyncThunk(
  'smallBanner/createSmallBanner',
  async (bannerData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('myToken');
      const formData = new FormData();
      
      // Append all fields to FormData
      Object.keys(bannerData).forEach(key => {
        if (bannerData[key] !== null && bannerData[key] !== undefined) {
          formData.append(key, bannerData[key]);
        }
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/small-banners/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create small banner');
      }
      
      const data = await response.json();
      return data.smallBanner;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update small banner (admin)
export const updateSmallBanner = createAsyncThunk(
  'smallBanner/updateSmallBanner',
  async ({ id, bannerData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('myToken');
      const formData = new FormData();
      
      // Append all fields to FormData
      Object.keys(bannerData).forEach(key => {
        if (bannerData[key] !== null && bannerData[key] !== undefined) {
          formData.append(key, bannerData[key]);
        }
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/small-banners/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update small banner');
      }
      
      const data = await response.json();
      return data.smallBanner;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete small banner (admin)
export const deleteSmallBanner = createAsyncThunk(
  'smallBanner/deleteSmallBanner',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('myToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/small-banners/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete small banner');
      }
      
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to toggle small banner status (admin)
export const toggleSmallBannerStatus = createAsyncThunk(
  'smallBanner/toggleSmallBannerStatus',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('myToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/small-banners/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to toggle small banner status');
      }
      
      const data = await response.json();
      return data.smallBanner;
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
    currentSmallBanner: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSmallBanners: (state) => {
      state.activeSmallBanners = [];
      state.allSmallBanners = [];
      state.currentSmallBanner = null;
      state.error = null;
    },
    setCurrentSmallBanner: (state, action) => {
      state.currentSmallBanner = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch active small banners
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
      // Fetch all small banners
      .addCase(fetchAllSmallBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSmallBanners.fulfilled, (state, action) => {
        console.log('SmallBannerSlice: fetchAllSmallBanners.fulfilled - Payload:', action.payload);
        state.loading = false;
        state.allSmallBanners = action.payload;
        state.error = null;
      })
      .addCase(fetchAllSmallBanners.rejected, (state, action) => {
        console.log('SmallBannerSlice: fetchAllSmallBanners.rejected - Error:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      // Create small banner
      .addCase(createSmallBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSmallBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.allSmallBanners.push(action.payload);
        state.error = null;
      })
      .addCase(createSmallBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update small banner
      .addCase(updateSmallBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSmallBanner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allSmallBanners.findIndex(banner => banner._id === action.payload._id);
        if (index !== -1) {
          state.allSmallBanners[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateSmallBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete small banner
      .addCase(deleteSmallBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSmallBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.allSmallBanners = state.allSmallBanners.filter(banner => banner._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteSmallBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle small banner status
      .addCase(toggleSmallBannerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSmallBannerStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allSmallBanners.findIndex(banner => banner._id === action.payload._id);
        if (index !== -1) {
          state.allSmallBanners[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(toggleSmallBannerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSmallBanners, setCurrentSmallBanner, clearError } = smallBannerSlice.actions;
export default smallBannerSlice.reducer;
