import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getUserOrders, getOrderById } from "../../services/orderService";

const initialState = {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
};

export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async (orderData, thunkAPI) => {
    try {
      return await createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, thunkAPI) => {
    try {
      return await getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id, thunkAPI) => {
    try {
      return await getOrderById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => { state.loading = true; })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderById.pending, (state) => { state.loading = true; })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
