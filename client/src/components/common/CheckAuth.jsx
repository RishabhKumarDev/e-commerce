import { Loader } from "@/components/common/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAuth } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthanticated, user,  } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthanticated && !user) {
      dispatch(checkAuth());
    }
  }, []);

  let isLoading = true;
  if (isLoading) {
    return <Loader />;
  }

  // user not authanticated trying to access normal page
  if (
    !isAuthanticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/login" />;
  }

  //   user authanticated trying to access auth page
  if (
    isAuthanticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shopping/home" />;
    }
  }

  // user is normal trying to access admin page

  if (
    isAuthanticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // user is admin trying to access normal page

  if (
    isAuthanticated &&
    user?.role === "admin" &&
    location.pathname.includes("shopping")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // if nothing match just render the children

  return <>{children}</>;
}

export default CheckAuth;
