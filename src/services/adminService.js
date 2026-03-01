import axios from "axios";

const BASE_URL = "http://localhost:5000";
const API_URL = `${BASE_URL}/api/admin`;

// =======================
// Users
// =======================
export const getAllUsers = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.get(`${API_URL}/users`, config);
  return data;
};

export const deleteUser = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.delete(`${API_URL}/users/${id}`, config);
  return data;
};

// =======================
// Stats
// =======================
export const getStats = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.get(`${API_URL}/stats`, config);
  return data;
};

// =======================
// Orders
// =======================
export const getAllOrders = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.get(`${API_URL}/orders`, config);
  return data;
};

export const updateOrderStatus = async (orderId, statusData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.put(`${API_URL}/${orderId}/status`, statusData, config);
  return data;
};

// Export default object
const adminService = {
  getAllUsers,
  deleteUser,
  getStats,
  getAllOrders,
  updateOrderStatus,
};

export default adminService;
