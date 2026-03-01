import axios from "axios";

const API_BASE = "http://localhost:5000/api/products";

const getAuthConfig = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user?.token) throw new Error("No token found, please login again");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
};

// ✅ Add a review
export const addReview = async (productId, reviewData) => {
  const config = getAuthConfig();
  const res = await axios.post(`${API_BASE}/${productId}/reviews`, reviewData, config);
  return res.data;
};

// ✅ Get all reviews
export const getReviews = async (productId) => {
  const res = await axios.get(`${API_BASE}/${productId}/reviews`);
  return res.data;
};
