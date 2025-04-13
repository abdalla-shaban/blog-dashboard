import { createBrowserRouter, RouterProvider } from "react-router";
import SignIn from "./components/auth/SignIn";
import Home from "./pages/Home";
import SignUp from "./components/auth/SignUp";
import RootLayout from "./components/RootLayout";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useDispatch } from "react-redux";
import { getSession } from "./store/features/auth/authSlice";
import { useEffect } from "react";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
  { path: "/*", element: <>Not Found</> },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
