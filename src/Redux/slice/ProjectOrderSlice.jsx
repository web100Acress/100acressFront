import { createSlice } from "@reduxjs/toolkit";

const projectOrderSlice = createSlice({
  name: "projectOrder",
  initialState: {
    // Store custom order for each builder
    customOrders: {},
    // Track which builders have custom orders defined
    buildersWithCustomOrder: {},
    // Store random seeds for consistent random ordering
    randomSeeds: {}
  },
  reducers: {
    // Set custom order for a builder
    setCustomOrder: (state, action) => {
      const { builderName, projectIds } = action.payload;
      state.customOrders[builderName] = projectIds;
      state.buildersWithCustomOrder[builderName] = true;
    },
    
    // Remove custom order for a builder (fallback to random)
    removeCustomOrder: (state, action) => {
      const { builderName } = action.payload;
      delete state.customOrders[builderName];
      delete state.buildersWithCustomOrder[builderName];
    },
    
    // Set random seed for a builder (for consistent random ordering)
    setRandomSeed: (state, action) => {
      const { builderName, seed } = action.payload;
      state.randomSeeds[builderName] = seed;
    },
    
    // Clear all custom orders
    clearAllCustomOrders: (state) => {
      state.customOrders = {};
      state.buildersWithCustomOrder = {};
    }
  },
});

export const { 
  setCustomOrder, 
  removeCustomOrder, 
  setRandomSeed, 
  clearAllCustomOrders 
} = projectOrderSlice.actions;

export default projectOrderSlice.reducer; 