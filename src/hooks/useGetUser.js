import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { LOOK_UP } from "../data/loginOptions";
import { API_KEY } from "../data/firebaseAuthCredentials";
import { setEmailVerified } from "../store/slices/auth-slice";

const useGetUser = () => {
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.auth.idToken);

  useEffect(() => {
    async function checkIfEmailVerfified() {
      const getUserData = async () => {
        const res = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:${LOOK_UP}?key=${API_KEY}`,
          {
            idToken: idToken,
          }
        );

        if (res.status === 200) {
          const emailVerified = res.data.users[0].emailVerified;
          dispatch(setEmailVerified(emailVerified));
        }
      };
      try {
        await getUserData();
      } catch (error) {
        alert(error);
      }
    }

    checkIfEmailVerfified();
  }, [dispatch, idToken]);
};

export default useGetUser;
