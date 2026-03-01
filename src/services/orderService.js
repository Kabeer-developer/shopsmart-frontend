import axios from "axios";

const API_URL = "http://localhost:5000/api/orders/";

export const createOrder = async (orderData) => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

export const getUserOrders = async () => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`${API_URL}myorders`, config);
  return response.data;
};

export const getOrderById = async (id) => {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`${API_URL}${id}`, config);
  return response.data;
};
