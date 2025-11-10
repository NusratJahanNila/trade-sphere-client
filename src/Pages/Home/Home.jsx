import React from 'react';
import Banner from '../../Components/Header/Banner';
import Review from '../../Components/Review/Review';
import { useLoaderData } from 'react-router';
import ProductCard from '../AllProducts/ProductCard';

const Home = () => {
    const data=useLoaderData();
    return (
        <div>
            <div className="my-5">
                <Banner></Banner>
            </div>
            <div className="">
                <h2 className='text-2xl text-center font-bold my-5'>Latest Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
            {
                data.map(product => <ProductCard key={product._id} product={product} />)
            }
        </div>
            </div>
            <div className="">
                <Review></Review>
            </div>
        </div>
    );
};

export default Home;