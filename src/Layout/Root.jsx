import React from 'react';
import Navbar from '../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div>
            <div className="bg-base-100 shadow-sm">
                <Navbar></Navbar>
            </div>
            <div className="min-h-[72vh]">
                <Outlet></Outlet>
            </div>
            <div className="bg-[#e34234]">
                <Footer></Footer>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Root;