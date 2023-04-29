import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/slice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
