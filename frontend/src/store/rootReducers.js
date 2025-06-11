import { combineReducers } from "@reduxjs/toolkit";

import { cartSlice } from "@/redux/cartSlice";
import { categorySlice } from "@/redux/categorySlice";
import { orderSlice } from "@/redux/orderSlice";
import { productSlice } from "@/redux/productSlice";
import { userSlice } from "@/redux/userSlice";

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    category: categorySlice.reducer,
    order: orderSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer,
});

export default rootReducer;
