const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passswordRegex = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
const errors = {
  passwordError: {
    strength:
      "Password should have at least 1 lowercase letter , 1 uppercase letter,  1 digit, 1 special character and at least 8 characters long",
    equality: "Password does not match",
  },
  emailError: "Email is invalid",
  subject: "Subject is invalid",
};
let result = {
  isInvalid: false,
  errorMsg: "",
};

export const validateEmail = (email) => {
  const err = emailRegex.test(email)
    ? result
    : { isInvalid: true, errorMsg: errors.emailError };

  return err;
};

export const validatePassword = (pass) => {
  if (passswordRegex.test(pass)) return result;
  else return { isInvalid: true, errorMsg: errors.passwordError.strength };
};

export const validateConfirmPassword = (pass, confirmPass) => {
  if (pass === confirmPass) return result;
  else return { isInvalid: true, errorMsg: errors.passwordError.equality };
};

export const validateMailSubject = (subject) => {
  if (subject.length > 0) return result;
  else return { isInvalid: true, errorMsg: errors.subject };
};
export const isRegFormValid = (email, pass, confirmPass) =>
  email.isInvalid || pass.isInvalid || confirmPass.isInvalid;
export const isLoginFormValid = (email, pass) =>
  email.isInvalid || pass.isInvalid;

export const isMailFormValid = (email, subject) =>
  email.isInvalid || subject.isInvalid;
