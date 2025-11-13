import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from './ProductCard';
import Loader from '../../Components/Loader/Loader';

const AllProducts = () => {
    const data = useLoaderData();
    console.log(data)

    const [products, setProducts] = useState(data);
    const [loading, setLoading] = useState(false);

    const handleSearch = e => {
        e.preventDefault();
        const searchItem = e.target.search.value;
        console.log(searchItem)
        // loading
        setLoading(true)
        fetch(`http://localhost:3000/search?search=${searchItem}`)
            .then(res => res.json())
            .then(data => {
                console.log('after search', data)
                setProducts(data)
                setLoading(false);
            })
    }

    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div className="max-w-11/12 mx-auto">
            <div className="pt-10">
                <title> All Products - Trade Sphere</title>
                <h2 className='text-3xl text-center font-bold my-5'><span className='text-[#f04a00]'>All</span> Products</h2>
                <p className="text-xl text-gray-600 text-center dark:text-gray-400 max-w-4xl mx-auto mb-5">
                    Explore a wide range of export-ready products from global suppliers.
                </p>
            </div>
            <form onSubmit={handleSearch} className="text-center my-4 ">
                <div className="join ">
                    <div className=''>
                        <label className="input validator join-item ">

                            <input
                                name='search'
                                type="text"
                                className='w-70'
                                placeholder='Search Products' />
                        </label>
                    </div>
                    <button className="btn   text-white bg-[#f04a00] hover:bg-[#e34234] join-item rounded-r-xl">
                        {
                            loading ? 'Searching...' : 'Search'
                        }
                    </button>
                </div>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {
                    products.map(product => <ProductCard key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default AllProducts;