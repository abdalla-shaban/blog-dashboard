import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { data } = useSelector((state) => state.authSlice);

  if (data) {
    return <Navigate to={"/"} />;
  }
  return (
    <main className="flex items-center justify-center min-h-screen bd-container font-poppins">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
