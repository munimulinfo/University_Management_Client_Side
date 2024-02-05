import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../redux/featuers/auth/authSlice";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
};

export default ProtectRoute;
