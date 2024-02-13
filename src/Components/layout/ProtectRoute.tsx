import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import {
  TUser,
  logOut,
  selectCurrentToken,
} from "../../redux/featuers/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
type TProtectedRoute = {
  children: ReactNode;
  role: string;
};

const ProtectRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
    console.log(user);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(logOut());
    console.log("role missing");
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    console.log("nai token");
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
