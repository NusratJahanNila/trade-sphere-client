import React, { use } from 'react';;
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import Loader from '../Components/Loader/Loader';

const PrivateRoute = ({children}) => {
    const location=useLocation();
    console.log(location)
    // Auth context
    const {user,loading}=use(AuthContext);
    if(loading){
        return <Loader></Loader>
    }
    if(user && user?.email){
        return children;
    }
    return <Navigate to='/auth/login' state={location.pathname}></Navigate>;
};

export default PrivateRoute;

