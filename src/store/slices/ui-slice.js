import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isloading: false,
    modalVisible: false,
  },
  reducers: {
    toggleUILoader: (state) => {
      state.isloading = !state.isloading;
    },
    showUIModal: (state) => {
      state.modalVisible = true;
    },
    hideUIModal: (state) => {
      state.modalVisible = false;
    },
  },
});

export default uiSlice.reducer;
export const {
  toggleUILoader,
  showUIModal,
  hideUIModal,
} = uiSlice.actions;
