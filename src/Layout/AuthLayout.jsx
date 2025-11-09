import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar';
import Footer from '../Components/Footer/Footer';

const AuthLayout = () => {
    return (
        <div>
            <div className="bg-base-100 shadow-sm">
                <Navbar></Navbar>
            </div>
            <div className="min-h-[72vh]">
                <Outlet></Outlet>
            </div>
            <div className="bg-neutral">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default AuthLayout;