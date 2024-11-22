import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    sortUsers(state, action) {
      state.sort(function (a, b) {
        return b.blogs.length - a.blogs.length;
      });
    },
  },
});

export const { setUsers, sortUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
    dispatch(sortUsers());
  };
};

export default userSlice.reducer;
