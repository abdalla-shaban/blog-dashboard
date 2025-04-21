import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import postsSlice from "./features/posts/postSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    postsSlice,
  },
});
