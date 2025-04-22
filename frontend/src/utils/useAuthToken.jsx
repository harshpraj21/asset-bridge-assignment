import { useSelector } from "react-redux";

export const useAuthToken = () => {
  return `Token ${useSelector((state) => state.auth.token)}`;
};
