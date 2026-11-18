
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
        const reviews = Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
        const ratingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        reviews.forEach((review) => {
          const rating = Number(review.reviewValue);
          if (rating >= 1 && rating <= 5) {
            ratingBreakdown[rating] += 1;
          }
        });

        const totalReviews = reviews.length;
        const averageReview =
          totalReviews > 0
            ? reviews.reduce(
                (sum, review) => sum + Number(review.reviewValue || 0),
                0
              ) / totalReviews
            : 0;

        state.reviews = reviews;
        state.stats = {
          averageReview,
          totalReviews,
          ratingBreakdown,
        };
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
