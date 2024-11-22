import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: null,
  type: "notification",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      const notification = {
        type: action.payload.type,
        text: action.payload.text,
      };
      return (state = notification);
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { setMessage, clearNotification } = notificationSlice.actions;

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch(setMessage(notification));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
