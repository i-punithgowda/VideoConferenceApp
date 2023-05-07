import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/auth-slice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
