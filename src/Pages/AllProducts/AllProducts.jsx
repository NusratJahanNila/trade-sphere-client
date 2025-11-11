import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const data = useLoaderData();
    console.log(data)

    const [products, setProducts] = useState(data);
    const [loading,setLoading]=useState(false);

	const handleSearch = e => {
        	e.preventDefault();
        	const searchItem=e.target.search.value;
        	console.log(searchItem)
       		 // loading
        	setLoading(true)
        	fetch(`http://localhost:3000/search?search=${searchItem}`)
        		.then(res=>res.json())
        		.then(data=>{
           		 console.log('after search',data)
            		setProducts(data)
            		setLoading(false);
        	})
    	}

	if(loading){
        	return <p>Loading...</p>
    	}
    return (
        <div className="">
            <h2 className='text-2xl text-center font-bold my-5'>All Products</h2>
            <form onSubmit={handleSearch} className="text-center my-4">
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
                    <button className="btn btn-primary join-item">
                        {
                            loading ? 'Searching...' : 'Search'
                        }
                    </button>
                </div>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
                {
                    products.map(product => <ProductCard key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default AllProducts;