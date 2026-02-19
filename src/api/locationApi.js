import api from "../config/apiClient";

// State APIs
export const addState = async (stateName) => {
  try {
    const response = await api.post('/admin/states', { name: stateName });
    return response.data;
  } catch (error) {
    console.error('Error adding state:', error);
    throw error;
  }
};

export const getStates = async () => {
  try {
    const response = await api.get('/admin/states');
    return response.data;
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
};

// City APIs  
export const addCity = async (cityName) => {
  try {
    const response = await api.post('/admin/cities', { name: cityName });
    return response.data;
  } catch (error) {
    console.error('Error adding city:', error);
    throw error;
  }
};

export const getCities = async () => {
  try {
    const response = await api.get('/admin/cities');
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

// Country APIs
export const addCountry = async (countryName) => {
  try {
    const response = await api.post('/admin/countries', { name: countryName });
    return response.data;
  } catch (error) {
    console.error('Error adding country:', error);
    throw error;
  }
};

export const getCountries = async () => {
  try {
    const response = await api.get('/admin/countries');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
