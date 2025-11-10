import React, { use } from 'react';;
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';

const PrivateRoute = ({children}) => {
    const location=useLocation();
    console.log(location)
    // Auth context
    const {user,loading}=use(AuthContext);
    if(loading){
        return <p>Loading...</p>
    }
    if(user && user?.email){
        return children;
    }
    return <Navigate to='/auth/login' state={location.pathname}></Navigate>;
};

export default PrivateRoute;

