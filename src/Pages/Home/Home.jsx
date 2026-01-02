import React from 'react';
import Banner from '../../Components/Header/Banner'
import { useLoaderData } from 'react-router';
import ProductCard from '../AllProducts/ProductCard';
import TopRatedProduct from '../../Components/TopRatedProduct/TopRatedProduct';
import TradeInfo from '../../Components/TradeInfo/TradeInfo';

const Home = () => {
    const data = useLoaderData();
    return (
        <div className='bg-base-200'>
            <title>Home - Trade Sphere</title>
            <div className="">
                <Banner></Banner>
            </div>
            <div className="">
                <TradeInfo></TradeInfo>
            </div>
            <div className="pt-10 text-center">
                <h2 className="text-3xl  font-bold mb-3  dark:text-white">
                    <span className='text-[#f04a00]'>Latest</span> Products
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-16">
                    Discover the newest exports from trusted global suppliers.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto px-10">
                    {
                        data.map(product => <ProductCard key={product._id} product={product} />)
                    }
                </div>
            </div>
            <div className="">

                <TopRatedProduct></TopRatedProduct>
            </div>
        </div>
    );
};

export default Home;