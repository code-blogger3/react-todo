import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserData: (state, action) => {
      state.user = action.payload;
    },
    signInUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(
        "todo's_user",
        JSON.stringify({ ...action.payload })
      );
    },
    signOutUser: (state) => {
      state.user = null;
      localStorage.removeItem("todo's_user");
    },
  },
});

export const { signInUser, signOutUser, loadUserData } = userSlice.actions;
export default userSlice.reducer;
