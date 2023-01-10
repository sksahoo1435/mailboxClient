const Notifications = {
  ADD_EXPENSE: {
    100: "Adding expense",
    200: "Expense Added successfully",
    400: "Failed to add",
  },
  EDIT_EXPENSE: {
    100: "Editing expense",
    200: "Expense Edited and saved",
    400: "Failed to edit",
  },
  DELETE_EXPENSE: {
    100: "Deleting expense",
    200: "Expense Deleted",
    400: "Failed to Delete",
  },
  REGISTER: {
    100: "Registration in process",
    200: "You registration is successfull",
    400: "Something went wrong",
  },
  LOGIN: {
    100: "Signing In",
    200: "You signed in successfully",
    400: "Something went wrong",
  },
  LOGOUT: {
    200: "Logged out",
  },
  SET_USER: {
    100: "Saving User Details",
    200: "Details added successfully",
    400: "Failed to save details. Something went wrong",
  },
  EMAIL_VERIFICATION: {
    100: "Sending Verification Link",
    200: "Verification Link sent",
    400: "Something went wrong",
  },
  RESET_PASSWORD: {
    100: "Sending password reset link",
    200: "Password reset link sent",
    400: "Something went wrong",
  },
};

export default Notifications;
