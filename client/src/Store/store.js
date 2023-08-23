import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import baseUrlSlice from "./reducers/baseUrlSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    baseUrl: baseUrlSlice,
  },
});

export default store;
