import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/userSlice";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/login"],
        ignoredPaths: ["user.user"],
      },
    }),
});
