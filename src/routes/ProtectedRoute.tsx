import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("access_token");

  return token && token != undefined ? <Outlet /> : <Navigate to="/login" replace />;
}
