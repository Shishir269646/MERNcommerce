import { combineReducers } from "@reduxjs/toolkit";

import { categorySlice } from "@/redux/categorySlice";
import { orderSlice } from "@/redux/orderSlice";
import { productSlice } from "@/redux/productSlice";
import { userSlice } from "@/redux/userSlice";
import { addressSlice } from "@/redux/addressSlice";
import { reviewSlice } from "@/redux/reviewSlice";
import { wishlistSlice } from "@/redux/wishlistSlice";
import { adminSlice } from "@/redux/adminSlice";
import { couponSlice } from "@/redux/couponSlice";
import { cartSlice } from "@/redux/cartSlice";
import { settingsSlice } from "@/redux/settingsSlice";



const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    settings: settingsSlice.reducer,
    category: categorySlice.reducer,
    order: orderSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer,
    address: addressSlice.reducer,
    coupon: couponSlice.reducer,
    review: reviewSlice.reducer,
    wishlist: wishlistSlice.reducer,
    admin: adminSlice.reducer
});

export default rootReducer;
