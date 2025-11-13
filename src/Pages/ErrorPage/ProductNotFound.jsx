import React from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router';

const ProductNotFound = () => {
    return (
        <div className='h-screen flex flex-col gap-3 text-center items-center justify-center'>
            <h1 className='text-5xl font-bold mt-3 text-[#e34324]'>Oops!!</h1>
            <h3 className='text-xl font-bold mt-3 '>Product Not Found!!</h3>
            <Link to='/'>
            <button className='btn  btn-outline border-2 border-[#e34234] text-[#e34324] hover:text-white hover:bg-[#f04a00] rounded-xl'><FaLongArrowAltLeft />Go Back</button>
            </Link>
        </div>
    );
};

export default ProductNotFound;