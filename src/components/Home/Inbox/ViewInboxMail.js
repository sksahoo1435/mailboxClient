import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parser from "html-react-parser";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

import UIAnimatedModal from "../../UI/UIAnimatedModal";

import useGetMailByID from "../../../hooks/useGetMailByID";
import { DB_URL } from "../../../data/firebaseAuthCredentials";

const ViewInboxMail = () => {
  const navigate = useNavigate();
  const { inbox } = useSelector((state) => state.mail);
  let { id } = useParams();
  console.log(id);
  const [showModal, setshowModal] = useState(true);

  const hideModal = () => {
    setshowModal(false);
  };

  const { sender, subject, mailContent } = useGetMailByID(inbox, id);

  const { email } = useSelector((state) => state.auth);
  const userID = email.replace(/[^a-zA-Z0-9 ]/g, "");

  const deleteMaiLHandler = async () => {
    try {
      const res = await axios.delete(`${DB_URL}/${userID}/inbox/${id}.json`);
      if (res.status === 200) {
        navigate("/home/inbox");
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const modalBody = (
    <div className="position-relative">
      <h5 className="">
        <span className="fs-5 text-info">From: </span>
        <span className="text-primary ms-3 border p-2 rounded-pill border-altlight border-1">
          {sender}
        </span>
      </h5>
      <h5 className="text-info mt-4">
        <span className="fs-5">Subject</span>:
        <span className="text-dark ms-3">{subject}</span>
      </h5>
      <div className="ProseMirror">{parser(mailContent)}</div>
      <div className="mt-3">
        <Link
          to="/home/inbox"
          className="btn btn-outline-primary"
          onClick={() => {
            hideModal();
          }}
        >
          <span className="me-2">Close</span>
          <span>
            <AiFillCloseCircle />
          </span>
        </Link>
        <Button
          variant="danger"
          className="text-light ms-3"
          onClick={(e) => {
            e.preventDefault();
            deleteMaiLHandler();
          }}
        >
          <span className="me-2">Delete</span>
          <span>
            <RiDeleteBin5Line />
          </span>
        </Button>
      </div>
    </div>
  );

  return (
    <UIAnimatedModal
      showModal={showModal}
      modalBody={modalBody}
      onClick={hideModal}
      style={{
        width: "81%",
        maxHeight: "100%",
      }}
    />
  );
};

export default ViewInboxMail;
