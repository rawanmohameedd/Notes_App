import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "./useAuth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
