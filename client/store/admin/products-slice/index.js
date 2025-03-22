import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// Thêm sản phẩm mới
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post("http://localhost:5000/api/admin/products/add", formData, {
        headers: { "Content-Type": "application/json" },
      });
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Lấy tất cả sản phẩm
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get("http://localhost:5000/api/admin/products/get");
    return result?.data;
  }
);

// Sửa sản phẩm
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Xóa sản phẩm
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
