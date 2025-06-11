import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load cart from localStorage if available
let initialCartItems = [];
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("cartItems");
  initialCartItems = saved ? JSON.parse(saved) : [];
}

// Initial state
const initialState = {
  cartItems: initialCartItems,
  totalQty: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

// ✅ Fetch cart from backend
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/cart");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch cart");
    }
  }
);

// ✅ Save cart to backend
export const saveCartToDB = createAsyncThunk(
  "cart/saveCartToDB",
  async (cartItems, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/cart", { cartItems });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save cart");
    }
  }
);

// ✅ Delete single cart item from backend
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/cart/${productId}`);
      return res.data; // updated cart array
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete cart item");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((i) => i._id === item._id);

      if (exist) {
        exist.qty += item.qty;
      } else {
        state.cartItems.push(item);
      }

      cartSlice.caseReducers.updateCartTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      cartSlice.caseReducers.updateCartTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item) item.qty = qty;

      cartSlice.caseReducers.updateCartTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQty = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },

    updateCartTotals: (state) => {
      state.totalQty = state.cartItems.reduce((acc, item) => acc + item.qty, 0);
      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.qty * item.price,
        0
      );
    },

    loadCartFromDB: (state, action) => {
      state.cartItems = action.payload;
      cartSlice.caseReducers.updateCartTotals(state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔄 Fetch
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        cartSlice.caseReducers.updateCartTotals(state);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Save
      .addCase(saveCartToDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCartToDB.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCartToDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔄 Delete Item
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        cartSlice.caseReducers.updateCartTotals(state);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  updateCartTotals,
  loadCartFromDB,
} = cartSlice.actions;


/* 
GET /api/cart

POST /api/cart

DELETE /api/cart/:productId 
*/