import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null },
  reducers: {
    setMessage(state, action) {
      return { ...state, message: `you voted for ${action.payload}` };
    },
    clearMessage(state, action) {
      return { ...state, message: null };
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
