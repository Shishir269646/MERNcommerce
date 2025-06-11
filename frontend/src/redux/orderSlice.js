import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api",
});


// Async Thunks
export const placeOrderThunk = createAsyncThunk(
  "order/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      const { data } = await api.post("/order", orderData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getMyOrdersThunk = createAsyncThunk(
  "order/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/order/my-orders");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getOrderByIdThunk = createAsyncThunk(
  "order/getOrderById",
  async (orderId, thunkAPI) => {
    try {
      const { data } = await api.get(`/order/${orderId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAllOrdersThunk = createAsyncThunk(
  "order/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/order");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const { data } = await api.put(`/order/${orderId}`, { status });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial State
const initialState = {
  loading: false,
  orders: [],
  orderDetails: null,
  error: null,
};


export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMyOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;

