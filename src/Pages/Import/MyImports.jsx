import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { DollarSign, LocateFixed, Package, Trash2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

const MyImports = () => {
    const { user, loading, setLoading } = use(AuthContext);
    const [products, setProducts] = useState([]);
    // api
    useEffect(() => {
        fetch(`http://localhost:3000/my-imports?email=${user.email}`)
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

    console.log('products from import=', products)

    return (
        <div className="max-w-11/12 mx-auto my-5">
            {
                products.map(product => <div className="card lg:card-side bg-base-100 shadow-xl border border-gray-200 w-full mb-6">

                    <figure className="lg:w-1/3 w-full p-4 bg-gray-50 flex items-center justify-center">
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="rounded-lg object-cover max-h-48 lg:max-h-full w-full"
                        />
                    </figure>

                    <div className="card-body p-4 lg:w-2/3">
                        <div>
                            <h2 className="card-title text-xl font-bold grow mr-4 mb-2">
                                {product.productName}
                            </h2>
                            <div className="badge badge-primary badge-outline text-xs p-3">
                                <LocateFixed className="w-3 h-3 mr-1" />
                                {product.originCountry}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 my-3 border-y py-3 border-gray-100">

                            <div className="flex flex-col ">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                <span className="text-xs text-gray-500">Price</span>
                                <p className="font-semibold text-lg text-green-600">${product.price}</p>
                            </div>

                            <div className="flex flex-col ">
                                <TrendingUp className="w-5 h-5 text-yellow-500" />
                                <span className="text-xs text-gray-500">Rating</span>
                                    <p className="ml-1 font-semibold text-lg text-yellow-500">{product.rating}</p>
                            </div>

                            <div className="flex flex-col ">
                                <Package className="w-5 h-5 text-blue-500" />
                                <span className="text-xs text-gray-500">Quantity</span>
                                <p className="font-semibold text-lg">{product.userQuantity}</p>
                            </div>
                        </div>

                        <div className="card-actions  mt-4">
                            <button
                                className="btn btn-error btn-outline grow lg:grow-0"
                            >
                                <Trash2 className="w-5 h-5" />
                                Remove
                            </button>

                            <Link to={`/details/${product._id}`} className="btn btn-warning grow lg:grow-0">
                                See Details
                            </Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default MyImports;