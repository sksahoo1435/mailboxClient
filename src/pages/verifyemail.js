import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Envelope } from "react-bootstrap-icons";
import axios from "axios";
import { Button } from "react-bootstrap";

import { VERIFY_EMAIL } from "../data/loginOptions";
import UIAnimatedModal from "../components/UI/UIAnimatedModal";
import UILoader from "../components/UI/UILoader";
import { toggleUILoader } from "../store/slices/ui-slice";
import { API_KEY } from "../data/firebaseAuthCredentials";
import { setResErr, logout } from "../store/slices/auth-slice";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import UIAlert from "../components/UI/UIAlert";
import { feildErrorVariants } from "../animations/framerAnimations";

import useGetAuth from "../hooks/useGetAuth";
import useGetUser from "../hooks/useGetUser";
import { useNavigate, Navigate } from "react-router-dom";

const VerifyEmail = () => {
  const { isEmailVerified, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const redirect = useMemo(() => {
    return navigate;
  }, [navigate]);
  const [showModal, setShowModal] = useState(true);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.ui.isloading);
  const { idToken, error } = useSelector((state) => state.auth);
  const inpfieldErrorcontrols = useAnimationControls();

  // retrieve auth from localStorage

  useGetAuth();

  // check whether email is verfied
  useGetUser();

  useEffect(() => {
    error && inpfieldErrorcontrols.start("visible");
  }, [error, inpfieldErrorcontrols]);

  const sendVerificationEmail = async () => {
    dispatch(toggleUILoader());
    const requestAuthAPI = async () => {
      const authRes = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${VERIFY_EMAIL}?key=${API_KEY}`,
        {
          idToken: idToken,
          requestType: "VERIFY_EMAIL",
        }
      );
      if (authRes.status === 200) {
        const timer = setTimeout(() => {
          dispatch(toggleUILoader());
          dispatch(logout());
          navigate("/");
          clearTimeout(timer);
        }, 1000);
      }
    };

    try {
      await requestAuthAPI();
    } catch (error) {
      console.log(error);
      dispatch(toggleUILoader());
      dispatch(setResErr("Something went wrong"));
    }
  };

  const modalBody = (
    <>
      {isEmailVerified && <Navigate to="/home" replace={true} />}
      <h1 className="text-danger fs-1 m-0 d-flex align-items-center">
        Verify your email <Envelope className="ms-3" />
      </h1>

      <p className="pt-3 text-primary lead">
        Yay!! We're excited to have you get started. First, you need to confirm
        your account. Just press the button below
      </p>
      <p className="text-info">
        We will send a verfication link to
        <span className="fw-bold text-underline ms-1">{email}</span> and you
        will be loggged out instantly. Login after verifying your email.
      </p>
      <p>
        <span className="fs-6 text-underline text-info">
          Account verfication link is valid for 1 hour
        </span>
      </p>

      <div className="mb-3">
        {!error ? (
          <Button
            variant="primary"
            className="text-light btn-lg rounded mt-3"
            onClick={() => sendVerificationEmail()}
          >
            <span>VERIFY EMAIL</span>
          </Button>
        ) : (
          <Button
            variant="danger"
            className="text-light btn-lg rounded mt-3"
            onClick={() => dispatch(logout())}
          >
            <span>LOGOUT</span>
          </Button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            key="fieldError"
            variants={feildErrorVariants}
            initial="hidden"
            animate={inpfieldErrorcontrols}
            exit="exit"
            className="text-danger m-0 pb-2"
          >
            <UIAlert
              variant="danger"
              alertHeading="Opps!! Something went wrong"
              message={error}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      <UIAnimatedModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalBody={modalBody}
      />
      {isloading && <UILoader />}
    </>
  );
};

export default VerifyEmail;
