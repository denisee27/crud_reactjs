import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const tokenAccess = localStorage.getItem("token");
  let location = useLocation();
  console.log(location.pathname);
  let auth = { token: tokenAccess };
  if (auth.token && location.pathname != "/login") {
    return <Outlet />;
  } else if (auth.token) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoutes;
