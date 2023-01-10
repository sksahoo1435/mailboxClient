import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

import { setInbox, setSentBox } from "../store/slices/mail-slice";
import { DB_URL } from "../data/firebaseAuthCredentials";

const useFetchMails = (initialLoad, URL) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const id = email.replace(/[^a-zA-Z0-9 ]/g, "");

  useEffect(() => {
    let fetchedMails = [];
    async function getMails() {
      try {
        const res = await axios.get(`${DB_URL}/${id}/${URL}.json`);
        if (res.status === 200) {
          for (const key in res.data) {
            fetchedMails.push({ ...res.data[key], id: key });
          }
          if(URL === "inbox")
          dispatch(setInbox(fetchedMails));
          else dispatch(setSentBox(fetchedMails));
        }
      } catch (error) {
        console.log(error);
      }
    }
    initialLoad && getMails();
    let timer = setInterval(() => {
      getMails();
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  });
};

export default useFetchMails;
