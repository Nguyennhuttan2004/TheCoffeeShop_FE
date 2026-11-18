
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  stats: {
    averageReview: 0,
    totalReviews: 0,
    ratingBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  },
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    try {
      const response = await axios.post(
        `https://thecoffeeshop-server.onrender.com/api/shop/review/add`,
        formdata,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Không thể gửi đánh giá",
      };
    }
  }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const response = await axios.get(
  `https://thecoffeeshop-server.onrender.com/api/shop/review/${id}`
  );

  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
        state.stats = action.payload.stats || state.stats;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
