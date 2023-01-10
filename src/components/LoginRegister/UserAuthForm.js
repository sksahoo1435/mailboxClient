import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { motion, useAnimationControls } from "framer-motion";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLogin } from "react-icons/ai";
import { setResErr } from "../../store/slices/auth-slice";
import {
  outerDivVariants,
  formVariants,
} from "../../animations/framerAnimations";
import { btnHoverAnimations } from "../../animations/gestureAnimations";
import UIButton from "../UI/UIButton";
import UIForm from "../UI/UIForm";
import UILoader from "../UI/UILoader";
import UIAlert from "../UI/UIAlert";
import InputFieldError from "../UI/InputFieldError";
import "../../assets/css//authForm.css";

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  isRegFormValid,
  isLoginFormValid,
} from "../../utils/formValidation";

import { API_KEY, DB_URL } from "../../data/firebaseAuthCredentials";
import { setAuth } from "../../store/slices/auth-slice";
import useOption from "../../hooks/useOption";
import useClearResError from "../../hooks/useClearResError";
import { useNavigate } from "react-router-dom";
import { toggleUILoader } from "../../store/slices/ui-slice";

import useGetAuth from "../../hooks/useGetAuth";
import useGetUser from "../../hooks/useGetUser";

const MotionButton = motion(UIButton);
const MotionForm = motion(UIForm);

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = useMemo(() => {
    return navigate;
  }, [navigate]);
  const initialFieldState = useMemo(() => {
    return {
      value: "",
      isInvalid: true,
      errorMsg: "",
    };
  }, []);
  // const { isEmailVerified, isLoggedIn } = useSelector((state) => state.auth);
  const inpfieldErrorcontrols = useAnimationControls();
  const loading = useSelector((state) => state.ui.isloading);

  // error from backend
  const error = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState({ ...initialFieldState });
  const [pass, setPass] = useState({ ...initialFieldState });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [confirmPass, setConfirmPass] = useState({ ...initialFieldState });

  const [islogin, setIsLogin] = useState(true);
  const [isPassReset, setIsPassReset] = useState(false);

  const loginformInvalid = isLoginFormValid(email, pass);
  const regformInvalid = isRegFormValid(email, pass, confirmPass);

  const formControls = useAnimationControls();

  // animate form when switching to different auth options
  const animateFormOnAction = async () => await formControls.start("visible");

  const clearInputFields = useCallback(() => {
    setEmail(initialFieldState);
    setPass(initialFieldState);
    setConfirmPass(initialFieldState);
  }, [initialFieldState]);

  const authOption = useOption(islogin, isPassReset);

  // console.log(authOption);
  useEffect(() => {
    if (error) {
      setFormSubmitted(false);
      return;
    }
  }, [error]);

  // retrieve auth from localStorage
  useGetAuth();

  // check whether email is verfied
  useGetUser();

  useClearResError(error, inpfieldErrorcontrols);

  const submitHandler = async (e) => {
    e.preventDefault();
    let PAYLOAD = null;
    if (authOption === "sendOobCode") {
      PAYLOAD = {
        requestType: "PASSWORD_RESET",
        email: email.value,
      };
    } else {
      PAYLOAD = {
        email: email.value,
        password: pass.value,
        returnSecureToken: true,
      };
    }
    const requestAuthAPI = async () => {
      dispatch(toggleUILoader());
      const authRes = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${authOption}?key=${API_KEY}`,
        PAYLOAD
      );
      if (authRes.status === 200) {
        const { email, idToken } = authRes.data;
        dispatch(setAuth({ email, idToken }));
        const id = email.replace(/[^a-zA-Z0-9 ]/g, "");
        if (authOption === "signUp") {
          const res = await axios.post(`${DB_URL}/${id}/inbox.json`, {
            sender: "mailBoxClient@gmail.com",
            subject: "Welcome to the family!",
            mailContent:
              "Welcome to MailBox Client! We’re glad you have decided to join us. We won’t be boring you with long email sequences or essay-long texts. Thanks for joining us! ",
            unread: true,
            mailID: "201",
          });
          console.log(res);
        }
        const res = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            idToken: idToken,
          }
        );

        if (res.status === 200) {
          const emailVerified = res.data.users[0].emailVerified;
          if (emailVerified) {
            redirect("/home/inbox");
          } else redirect("/verifyemail");
        }
        dispatch(toggleUILoader());
      }
    };
    try {
      await requestAuthAPI();
    } catch (error) {
      console.log(error);
      dispatch(toggleUILoader());
      const { response } = error;
      dispatch(setResErr(response.data.error.message));
    }
    setFormSubmitted(true);
  };

  return (
    <>
      <motion.div
        variants={outerDivVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionForm
          variants={formVariants}
          animate={formControls}
          id="authform"
          className="auth-form bg-white"
          onSubmit={submitHandler}
        >
          <Form.Group
            className={`input-control mb-3 ${email.errorMsg && "fieldError"}`}
            controlId="auth-email"
          >
            <Form.Label className="text-primary">Email</Form.Label>
            <Form.Control
              value={email.value}
              className="form-control-lg"
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
          </Form.Group>
          {email.errorMsg && (
            <InputFieldError
              errorMsg={email.errorMsg}
              isInvalid={email.isInvalid}
            />
          )}

          {!isPassReset && (
            <>
              <Form.Group
                className={`input-control mb-3 ${
                  pass.errorMsg && "fieldError"
                }`}
                controlId="auth-pass"
              >
                <Form.Label className="text-primary">Password</Form.Label>
                <Form.Control
                  value={pass.value}
                  className="form-control-lg"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    setPass({ ...initialFieldState, value });
                  }}
                  onBlur={(e) => {
                    const value = e.target.value.trim();
                    confirmPass.value.length > 0 &&
                      setConfirmPass(initialFieldState);
                    setPass({
                      ...validatePassword(value, confirmPass.value),
                      value,
                    });
                  }}
                  disabled={email.isInvalid ? true : false}
                />
              </Form.Group>
              {pass.errorMsg && (
                <InputFieldError
                  errorMsg={pass.errorMsg}
                  isInvalid={pass.isInvalid}
                />
              )}
              {!islogin ? (
                <>
                  <Form.Group
                    className={`input-control mb-3 ${
                      confirmPass.errorMsg && "fieldError"
                    }`}
                    controlId="auth-confirm-pass"
                  >
                    <Form.Label className="text-primary">
                      Confirm password
                    </Form.Label>
                    <Form.Control
                      value={confirmPass.value}
                      className="form-control-lg border-2"
                      type="password"
                      placeholder="Confirm your password"
                      onChange={(e) => {
                        const value = e.target.value.trim();
                        setConfirmPass({ ...initialFieldState, value });
                      }}
                      onBlur={(e) => {
                        const value = e.target.value.trim();
                        setConfirmPass({
                          ...validateConfirmPassword(value, pass.value),
                          value,
                        });
                      }}
                      disabled={
                        pass.isInvalid || email.isInvalid ? true : false
                      }
                    />
                  </Form.Group>

                  {confirmPass.errorMsg && (
                    <InputFieldError
                      errorMsg={confirmPass.errorMsg}
                      isInvalid={confirmPass.isInvalid}
                    />
                  )}
                </>
              ) : null}
            </>
          )}
          <>
            {isPassReset ? (
              <MotionButton
                whileTap={{ scale: 0.9 }}
                name="SEND PASSWORD RESET LINK"
                type="submit"
                btnVariant="danger"
                disabled={email.isInvalid ? true : false}
                className="d-block w-100 p-2 text-white"
              />
            ) : islogin ? (
              <MotionButton
                whileHover={btnHoverAnimations}
                whileTap={{ scale: 0.9 }}
                name="LOGIN"
                type="submit"
                className="d-block w-100 p-2 text-white"
                disabled={loginformInvalid ? true : false}
                icon={<AiOutlineLogin />}
              />
            ) : (
              <MotionButton
                whileHover={btnHoverAnimations}
                whileTap={{ scale: 0.9 }}
                name="REGISTER"
                type="submit"
                className="w-100 p-2 text-white"
                disabled={regformInvalid ? true : false}
                icon={<AiOutlineLogin />}
              />
            )}
          </>
          {islogin && !isPassReset ? (
            <Button
              variant="white"
              className="text-info d-block mt-3"
              onClick={() => {
                setIsLogin(false);
                setIsPassReset(true);
                animateFormOnAction();
                clearInputFields();
              }}
            >
              Forgot password?
            </Button>
          ) : null}
          <motion.div className="text-primary bg-altwhite shadow division d-flex justify-content-center align-items-center mx-auto my-3">
            <span>OR</span>
          </motion.div>
          {!isPassReset ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-info btn btn-altlight d-block mx-auto"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin((prev) => !prev);
                clearInputFields();
                animateFormOnAction();
              }}
            >
              <span>
                {islogin ? "Create an account" : "Have an account! Login now"}
              </span>
            </motion.button>
          ) : (
            <Button
              variant="primary"
              className="d-block mt-3 mx-auto"
              onClick={() => {
                setIsLogin(true);
                setIsPassReset(false);
                clearInputFields();
                animateFormOnAction();
              }}
            >
              Back to login
            </Button>
          )}
        </MotionForm>
      </motion.div>
      {loading && <UILoader />}
      {error && <UIAlert message={error} className="bg-danger" />}
      {/* {authSuccess && isPassReset && (
        <UIAlert
          message="Verification link sent. Check your inbox"
          className="bg-primary"
        /> 
      )}
      */}
    </>
  );
};

export default AuthForm;
