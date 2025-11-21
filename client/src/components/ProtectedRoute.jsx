import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Loader } from "./Loader";

export const ProtectedRoute = ({ role }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
