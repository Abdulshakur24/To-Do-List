import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import itemReducer from "../features/ItemSlice";

export default configureStore({
  reducer: {
    users: userReducer,
    items: itemReducer,
  },
});
