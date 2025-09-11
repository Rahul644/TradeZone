import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const executeDBOperation = async (operation, data = null) => {
  try {
    const response = await axios[operation.method](
      `${API_BASE_URL}/${operation.endpoint}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const userService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password
      });
      return response.data;
    } catch (error) {
      console.error('User login error:', error);
      throw error;
    }
  },
  checkUsername: async (username) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?username=${username}`);
      return response.data;
    } catch (error) {
      console.error('Username check error:', error);
      throw error;
    }
  },
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        ...userData,
        role: 'user',
        status: 'active'
      });
      return response.data;
    } catch (error) {
      console.error('User registration error:', error);
      throw error;
    }
  },
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
};

export const adminService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    }
  },
  register: async (adminData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        ...adminData,
        role: 'admin',
        status: 'active'
      });
      return response.data;
    } catch (error) {
      console.error('Admin registration error:', error);
      throw error;
    }
  }
};

export default {
  userService,
  adminService
};
