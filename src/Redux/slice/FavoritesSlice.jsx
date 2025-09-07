import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const property = action.payload;
      const existingIndex = state.favorites.findIndex(item => item.id === property.id);
      if (existingIndex === -1) {
        state.favorites.push(property);
      }
    },
    removeFromFavorites: (state, action) => {
      const propertyId = action.payload;
      state.favorites = state.favorites.filter(item => item.id !== propertyId);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    }
  }
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
