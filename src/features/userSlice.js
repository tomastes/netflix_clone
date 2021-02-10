import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: 0,
    subscription: 0,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    currentPlan: (state, action) => {
      state.subscription = action.payload;
    },
    removePlan: (state) => {
      state.subscription = null;
    },
  },
});

export const { login, logout, removePlan, currentPlan } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectPlan = (state) => state.user.subscription;

export default userSlice.reducer;
