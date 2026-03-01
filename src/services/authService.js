import axios from "axios";

// Backend API base URL
const API_URL = "http://localhost:5000/api/auth/";

export const registerUser = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", userData);

  if (response.data && response.data.token) {
    localStorage.setItem("userInfo", JSON.stringify(response.data)); // token is saved
  }

  return response.data;
};


export const getProfile = async (token) => {
  if (!token) throw new Error("No token provided");

  const response = await axios.get("http://localhost:5000/api/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateProfile = async (token, updatedData) => {
  if (!token) throw new Error("No token provided");

  const response = await axios.put("http://localhost:5000/api/auth/profile", updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};


