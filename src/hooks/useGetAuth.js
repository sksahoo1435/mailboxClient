import { useDispatch } from "react-redux";
import { getAuth } from "../store/slices/auth-slice";
const useGetAuth = () => {
  const dispatch = useDispatch();
  dispatch(getAuth());
};

export default useGetAuth;
