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
import UpdateExport from "../Components/UpdateExport/UpdateExport";
import MyImports from "../Pages/Import/MyImports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:3000/latest-products')
      },
      {
        path: '/all-products',
        element: <AllProducts></AllProducts>,
        loader: () => fetch('http://localhost:3000/products')
      },
      {
        path: '/product-details/:id',
        element: <PrivateRoute>
          <ProductDetails></ProductDetails>
        </PrivateRoute>,

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

    ]
  },
  {
    path: '/auth',
    element: <AuthLayout></AuthLayout>,
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