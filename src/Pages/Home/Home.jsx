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
            <div className="my-5">
                <Banner></Banner>
            </div>
            <div className="">
                <TradeInfo></TradeInfo>
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

                <TopRatedProduct></TopRatedProduct>
            </div>
        </div>
    );
};

export default Home;