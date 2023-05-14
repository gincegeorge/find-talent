import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer.jsx";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error.jsx";
import Signup from "./pages/user/Signup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/user/Login.jsx";
import Dashboard from "./pages/user/Dashboard";
import { Provider } from "react-redux";
import store from "./utils/store.js";
import { Profile } from "./pages/user/Profile";
import { AccountAccess } from "./pages/AccountAccess";
import BizLogin from "./pages/business/BizLogin";
import BizSignup from "./pages/business/BizSignup";

function App() {
  //app layout
  const AppLayout = () => {
    return (
      <Provider store={store}>
        <Header />
        <Outlet />
        <Footer />
      </Provider>
    );
  };

  //app router
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/account-access",
          element: <AccountAccess />,
        },
        {
          path: "/user/signup",
          element: <Signup />,
        },
        {
          path: "/user/login",
          element: <Login />,
        },
        {
          path: "/user/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/user/profile",
          element: <Profile />,
        },
        {
          path: "/business/login",
          element: <BizLogin />,
        },
        {
          path: "/business/signup",
          element: <BizSignup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
