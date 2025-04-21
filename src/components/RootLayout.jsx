import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="min-h-screen bd-container font-poppins">
      <Outlet />
    </main>
  );
};

export default RootLayout;
