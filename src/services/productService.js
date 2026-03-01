import axiosInstance from "./axiosInstance";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return user?.token;
};

// 🛍 Product Services
export const getProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (productData) => {
  const token = getToken();
  const res = await axiosInstance.post("/products", productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const token = getToken();
  const res = await axiosInstance.put(`/products/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const token = getToken();
  const res = await axiosInstance.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📝 Review Services
export const addReview = async (productId, reviewData) => {
  const token = getToken();
  const res = await axiosInstance.post(`/products/${productId}/reviews`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getReviews = async (productId) => {
  const res = await axiosInstance.get(`/products/${productId}/reviews`);
  return res.data;
};