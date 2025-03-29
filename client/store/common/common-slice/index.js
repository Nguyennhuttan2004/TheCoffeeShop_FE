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
      `http://localhost:5000/api/common/feature/get`
    );
    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

export const deleteFeatureImage = createAsyncThunk(
  'common/deleteFeatureImage',
  async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/common/feature/delete/${id}`);
    return response.data;
  }
);

// Support Request Thunks
export const getSupportRequests = createAsyncThunk(
  'support/getSupportRequests',
  async () => {
    const response = await axios.get('http://localhost:5000/api/support');
    return response.data;
  }
);

export const deleteSupportRequest = createAsyncThunk(
  'support/deleteSupportRequest',
  async (id) => {
    await axios.delete(`http://localhost:5000/api/support/${id}`);
    return id;
  }
);

export const respondToSupportRequest = createAsyncThunk(
  'support/respondToSupportRequest',
  async ({ id, response }) => {
    const res = await axios.put(`http://localhost:5000/api/support/respond/${id}`, { response });
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
