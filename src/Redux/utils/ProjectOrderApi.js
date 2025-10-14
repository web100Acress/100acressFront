import api from '../../config/apiClient';

class ProjectOrderApi {
  // Throttle/backoff state (in-memory, per-tab)
  static _lastSyncAt = 0;
  static _nextAllowedAt = 0;
  static _inFlight = null;
  static _cache = null;
  static _THROTTLE_MS = 15000; // minimum gap between sync requests
  static _BACKOFF_MS = 60000;  // wait after 429
  // Save retry/timeout config
  static _SAVE_TIMEOUT_MS = 15000; // 15s timeout per attempt
  static _SAVE_MAX_ATTEMPTS = 3;

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
    const body = { builderName, customOrder, hasCustomOrder, randomSeed };
    let attempt = 0;
    let lastError = null;
    while (attempt < ProjectOrderApi._SAVE_MAX_ATTEMPTS) {
      attempt += 1;
      try {
        // Enforce per-request timeout without aborting the underlying request
        const response = await ProjectOrderApi._withTimeout(
          api.post(`projectOrder/save`, body, {}),
          ProjectOrderApi._SAVE_TIMEOUT_MS
        );
        return response.data.data;
      } catch (error) {
        lastError = error;
        const status = error?.response?.status;
        const isTimeout = error?.code === 'ETIMEDOUT' || /timeout/i.test(error?.message || '');
        const isNetwork = !status; // network error or CORS
        const isServer = status >= 500;
        const isTooMany = status === 429;

        // On 429, set backoff window as in sync logic
        if (isTooMany) {
          ProjectOrderApi._nextAllowedAt = Date.now() + ProjectOrderApi._BACKOFF_MS;
          console.warn(`[ProjectOrderApi] Save hit 429. Backing off for ${ProjectOrderApi._BACKOFF_MS / 1000}s`);
        }

        const retryable = isTimeout || isNetwork || isServer || isTooMany;
        if (attempt < ProjectOrderApi._SAVE_MAX_ATTEMPTS && retryable) {
          const backoffMs = Math.min(5000, 1000 * attempt * attempt); // 1s, 4s
          console.warn(`[ProjectOrderApi] Save attempt ${attempt} failed (${status || error?.code || 'ERR'}). Retrying in ${backoffMs}ms...`);
          await ProjectOrderApi._delay(backoffMs);
          continue;
        }
        console.error('Error saving project order:', error);
        throw error;
      }
    }
    // Exhausted attempts
    throw lastError;
  }

  static async _withTimeout(promise, timeout) {
    let timer;
    try {
      return await Promise.race([
        promise,
        new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error('Timeout')), timeout);
        })
      ]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  static async _delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
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