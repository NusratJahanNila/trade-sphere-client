import React from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const data = useLoaderData();
    console.log(data)
    return (
        <div className="">
            <h2 className='text-2xl text-center font-bold my-5'>All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
                {
                    data.map(product => <ProductCard key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default AllProducts;