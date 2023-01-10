import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiSliceActions } from "../../../store/ui-slice";

const ExpensesNotifications = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.ui);

  const { message, status, hide } = notification;

  let defaultClass = "d-flex justify-content-between align-items-center";
  let selectedClass = "";

  if (status === 100) {
    selectedClass = "btn fw-light py-3  btn-primary";
  } else if (status === 200) {
    selectedClass = "btn fw-light py-3  btn-success";
  } else if (status === 400) {
    selectedClass = "btn fw-light py-3  btn-danger";
  }

  useEffect(() => {
    let t = setTimeout(() => {
      if (status === 200 || status === 400)
        dispatch(uiSliceActions.turnOffNotification());
        // resetNotficationAction
        // dispatch(uiSliceActions.resetNotficationAction());
      if (t) clearTimeout(t);
    }, 1000);
  }, [dispatch, status]);

  return (
    <>
      {!hide && (
        <div
          className={defaultClass + " " + selectedClass}
          style={{
            position: "fixed",
            top: "0",
            zIndex: "999999",
            left: " 0",
            right: "0",
            borderRadius: 0,
          }}
          role="alert"
        >
          <p className="fw-bold my-0 text-capitalize">{message}</p>
          {status === 100 && (
            <i className="bi bi-chevron-double-right fs-5"></i>
          )}
          {status === 200 && <i className="bi bi-check-circle-fill fs-5"></i>}
        </div>
      )}
    </>
  );
};

export default ExpensesNotifications;
