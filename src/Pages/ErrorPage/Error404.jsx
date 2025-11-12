import React from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router';

const Error404 = () => {
    return (
        <div className='h-screen flex flex-col gap-3 text-center items-center justify-center'>
            <h1 className='text-5xl font-bold mt-3 text-shadow-amber-700'>404</h1>
            <h1 className='text-3xl font-bold mt-3 '>Page Not Found !!</h1>
            <Link to='/'><button className='btn text-white bg-blue-900 hover:bg-blue-800 '><FaLongArrowAltLeft /> Go Back</button></Link>
        </div>
    );
};

export default Error404;