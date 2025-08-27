import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://thecoffeeshop-server.onrender.com/api/admin/blog";

const initialState = {
  blogs: [],
  selectedBlog: null,
  totalBlogs: 0,
  isLoading: false,
  error: null,
};

// Fetch tất cả blogs
export const fetchBlogs = createAsyncThunk("blog/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Lỗi khi tải danh sách blog." });
  }
});

// Fetch blog chi tiết theo id
export const fetchBlogDetail = createAsyncThunk("blog/fetchOne", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Lỗi khi tải chi tiết blog." });
  }
});

// Tạo blog mới
export const createBlog = createAsyncThunk("blog/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post(API_URL, formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Lỗi khi tạo blog." });
  }
});

// Cập nhật blog
export const updateBlog = createAsyncThunk("blog/update", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Lỗi khi cập nhật blog." });
  }
});

// Xoá blog
export const deleteBlog = createAsyncThunk("blog/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return { id, ...res.data };
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Lỗi khi xoá blog." });
  }
});

const blogSlice = createSlice({
  name: "adminBlog",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload?.data || [];
        state.totalBlogs = action.payload?.total || 0;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.blogs = [];
        state.error = action.payload;
      })

      // Fetch blog detail
      .addCase(fetchBlogDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedBlog = null;
      })
      .addCase(fetchBlogDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBlog = action.payload?.data || null;
      })
      .addCase(fetchBlogDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.data) {
          state.blogs.unshift(action.payload.data);
          state.totalBlogs += 1;
        }
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload?.data;
        if (updated) {
          const index = state.blogs.findIndex((b) => b._id === updated._id);
          if (index !== -1) {
            state.blogs[index] = updated;
          }
          if (state.selectedBlog && state.selectedBlog._id === updated._id) {
            state.selectedBlog = updated;
          }
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.blogs = state.blogs.filter((b) => b._id !== action.payload.id);
          state.totalBlogs = Math.max(0, state.totalBlogs - 1);
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
