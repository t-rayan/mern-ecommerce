import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
  },
});
