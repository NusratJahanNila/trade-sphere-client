import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllProducts from "../Pages/AllProducts/AllProducts";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import AddExport from "../Pages/Export/AddExport";
import MyExport from "../Pages/Export/MyExport";
import MyImports from "../Pages/Import/MyImports";
import Loader from "../Components/Loader/Loader";
import Error404 from "../Pages/ErrorPage/Error404";
import ProductNotFound from "../Pages/ErrorPage/ProductNotFound";
import About from "../Pages/About/About";
import TermsAndCondition from "../Pages/TermsAndCondition/TermsAndCondition";
import Contact from "../Pages/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Error404></Error404>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('https://trade-sphere-server.vercel.app/latest-products'),
        hydrateFallbackElement:<Loader></Loader>
      },
      {
        path: '/all-products',
        element: <AllProducts></AllProducts>,
        loader: () => fetch('https://trade-sphere-server.vercel.app/products'),
        hydrateFallbackElement:<Loader></Loader>
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails></ProductDetails>

      },
      {
        path: '/add-export',
        element: <PrivateRoute>
          <AddExport></AddExport>
        </PrivateRoute>
      },
      {
        path: '/my-export',
        element: <PrivateRoute>
          <MyExport />
        </PrivateRoute>
      },
      {
        path: '/my-imports',
        element: <PrivateRoute>
          <MyImports></MyImports>
        </PrivateRoute>
      },
      {
        path: "/about",
        element:<About></About>
      },
      {
        path: "/contact",
        element:<Contact/>
      },
      {
        path: "/terms",
        element:<TermsAndCondition></TermsAndCondition>
      }

    ]
  },
  {
    path: '/auth',
    element: <AuthLayout></AuthLayout>,
    errorElement:<Error404></Error404>,
    children: [
      {
        path: '/auth/login',
        element: <Login></Login>
      },
      {
        path: '/auth/register',
        element: <Register></Register>
      },
    ]
  }
]);

export default router;