import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewed: []
};

const viewedSlice = createSlice({
  name: 'viewed',
  initialState,
  reducers: {
    addToViewed: (state, action) => {
      const property = action.payload;
      const existingIndex = state.viewed.findIndex(item => item.id === property.id);
      if (existingIndex !== -1) {
        // Remove existing entry to move it to the front
        state.viewed.splice(existingIndex, 1);
      }
      // Add to the beginning of the array (most recent first)
      state.viewed.unshift(property);
      // Keep only the last 50 viewed items
      if (state.viewed.length > 50) {
        state.viewed = state.viewed.slice(0, 50);
      }
    },
    clearViewed: (state) => {
      state.viewed = [];
    }
  }
});

export const { addToViewed, clearViewed } = viewedSlice.actions;
export default viewedSlice.reducer;
