import { createSlice } from "@reduxjs/toolkit";

export const DashboardState = createSlice({
  name: "state",
  initialState: [],
  reducers: {
    stateModifier: (state, action) => {
      const stateModifier = {
        text: action.payload,
      };

      return [stateModifier];
    },
  },
});

// this is for dispatch
export const { currentState } = DashboardState.actions;

// this is for configureStore
export default DashboardState.reducer;
