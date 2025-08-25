import api from '../../config/apiClient';

class ProjectOrderApi {
  // Throttle/backoff state (in-memory, per-tab)
  static _lastSyncAt = 0;
  static _nextAllowedAt = 0;
  static _inFlight = null;
  static _cache = null;
  static _THROTTLE_MS = 15000; // minimum gap between sync requests
  static _BACKOFF_MS = 60000;  // wait after 429
  // Get all project orders for sync
  static async getAllProjectOrdersForSync() {
    const now = Date.now();
    const defaultData = { customOrders: {}, buildersWithCustomOrder: {}, randomSeeds: {} };

    // Backoff window active
    if (now < ProjectOrderApi._nextAllowedAt) {
      console.warn('[ProjectOrderApi] Sync in backoff window; serving cache');
      return ProjectOrderApi._cache || defaultData;
    }

    // If a request is already in flight, reuse it
    if (ProjectOrderApi._inFlight) {
      return ProjectOrderApi._inFlight;
    }

    // Throttle: if recent and we have cache, return it
    if (now - ProjectOrderApi._lastSyncAt < ProjectOrderApi._THROTTLE_MS && ProjectOrderApi._cache) {
      return ProjectOrderApi._cache;
    }

    // Issue network request
    ProjectOrderApi._inFlight = api.get(`projectOrder/sync`)
      .then((response) => {
        const data = response?.data?.data || defaultData;
        ProjectOrderApi._cache = data;
        ProjectOrderApi._lastSyncAt = Date.now();
        return data;
      })
      .catch((error) => {
        console.error('Error fetching project orders for sync:', error);
        // 429 handling: set backoff window
        const status = error?.response?.status;
        if (status === 429) {
          ProjectOrderApi._nextAllowedAt = Date.now() + ProjectOrderApi._BACKOFF_MS;
          console.warn(`[ProjectOrderApi] Received 429. Backing off for ${ProjectOrderApi._BACKOFF_MS / 1000}s`);
        }
        return ProjectOrderApi._cache || defaultData;
      })
      .finally(() => {
        ProjectOrderApi._inFlight = null;
      });

    return ProjectOrderApi._inFlight;
  }

  // Get project order by builder name
  static async getProjectOrderByBuilder(builderName) {
    try {
      const response = await api.get(`projectOrder/builder/${builderName}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching project order for builder:', error);
      return null;
    }
  }

  // Save project order
  static async saveProjectOrder(builderName, customOrder, hasCustomOrder, randomSeed) {
    try {
      const response = await api.post(
        `projectOrder/save`,
        {
          builderName,
          customOrder,
          hasCustomOrder,
          randomSeed
        },
        {}
      );
      return response.data.data;
    } catch (error) {
      console.error('Error saving project order:', error);
      throw error;
    }
  }

  // Delete project order (reset to random)
  static async deleteProjectOrder(builderName) {
    try {
      const response = await api.delete(`projectOrder/builder/${builderName}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project order:', error);
      throw error;
    }
  }

  // Get all project orders (admin only)
  static async getAllProjectOrders() {
    try {
      const response = await api.get(`projectOrder/all`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all project orders:', error);
      throw error;
    }
  }
}

export default ProjectOrderApi;