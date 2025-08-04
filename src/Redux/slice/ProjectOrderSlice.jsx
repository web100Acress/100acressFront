import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectOrderApi from "../utils/ProjectOrderApi";

// Async thunks for API operations
export const syncProjectOrdersFromServer = createAsyncThunk(
  'projectOrder/syncFromServer',
  async () => {
    const data = await ProjectOrderApi.getAllProjectOrdersForSync();
    return data;
  }
);

export const saveProjectOrderToServer = createAsyncThunk(
  'projectOrder/saveToServer',
  async ({ builderName, customOrder, hasCustomOrder, randomSeed }) => {
    const data = await ProjectOrderApi.saveProjectOrder(builderName, customOrder, hasCustomOrder, randomSeed);
    return { builderName, data };
  }
);

export const deleteProjectOrderFromServer = createAsyncThunk(
  'projectOrder/deleteFromServer',
  async ({ builderName }) => {
    await ProjectOrderApi.deleteProjectOrder(builderName);
    return { builderName };
  }
);

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
    },

    // Sync from server (immediate local update)
    syncFromServer: (state, action) => {
      const { customOrders, buildersWithCustomOrder, randomSeeds } = action.payload;
      state.customOrders = { ...state.customOrders, ...customOrders };
      state.buildersWithCustomOrder = { ...state.buildersWithCustomOrder, ...buildersWithCustomOrder };
      state.randomSeeds = { ...state.randomSeeds, ...randomSeeds };
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle sync from server
      .addCase(syncProjectOrdersFromServer.fulfilled, (state, action) => {
        const { customOrders, buildersWithCustomOrder, randomSeeds } = action.payload;
        
        // Only update if the content has actually changed to prevent unnecessary re-renders
        let hasChanges = false;
        
        // Check if customOrders has changed
        if (JSON.stringify(state.customOrders) !== JSON.stringify(customOrders)) {
          state.customOrders = customOrders;
          hasChanges = true;
        }
        
        // Check if buildersWithCustomOrder has changed
        if (JSON.stringify(state.buildersWithCustomOrder) !== JSON.stringify(buildersWithCustomOrder)) {
          state.buildersWithCustomOrder = buildersWithCustomOrder;
          hasChanges = true;
        }
        
        // Check if randomSeeds has changed
        if (JSON.stringify(state.randomSeeds) !== JSON.stringify(randomSeeds)) {
          state.randomSeeds = randomSeeds;
          hasChanges = true;
        }
        
        if (hasChanges) {
          console.log('🔍 Project order state updated from server');
        } else {
          console.log('🔍 Project order state unchanged from server');
        }
      })
      // Handle save to server
      .addCase(saveProjectOrderToServer.fulfilled, (state, action) => {
        // Local state is already updated, just log success
        console.log('Project order saved to server successfully');
      })
      // Handle delete from server
      .addCase(deleteProjectOrderFromServer.fulfilled, (state, action) => {
        const { builderName } = action.payload;
        delete state.customOrders[builderName];
        delete state.buildersWithCustomOrder[builderName];
        console.log('Project order deleted from server successfully');
      });
  }
});

export const { 
  setCustomOrder, 
  removeCustomOrder, 
  setRandomSeed, 
  clearAllCustomOrders,
  syncFromServer
} = projectOrderSlice.actions;

export default projectOrderSlice.reducer; 