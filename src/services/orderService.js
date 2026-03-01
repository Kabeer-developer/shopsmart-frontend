import axiosInstance from "./axiosInstance";

export const createOrder = async (orderData) => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axiosInstance.post("/orders", orderData, config);
  return response.data;
};

export const getUserOrders = async () => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axiosInstance.get("/orders/myorders", config);
  return response.data;
};

export const getOrderById = async (id) => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axiosInstance.get(`/orders/${id}`, config);
  return response.data;
};