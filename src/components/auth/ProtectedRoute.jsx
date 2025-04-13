import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isSessionChecked } = useSelector(
    (state) => state.authSlice
  );

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (!data && isSessionChecked) {
    return <Navigate to={"/signin"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
