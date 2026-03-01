import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);

  if (response.data && response.data.token) {
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  }

  return response.data;
};

export const getProfile = async (token) => {
  if (!token) throw new Error("No token provided");

  const response = await axiosInstance.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateProfile = async (token, updatedData) => {
  if (!token) throw new Error("No token provided");

  const response = await axiosInstance.put("/auth/profile", updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};