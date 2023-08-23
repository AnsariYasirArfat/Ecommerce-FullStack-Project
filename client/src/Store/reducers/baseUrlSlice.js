import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "http://localhost:8000",
};
const baseUrlSlice = createSlice({
  name: "baseUrl",
  initialState,
  reducers: {
    setBaseUrl: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBaseUrl } = baseUrlSlice.actions;
export default baseUrlSlice.reducer;
