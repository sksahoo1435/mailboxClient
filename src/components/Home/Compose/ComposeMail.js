import React, { useMemo, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UIAnimatedModal from "../../UI/UIAnimatedModal";
import UIForm from "../../UI/UIForm";
import {
  validateEmail,
  validateMailSubject,
  isMailFormValid,
} from "../../../utils/formValidation";

import InputFieldError from "../../UI/InputFieldError";
import MailEditor from "./MailEditor";
import PreviewMail from "./PreviewMail";

import { clearMailContent } from "../../../store/slices/mail-slice";
import { showUIModal } from "../../../store/slices/ui-slice";
import { DB_URL } from "../../../data/firebaseAuthCredentials";

const ComposeMail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const senderEmail = useSelector((state) => state.auth.email);

  const showMailPreview = useSelector((state) => state.ui.modalVisible);
  const { mailContent, error } = useSelector((state) => state.mail);
  const initialFieldState = useMemo(() => {
    return {
      value: "",
      isInvalid: true,
      errorMsg: "",
    };
  }, []);

  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState({ ...initialFieldState });
  const [subject, setSubject] = useState({ ...initialFieldState });
  const mailFormInvalid = isMailFormValid(email, subject);

  const submitHandler = async (e) => {
    e.preventDefault();

    const receiverID = email.value.replace(/[^a-zA-Z0-9 ]/g, "");
    const senderID = senderEmail.replace(/[^a-zA-Z0-9 ]/g, "");
    const PAYLOAD = {
      mailContent: mailContent,
      sender: senderEmail,
      to: email.value,
      unread: true,
      subject: subject.value,
    };

    try {
      const res = await axios.post(
        `${DB_URL}/${receiverID}/inbox.json`,
        PAYLOAD
      );
      if (res.status === 200) {
        try {
          const res = await axios.post(
            `${DB_URL}/${senderID}/sentbox.json`,
            PAYLOAD
          );
          if (res.status === 200) {
            setEmail({ ...initialFieldState });
            setSubject({ ...initialFieldState });
            dispatch(clearMailContent());
            setShowModal(false);
            navigate("/home/sentbox");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalBody = (
    <>
      <UIForm
        id="mailform"
        className="bg-white position-relative"
        onSubmit={submitHandler}
      >
        <Button
          className="position-absolute fs-2 p-0 border-0"
          style={{
            right: -50,
            top: -50,
            backgroundColor: "transparent",
            color: "#fff",
          }}
          onClick={() => {
            setShowModal(false);
            navigate("/home/inbox");
          }}
        >
          <GiCancel />
        </Button>
        <Form.Group
          className={`input-control mb-3 ${email.errorMsg && "fieldError"}`}
          controlId="auth-email"
        >
          <Row className="justify-content-center align-items-center">
            <Col sm={2}>
              <Form.Label className="text-primary fw-bold m-0 p-0">
                EMAIL
              </Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                value={email.value}
                className="form-control-lg rounded-0"
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  const value = e.target.value.trim();
                  setEmail({ ...initialFieldState, value });
                }}
                onBlur={(e) => {
                  const value = e.target.value.trim();
                  setEmail({ ...validateEmail(value), value });
                }}
              />
            </Col>
          </Row>
        </Form.Group>

        {email.errorMsg && (
          <InputFieldError
            errorMsg={email.errorMsg}
            isInvalid={email.isInvalid}
          />
        )}

        <Form.Group
          className={`input-control mb-3 ${email.errorMsg && "fieldError"}`}
          controlId="auth-email"
        >
          <Row className="justify-content-center align-items-center">
            <Col sm={2}>
              <Form.Label className="text-primary fw-bold m-0 p-0">
                SUBJECT
              </Form.Label>
            </Col>
            <Col sm={10}>
              <Form.Control
                value={subject.value}
                className="form-control-lg rounded-0"
                type="text"
                placeholder="Subject.."
                onChange={(e) => {
                  const value = e.target.value;
                  setSubject({ ...initialFieldState, value });
                }}
                onBlur={(e) => {
                  const value = e.target.value.trim();
                  setSubject({ ...validateMailSubject(value), value });
                }}
              />
            </Col>
          </Row>
        </Form.Group>

        {subject.errorMsg && (
          <InputFieldError
            errorMsg={subject.errorMsg}
            isInvalid={subject.isInvalid}
          />
        )}

        <MailEditor />

        <Button
          variant="primary"
          type="submit"
          className="mt-3 rounded-0 fw-bold px-5"
          disabled={mailFormInvalid ? true : false}
        >
          Send
        </Button>

        {mailContent && (
          <Button
            variant="outline-success"
            className="mt-3 ms-2"
            onClick={() => {
              dispatch(showUIModal(true));
            }}
          >
            Preview
          </Button>
        )}
      </UIForm>
      {showMailPreview && <PreviewMail />}
    </>
  );

  return (
    <>
      <UIAnimatedModal
        modalBody={modalBody}
        showModal={showModal}
        style={{
          width: "81%",
          height: "auto",
          maxHeight: "100%",
        }}
      />
    </>
  );
};

export default ComposeMail;
