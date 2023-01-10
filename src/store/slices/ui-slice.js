import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isloading: false,
    modalVisible: false,
  },
  showSideNav: false,
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
    toggleSideNav: (state) => {
      state.showSideNav = !state.showSideNav;
    },
  },
});

export default uiSlice.reducer;
export const { toggleUILoader, showUIModal, hideUIModal, toggleSideNav } = uiSlice.actions;
