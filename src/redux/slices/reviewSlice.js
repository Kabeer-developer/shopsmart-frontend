import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewService from "../../services/reviewService";

// ✅ Add review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ productId, rating, comment }, thunkAPI) => {
    try {
      return await reviewService.addReview(productId, { rating, comment });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Fetch reviews for a product
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId, thunkAPI) => {
    try {
      return await reviewService.getReviews(productId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearReviewState(state) {
      state.reviews = [];
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // addReview
      .addCase(addReview.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.success = false;
      })
      .addCase(addReview.fulfilled, (s, a) => {
        s.loading = false;
        s.reviews.unshift(a.payload);
        s.success = true;
      })
      .addCase(addReview.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // fetchReviews
      .addCase(fetchReviews.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchReviews.fulfilled, (s, a) => {
        s.loading = false;
        s.reviews = a.payload;
      })
      .addCase(fetchReviews.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
