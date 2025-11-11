import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { Edit2, Star, Trash2 } from 'lucide-react';

const MyExport = () => {
    const { user, loading, setLoading } = use(AuthContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/my-export?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                console.log('after my export', data)
                setProducts(data)
                setLoading(false)
            })
    }, [user, setLoading])
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {
                products.map(product => <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col h-[410px] border-gray-200 border">
                    {/* Product Image */}
                    <div className="rounded-xl overflow-hidden mb-3">
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-full h-44 object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className=" flex flex-col justify-start">
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                            <span>{product.originCountry}</span>
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                {product.rating}
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                            {product.productName}
                        </h3>

                        <p className="text-gray-700 font-medium">
                            Price: <span className="text-primary">{product.price} BDT</span>
                        </p>

                        <p className="text-gray-600 text-sm mb-3">
                            Available: {product.availableQuantity} pcs
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-2">
                        <button className="flex-1 btn btn-primary text-white rounded-lg py-2">
                            <Edit2 className="w-4 h-4 mr-1" /> Update
                        </button>

                        <button className="flex-1 btn bg-red-500 text-white hover:bg-red-600 rounded-lg py-2">
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </button>
                    </div>
                </div>)
            }
        </div>
    );
};

export default MyExport;