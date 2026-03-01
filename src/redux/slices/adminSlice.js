import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "../../services/adminService";

const initialState = {
  users: [],
  orders: [],
  stats: {},
  loading: false,
  error: null,
};

// =======================
// Thunks
// =======================
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await adminService.getAllUsers(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await adminService.deleteUser(id, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getStats = createAsyncThunk("admin/getStats", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await adminService.getStats(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getAllOrders = createAsyncThunk("admin/getAllOrders", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await adminService.getAllOrders(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, statusData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.updateOrderStatus(orderId, statusData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// =======================
// Slice
// =======================
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Users
      .addCase(getAllUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getAllUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(getAllUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(deleteUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.meta.arg);
      })
      .addCase(deleteUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Stats
      .addCase(getStats.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getStats.fulfilled, (state, action) => { state.loading = false; state.stats = action.payload; })
      .addCase(getStats.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Orders
      .addCase(getAllOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getAllOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(getAllOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateOrderStatus.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default adminSlice.reducer;
