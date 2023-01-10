import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import uiReducer from "./slices/ui-slice";
import mailReducer from "./slices/mail-slice";
const rootReducer = {
  auth: authReducer,
  ui: uiReducer,
  mail: mailReducer,
};

const store = configureStore({
  reducer: rootReducer,
});


export default store;
