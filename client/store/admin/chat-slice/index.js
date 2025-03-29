import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllChats = createAsyncThunk("chat/fetchAll", async () => {
  const res = await axios.get("http://localhost:5000/api/chat/all");
  return res.data;
});

export const fetchChatById = createAsyncThunk("chat/fetchById", async (id) => {
  const res = await axios.get(`http://localhost:5000/api/chat/thread/${id}`);
  return res.data;
});

export const sendAdminMessage = createAsyncThunk(
  "chat/sendAdminMessage",
  async ({ threadId, content }) => {
    const res = await axios.post(
      `http://localhost:5000/api/chat/${threadId}/message`,
      {
        sender: "admin",
        content,
      }
    );
    return res.data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    threadList: [],
    currentThread: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllChats
      .addCase(fetchAllChats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threadList = action.payload;
      })
      .addCase(fetchAllChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // fetchChatById
      .addCase(fetchChatById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentThread = action.payload;
      })
      .addCase(fetchChatById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // sendAdminMessage
      .addCase(sendAdminMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendAdminMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentThread = action.payload;
      })
      .addCase(sendAdminMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
