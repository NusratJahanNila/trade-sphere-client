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
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";

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
  // Dashboard
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        path: "/dashboard",
        element:<Dashboard></Dashboard>
      },
      {
        path: '/dashboard/my-export',
        element: <MyExport />
      },
      {
        path: '/dashboard/my-imports',
        element:<MyImports></MyImports>
      },
      {
        path: '/dashboard/add-export',
        element: <AddExport></AddExport>
      },
    ]
  },
  // Auth
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