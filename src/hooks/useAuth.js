import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { toggleUILoader } from "../store/slices/ui-slice";
import { setAuth, setResErr } from "../store/slices/auth-slice";
import { API_KEY, DB_URL } from "../data/firebaseAuthCredentials";
import { PASSWORD_RESET } from "../data/loginOptions";
let PAYLOAD = null;
let authSuccess = false;

const useAuth = (email, password, option, isSubmitted) => {
  const dispatch = useDispatch();

  if (option === PASSWORD_RESET) {
    PAYLOAD = {
      requestType: "PASSWORD_RESET",
      email: email,
    };
  } else {
    PAYLOAD = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
  }

  useEffect(() => {
    async function authorizeUser() {
      const requestAuthAPI = async () => {
        dispatch(toggleUILoader());

        const authRes = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:${option}?key=${API_KEY}`,
          PAYLOAD
        );
        if (authRes.status === 200) {
          const { email, idToken } = authRes.data;
          dispatch(setAuth({ email, idToken }));
          const id = email.replace(/[^a-zA-Z0-9 ]/g, "");
          if (option === "signUp") {
            const res = await axios.post(`${DB_URL}/accounts/${id}.json`, {
              inbox: [
                {
                  message: "Your inbox is empty",
                },
              ],
              sentBox: [
                {
                  message: "Your sentbox is empty",
                },
              ],
            });
            console.log(res);
          }
          const timer = setTimeout(() => {
            dispatch(toggleUILoader());
            clearTimeout(timer);
          }, 1000);

          return true;
        }
        return false;
      };
      try {
        authSuccess = await requestAuthAPI();
      } catch (error) {
        dispatch(toggleUILoader());
        const { response } = error;
        dispatch(setResErr(response.data.error.message));
      }
    }

    isSubmitted && authorizeUser();
  }, [dispatch, email, isSubmitted, option]);

  console.log(authSuccess)
  return authSuccess;
};

export default useAuth;
