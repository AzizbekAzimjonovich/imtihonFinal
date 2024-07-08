import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { login, isAuthChange } from "./app/userSlice";

import { Home, Login, Register, Create } from "./pages";

//layouts
import MainLayout from "./layouts/MainLayout";

import { useSelector, useDispatch } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";

//actions
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { action as createAction } from "./pages/Create";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/firebaseConfig";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthState } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
          action: createAction,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(isAuthChange());
    });
  }, []);
  return <>{isAuthState && <RouterProvider router={routes} />}</>;
}

export default App;
