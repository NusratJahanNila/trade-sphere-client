import React from 'react';
import Banner from '../../Components/Header/Banner'
import { useLoaderData } from 'react-router';
import ProductCard from '../AllProducts/ProductCard';
import TopRatedProduct from '../../Components/TopRatedProduct/TopRatedProduct';
import TradeInfo from '../../Components/TradeInfo/TradeInfo';

const Home = () => {
    const data = useLoaderData();
    return (
        <div>
            <title>Home - Trade Sphere</title>
            <div className="my-5">
                <Banner></Banner>
            </div>
            <div className="">
                <TradeInfo></TradeInfo>
            </div>
            <div className="">
                <h2 className='text-3xl text-center font-bold my-5'><span className='text-[#f04a00]'>Latest</span> Products</h2>
                <p className="text-xl text-gray-600 text-center dark:text-gray-400 max-w-4xl mx-auto mb-5">
                    Discover the newest exports from trusted global suppliers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-11/12 mx-auto">
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