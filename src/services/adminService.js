import axiosInstance from "./axiosInstance";

// =======================
// Users
// =======================
export const getAllUsers = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axiosInstance.get("/admin/users", config);
  return data;
};

export const deleteUser = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axiosInstance.delete(`/admin/users/${id}`, config);
  return data;
};

// =======================
// Stats
// =======================
export const getStats = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axiosInstance.get("/admin/stats", config);
  return data;
};

// =======================
// Orders
// =======================
export const getAllOrders = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axiosInstance.get("/admin/orders", config);
  return data;
};

export const updateOrderStatus = async (orderId, statusData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axiosInstance.put(`/admin/${orderId}/status`, statusData, config);
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