import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/voucher";

// 🔄 Lấy danh sách voucher còn hiệu lực cho user
export const fetchAvailableVouchers = createAsyncThunk("voucher/fetchAvailable", async () => {
  const res = await axios.get(`${API_URL}/available`);
  return res.data.data;
});

// 🔄 Fetch tất cả voucher
export const fetchVouchers = createAsyncThunk("voucher/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
});


// ➕ Tạo voucher
export const createVoucher = createAsyncThunk("voucher/create", async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data.data;
});

// ✏️ Cập nhật voucher
export const updateVoucher = createAsyncThunk("voucher/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data.data;
});

// ❌ Xoá voucher
export const deleteVoucher = createAsyncThunk("voucher/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const voucherSlice = createSlice({
  name: "adminVoucher",
  initialState: {
    vouchers: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vouchers = action.payload;
      })
      .addCase(fetchVouchers.rejected, (state) => {
        state.isLoading = false;
        state.error = "Không thể tải voucher!";
      })
      .addCase(createVoucher.fulfilled, (state, action) => {
        state.vouchers.push(action.payload);
      })
      .addCase(updateVoucher.fulfilled, (state, action) => {
        const index = state.vouchers.findIndex((v) => v._id === action.payload._id);
        if (index !== -1) state.vouchers[index] = action.payload;
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.vouchers = state.vouchers.filter((v) => v._id !== action.payload);
      })
      .addCase(fetchAvailableVouchers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAvailableVouchers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vouchers = action.payload;
      })
      .addCase(fetchAvailableVouchers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Không thể tải voucher.";
      });
  },
});

export default voucherSlice.reducer;
