import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: [],
  sentBox: [],
  mailContent: null,
  error: false,
  totalUnread: 0,
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setMail: (state, action) => {
      state.mailContent = action.payload;
    },
    clearMailContent: (state) => {
      state.mailContent = null;
    },
    setInbox: (state, action) => {
      state.inbox = action.payload;
    },
    countUnreadMails: (state) => {
      state.totalUnread = state.inbox.filter(
        (mail) => mail.unread === true
      ).length;
    },
    setSentBox: (state, action) => {
      state.sentBox = action.payload;
    },
  },
});

export default mailSlice.reducer;

export const {
  setMail,
  clearMailContent,
  setInbox,
  setSentBox,
  countUnreadMails,
} = mailSlice.actions;
