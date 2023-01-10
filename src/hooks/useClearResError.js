import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearResErr } from "../store/slices/auth-slice";

const useClearResError = async (error, inpfieldErrorcontrols) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      inpfieldErrorcontrols.start("visible");
      const timer = setTimeout(() => {
        inpfieldErrorcontrols.start("exit");
        dispatch(clearResErr());
        clearTimeout(timer);
      }, 2000);
    }
  },[dispatch, error, inpfieldErrorcontrols]);
};

export default useClearResError;
