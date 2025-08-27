import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],

  isSupportLoading: false,
  supportRequestList: [],
};

// Feature Image Thunks
export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
  `https://thecoffeeshop-server.onrender.com/api/common/feature/get`
    );
    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
  `https://thecoffeeshop-server.onrender.com/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

export const deleteFeatureImage = createAsyncThunk(
  'common/deleteFeatureImage',
  async (id) => {
  const response = await axios.delete(`https://thecoffeeshop-server.onrender.com/api/common/feature/delete/${id}`);
    return response.data;
  }
);

// Support Request Thunks
export const getSupportRequests = createAsyncThunk(
  'support/getSupportRequests',
  async () => {
  const response = await axios.get('https://thecoffeeshop-server.onrender.com/api/support');
    return response.data;
  }
);

export const deleteSupportRequest = createAsyncThunk(
  'support/deleteSupportRequest',
  async (id) => {
  await axios.delete(`https://thecoffeeshop-server.onrender.com/api/support/${id}`);
    return id;
  }
);

export const respondToSupportRequest = createAsyncThunk(
  'support/respondToSupportRequest',
  async ({ id, response }) => {
  const res = await axios.put(`https://thecoffeeshop-server.onrender.com/api/support/respond/${id}`, { response });
    return res.data.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Feature Image Reducers
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })

      // Support Request Reducers
      .addCase(getSupportRequests.pending, (state) => {
        state.isSupportLoading = true;
      })
      .addCase(getSupportRequests.fulfilled, (state, action) => {
        state.isSupportLoading = false;
        state.supportRequestList = action.payload;
      })
      .addCase(getSupportRequests.rejected, (state) => {
        state.isSupportLoading = false;
        state.supportRequestList = [];
      })

      .addCase(deleteSupportRequest.fulfilled, (state, action) => {
        state.supportRequestList = state.supportRequestList.filter(
          (req) => req._id !== action.payload
        );
      })

      .addCase(respondToSupportRequest.fulfilled, (state, action) => {
        state.supportRequestList = state.supportRequestList.map((req) =>
          req._id === action.payload._id ? action.payload : req
        );
      });
  },
});

export default commonSlice.reducer;
