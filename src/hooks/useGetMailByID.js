import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { DB_URL } from "../data/firebaseAuthCredentials";

const useGetMailByID = (inbox, id) => {
  const { email } = useSelector((state) => state.auth);
  const { sender, subject, mailContent } = inbox.find((mail) => mail.id === id);
  const userID = email.replace(/[^a-zA-Z0-9 ]/g, "");
  useEffect(() => {
    async function readMail() {
      try {
        const res = await axios.get(`${DB_URL}/${userID}/inbox/${id}.json`);
        const newPayload = {
          ...res.data,
          unread: false,
        };
        if (res.status === 200) {
          try {
            await axios.put(`${DB_URL}/${userID}/inbox/${id}.json`, newPayload);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error); 
      }
    }

    readMail();
  },[id, userID]);

  return { sender, subject, mailContent };
};

export default useGetMailByID;
