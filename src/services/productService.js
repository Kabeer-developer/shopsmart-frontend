import axios from "axios";

const API_BASE = "http://localhost:5000/api/products/";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return user?.token;
};

// 🛍 Product Services
export const getProducts = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_BASE}${id}`);
  return res.data;
};

export const createProduct = async (productData) => {
  const token = getToken();
  const res = await axios.post(API_BASE, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const token = getToken();
  const res = await axios.put(`${API_BASE}${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const token = getToken();
  const res = await axios.delete(`${API_BASE}${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📝 Review Services
export const addReview = async (productId, reviewData) => {
  const token = getToken();
  const res = await axios.post(`${API_BASE}${productId}/reviews`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getReviews = async (productId) => {
  const res = await axios.get(`${API_BASE}${productId}/reviews`);
  return res.data;
};
