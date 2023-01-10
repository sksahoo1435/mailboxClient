import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import store from "./store/store";

import "./assets/css/main.min.css";
import "./assets/css/index.css";

import LoginRegister from "./pages/loginRegister";
import VerifyEmail from "./pages/verifyemail";
import Home from "./pages/home";
import PageNotFound from "./pages/pagenotfound";

import ComposeMail from "./components/Home/Compose/ComposeMail";
import Inbox from "./components/Home/Inbox/Inbox";
import ViewInboxMail from "./components/Home/Inbox/ViewInboxMail";
import SentBox from "./components/Home/Sentbox/SentBox";

import useGetAuth from "./hooks/useGetAuth";
import useGetUser from "./hooks/useGetUser";
import ViewSentboxMail from "./components/Home/Sentbox/ViewSentboxMail";
// import useRedirect from "./hooks/useRedirect";

function App() {
  const location = useLocation();
  const { isEmailVerified } = useSelector((state) => state.auth);

  // retrieve auth from localStorage
  useGetAuth();

  // check whether email is verfied
  useGetUser();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoginRegister />} />
        {!isEmailVerified && (
          <Route path="/verifyemail" element={<VerifyEmail />} />
        )}
        {isEmailVerified && (
          <Route path="/home" element={<Home />}>
            <Route path="composemail" element={<ComposeMail />} />
            <Route path="inbox" element={<Inbox />}>
              <Route path=":id" element={<ViewInboxMail />} />
            </Route>
            <Route path="sentbox" element={<SentBox />}>
            <Route path=":id" element={<ViewSentboxMail />} />
            </Route>
          </Route>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
