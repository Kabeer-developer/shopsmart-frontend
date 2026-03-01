import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productService from "../../services/productService";

// ✅ Fetch all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Fetch product by ID
export const fetchProductById = createAsyncThunk("products/fetchById", async (id, thunkAPI) => {
  try {
    return await productService.getProductById(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Create product (Admin)
export const createNewProduct = createAsyncThunk("products/create", async (productData, thunkAPI) => {
  try {
    return await productService.createProduct(productData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Update product (Admin)
export const editProduct = createAsyncThunk("products/edit", async ({ id, productData }, thunkAPI) => {
  try {
    return await productService.updateProduct(id, productData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ✅ Delete product (Admin)
export const removeProduct = createAsyncThunk("products/remove", async (id, thunkAPI) => {
  try {
    return await productService.deleteProduct(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ⭐ Add review
export const addProductReview = createAsyncThunk(
  "products/addReview",
  async ({ productId, reviewData }, thunkAPI) => {
    try {
      return await productService.addReview(productId, reviewData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ⭐ Fetch reviews
export const fetchProductReviews = createAsyncThunk(
  "products/fetchReviews",
  async (productId, thunkAPI) => {
    try {
      return await productService.getReviews(productId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    reviews: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProductState: (state) => {
      state.product = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all products
      .addCase(fetchProducts.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.products = a.payload; })
      .addCase(fetchProducts.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // 🔹 Fetch product by ID
      .addCase(fetchProductById.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProductById.fulfilled, (s, a) => { s.loading = false; s.product = a.payload; })
      .addCase(fetchProductById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // 🔹 Create, Update, Delete
      .addCase(createNewProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.products.unshift(a.payload);
        s.success = true;
      })
      .addCase(editProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.products = s.products.map(p => p._id === a.payload._id ? a.payload : p);
        s.success = true;
      })
      .addCase(removeProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.products = s.products.filter(p => p._id !== a.meta.arg);
        s.success = true;
      })

      // ⭐ Reviews
      .addCase(addProductReview.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(addProductReview.fulfilled, (s, a) => {
        s.loading = false;
        s.success = true;
        s.reviews.unshift(a.payload);
      })
      .addCase(addProductReview.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchProductReviews.fulfilled, (s, a) => {
        s.loading = false;
        s.reviews = a.payload;
      })
      .addCase(fetchProductReviews.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
