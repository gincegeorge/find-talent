import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer.jsx";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error.jsx";
import Signup from "./components/signup/Signup.jsx";
import Home from "./components/homepage/Home.jsx";
import Login from "./components/login/Login.jsx";

function App() {
  //app layout
  const AppLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
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
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
