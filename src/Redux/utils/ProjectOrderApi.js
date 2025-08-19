import axios from 'axios';

const API_BASE_URL = '';

class ProjectOrderApi {
  // Get all project orders for sync
  static async getAllProjectOrdersForSync() {
    try {
      const response = await axios.get(`${API_BASE_URL}/projectOrder/sync`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching project orders for sync:', error);
      // Return default structure instead of throwing
      return {
        customOrders: {},
        buildersWithCustomOrder: {},
        randomSeeds: {}
      };
    }
  }

  // Get project order by builder name
  static async getProjectOrderByBuilder(builderName) {
    try {
      const response = await axios.get(`${API_BASE_URL}/projectOrder/builder/${builderName}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching project order for builder:', error);
      return null;
    }
  }

  // Save project order
  static async saveProjectOrder(builderName, customOrder, hasCustomOrder, randomSeed) {
    try {
      const token = localStorage.getItem('myToken');
      const response = await axios.post(
        `${API_BASE_URL}/projectOrder/save`,
        {
          builderName,
          customOrder,
          hasCustomOrder,
          randomSeed
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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
      const token = localStorage.getItem('myToken');
      const response = await axios.delete(
        `${API_BASE_URL}/projectOrder/builder/${builderName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting project order:', error);
      throw error;
    }
  }

  // Get all project orders (admin only)
  static async getAllProjectOrders() {
    try {
      const token = localStorage.getItem('myToken');
      const response = await axios.get(
        `${API_BASE_URL}/projectOrder/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all project orders:', error);
      throw error;
    }
  }
}

export default ProjectOrderApi; 